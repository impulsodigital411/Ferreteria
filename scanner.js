/* Scanner de codigos de barras con la camara del dispositivo.
 *
 * Usa ZXing vendorizado en assets/vendor/ (sin CDN: si el local no tiene
 * internet, un script externo deja la demo sin escaner en el peor momento).
 *
 * La camara solo existe en un contexto seguro (https o localhost). Sin eso
 * navigator.mediaDevices queda undefined y getUserMedia no existe: no es un
 * aviso, la API directamente no esta. Ver README-HTTPS.md.
 */

const ZXING_AVAILABLE = typeof ZXing !== "undefined";
const ONED_FORMATS = () => [
  ZXing.BarcodeFormat.EAN_13, ZXing.BarcodeFormat.EAN_8, ZXing.BarcodeFormat.UPC_A,
  ZXing.BarcodeFormat.UPC_E, ZXing.BarcodeFormat.CODE_128, ZXing.BarcodeFormat.CODE_39,
  ZXing.BarcodeFormat.ITF, ZXing.BarcodeFormat.CODE_93, ZXing.BarcodeFormat.CODABAR
];
const FORMAT_NAMES = {
  7:"EAN-13", 6:"EAN-8", 12:"UPC-A", 9:"UPC-E", 4:"Code 128",
  2:"Code 39", 5:"ITF", 3:"Code 93", 1:"Codabar"
};

/* ------------------------------------------------------------------
 * EL RECUADRO ROJO: unica fuente de verdad.
 *
 * Este objeto es la unica definicion de donde se lee. Pinta el div #scanBox
 * Y calcula el recorte, asi que es imposible que se desincronicen (ya nos
 * paso una vez: el CSS dizia una cosa y los sliders otra).
 *
 * Todo en fracciones de lo que se ve en pantalla, 0..1, con origen arriba
 * a la izquierda. cx/cy son el CENTRO; w/h el tamano.
 *
 * Por que un cuadrado y no una franja ancha: los codigos de la ferreteria son
 * verticales (mas altos que anchos), y una franja ancha y baja los cortaba.
 * ------------------------------------------------------------------ */
const BOX_DEFAULT={cx:0.5,cy:0.5,w:0.72,h:0.72};
const BOX_LIMITS={w:[0.15,1],h:[0.15,1],cx:[0.05,0.95],cy:[0.05,0.95]};
const BOX_KEY="impulso_scanbox_v1";
const scanBox={...BOX_DEFAULT};

function clampBox(v,key){
  const [lo,hi]=BOX_LIMITS[key];
  return Math.min(hi,Math.max(lo,v));
}

/* Pintar y recortar salen de los MISMOS numeros: aca esta la garantia. */
function boxFrac(){
  const halfW=scanBox.w/2, halfH=scanBox.h/2;
  return {x:scanBox.cx-halfW, y:scanBox.cy-halfH, w:scanBox.w, h:scanBox.h};
}

function paintBox(){
  const el=$("#scanBox");
  if(!el)return;
  const f=boxFrac();
  el.style.left=`${f.x*100}%`;
  el.style.top=`${f.y*100}%`;
  el.style.width=`${f.w*100}%`;
  el.style.height=`${f.h*100}%`;
}

function syncSliders(){
  const set=(id,v)=>{const el=$("#"+id);if(el)el.value=Math.round(v*100)};
  set("scanBoxW",scanBox.w);
  set("scanBoxH",scanBox.h);
  set("scanBoxX",scanBox.cx);
  set("scanBoxY",scanBox.cy);
}

function loadBox(){
  try{
    const raw=localStorage.getItem(BOX_KEY);
    if(raw){
      const v=JSON.parse(raw);
      for(const k of Object.keys(BOX_LIMITS))if(typeof v[k]==="number")scanBox[k]=clampBox(v[k],k);
    }
  }catch(e){}
}

function saveBox(){
  try{localStorage.setItem(BOX_KEY,JSON.stringify(scanBox))}catch(e){}
}

/* Pasadas de lectura, una por frame en round-robin.
 *
 * ZXing lee codigos 1D barriendo FILAS HORIZONTALES, asi que un codigo
 * vertical hay que rotarlo. Los codigos de la ferreteria son verticales, por eso
 * 90 y 270 son pasadas de primera clase.
 *
 * Todas leen DENTRO del recuadro. No hay pasada de frame completo: el recuadro
 * es un limite duro, porque mandar el frame entero mete a la fila el texto de la
 * etiqueta, otros codigos del estante y la mano, y cada transicion de mas es un
 * patron falso mas que recorrer. */
const BOX_PASSES=[
  {label:"caja 90°",rot:1},
  {label:"caja 0°",rot:0},
  {label:"caja 270°",rot:3},
  {label:"caja 180°",rot:2}
];
/* Solo si el usuario prende "escaneo libre": lee todo el frame. Apagado por defecto. */
const FREE_PASSES=[
  {label:"libre 90°",rot:1,free:true},
  {label:"libre 0°",rot:0,free:true},
  {label:"libre 270°",rot:3,free:true}
];

/* Rotacion que funciono la ultima vez. Se pone primera para no esperar un ciclo
 * entero en el producto que ya sabemos como se lee. Solo memoria: no persiste. */
let learnedRot=null;

function activePasses(){
  const list=BOX_PASSES.slice();
  if(learnedRot!==null){
    const i=list.findIndex(p=>p.rot===learnedRot);
    if(i>0)list.unshift(list.splice(i,1)[0]);
  }
  return scanner.freeScan?list.concat(FREE_PASSES):list;
}

const scanner = {
  stream: null,
  reader: null,      // ZXing.MultiFormatReader con hints ya aplicados
  canvas: null,
  ctx: null,
  tmp: null,        // canvas auxiliar: recorte antes de rotar
  tctx: null,
  freeScan: false,
  working: false,
  attempts: 0,
  hardAttempts: 0,
  pass: 0,
  timer: null,
  detectTimer: null,
  generation: 0,
  facing: "environment",
  running: false,
  onDetected: null,
};

function barcodeSupported(){
  return ZXING_AVAILABLE && !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

function scanError(message){
  const box=$("#scanError");
  if(!box)return;
  box.textContent=message;
  box.classList.remove("hidden");
  setScanMessage("No se pudo leer. Acercá el código e intentá nuevamente.","bad");
}

function clearScanError(){
  $("#scanError")?.classList.add("hidden");
}

function setScanMessage(message,tone=""){
  const box=$("#scanMessage");
  if(!box)return;
  box.textContent=message;
  box.className=message?`scan-message ${tone}`:"scan-message";
}

/* MultiFormatReader NO acepta hints en el constructor: su constructor esta
 * vacio y la lista interna de lectores se arma solo con setHints(). Si se pasan
 * mal, ZXing corre con los lectores por defecto y sin TRY_HARDER, que es
 * justamente lo que hace que falle una etiqueta chica de producto real. */
function buildReader(tryHarder){
  const reader=new ZXing.MultiFormatReader();
  const hints=new Map();
  hints.set(ZXing.DecodeHintType.POSSIBLE_FORMATS,ONED_FORMATS());
  if(tryHarder)hints.set(ZXing.DecodeHintType.TRY_HARDER,true);
  reader.setHints(hints);
  return reader;
}

/* No hay API estandar para forzar el enfoque de la camara desde el navegador.
 * Lo unico razonable es pedir la maxima resolucion (mas pixeles para el lector)
 * e intentar focusMode continuo si el dispositivo lo soporta, degradando
 * en silencio cuando no. El enfoque automatico del navegador hace el resto. */
async function tuneCamera(stream){
  const track=stream&&stream.getVideoTracks&&stream.getVideoTracks()[0];
  if(!track)return;
  try{
    if(typeof track.getCapabilities==="function"){
      const caps=track.getCapabilities();
      cameraCaps=Object.keys(caps||{}).filter(k=>/focus|width|height|exposure/i.test(k)).join(",")||"sin info";
      if(caps&&"focusMode" in caps){
        await track.applyConstraints({advanced:[{focusMode:"continuous"}]});
        focusModeOk=true;
      }
    }
  }catch(error){focusModeOk=false}
}
let cameraCaps="";
let focusModeOk=false;

async function startScanner(){
  clearScanError();
  if(!ZXING_AVAILABLE){
    scanError("No se pudo iniciar el escáner. Actualizá la página e intentá nuevamente.");
    return false;
  }
  if(!barcodeSupported()){
    scanError("La cámara no está disponible. Abrí la página con HTTPS y volvé a intentarlo.");
    return false;
  }
  let generation;
  try{
    stopScanner();
    generation=scanner.generation;
    const stream=await navigator.mediaDevices.getUserMedia({
      video:{facingMode:{ideal:scanner.facing},width:{ideal:1920},height:{ideal:1080},frameRate:{ideal:30}},
      audio:false
    });
    if(generation!==scanner.generation){stream.getTracks().forEach(t=>t.stop());return false}
    scanner.stream=stream;
    const video=$("#scanVideo");
    video.srcObject=scanner.stream;
    video.setAttribute("playsinline","");
    video.muted=true;
    await video.play();
    if(generation!==scanner.generation)return false;
    await tuneCamera(scanner.stream);
    if(generation!==scanner.generation)return false;
    // El canvas es nuestro: ZXing nunca ve el <video>, asi que no puede apagarlo.
    scanner.canvas=document.createElement("canvas");
    scanner.ctx=scanner.canvas.getContext("2d",{willReadFrequently:true});
    // Auxiliar para recortar antes de rotar (ver grabRegion).
    scanner.tmp=document.createElement("canvas");
    scanner.tctx=scanner.tmp.getContext("2d",{willReadFrequently:true});
    scanner.reader=buildReader(false);
    scanner.attempts=0;
    scanner.hardAttempts=0;
    scanner.pass=0;
    framesSeen=0;
    lastBandQuality=null;
    lastErrorText="";
    lastPass="";
    scanner.working=false;
    scanner.running=true;
    setScanMessage("Buscando código... acercá el producto al recuadro.");
    scanFrame();
    return true;
  }catch(error){
    if(generation!==scanner.generation||$("#scanner").classList.contains("hidden"))return false;
    stopScanner();
    const denied=error && (error.name==="NotAllowedError" || error.name==="SecurityError");
    scanError(denied?"Permití el acceso a la cámara para escanear."
      :error && error.name==="NotFoundError"?"No se encontró ninguna cámara en el dispositivo."
      :"No se pudo abrir la cámara. Intentá nuevamente.");
    return false;
  }
}

/* Que parte del video se ve REALMENTE en pantalla.
 *
 * El <video> tiene object-fit:cover, asi que el navegador lo escala y recorta
 * para llenar la caja del stage. Si recorto por coordenadas intrinsecas a pelo,
 * no coincide con el rectangulo rojo: en un celular vertical solo se ve ~39% del
 * ancho y yo estaba leyendo el 90%, o sea 2,3x mas de lo que el usuario apunta.
 * Aca convierto fracciones de pantalla a pixeles intrinsecos de la imagen. */
function visibleRect(){
  const video=$("#scanVideo");
  const cw=video.clientWidth,ch=video.clientHeight;
  const vw=video.videoWidth,vh=video.videoHeight;
  if(!cw||!ch||!vw||!vh)return null;
  const scale=Math.max(cw/vw,ch/vh);            // escalado de object-fit:cover
  const rw=vw*scale,rh=vh*scale;               // tamaño renderizado
  const ox=(rw-cw)/2/scale,oy=(rh-ch)/2/scale;  // overflow -> pixeles intrinsecos
  return {ox,oy,ow:cw/scale,oh:ch/scale,scale,vw,vh,cw,ch};
}

/* Recorta la region del video y la deja en el canvas, ya rotada.
 *
 * Son dos pasos a proposito:
 *   1. drawImage del recorte SIN rotar, escalado al tamano de trabajo.
 *   2. desde ahi, translate + rotate + scale sobre el centro para rotar.
 * Asi la escala y la rotacion nunca se multiplican entre si. Antes las metia
 * en una sola matriz y con las dos juntas el dibujo salia a mitad de tamano y
 * descolocado, y no leia nada.
 *
 * frac son fracciones de lo que se ve en pantalla, y salen de boxFrac():
 * el rectangulo rojo es literalmente esto.
 * rot = cantidad de giros de 90 grados antihorario. */
const MAX_WORK_WIDTH=900;

function grabRegion(frac,rot){
  const r=visibleRect();
  if(!r)return null;
  const sx=Math.max(0,Math.round(r.ox+r.ow*frac.x));
  const sy=Math.max(0,Math.round(r.oy+r.oh*frac.y));
  let sw=Math.max(40,Math.round(r.ow*frac.w));
  let sh=Math.max(40,Math.round(r.oh*frac.h));
  sw=Math.min(sw,r.vw-sx);
  sh=Math.min(sh,r.vh-sy);
  if(sw<40||sh<40)return null;

  const quarter=((rot||0)%4+4)%4;
  const swap=quarter===1||quarter===3;
  const base=swap?sh:sw;
  const k=Math.min(1,MAX_WORK_WIDTH/base);
  const cw=Math.max(40,Math.round(sw*k));
  const ch=Math.max(40,Math.round(sh*k));
  const dw=swap?ch:cw;
  const dh=swap?cw:ch;

  // Paso 1: recorte sin rotar, en el canvas auxiliar.
  const tmp=scanner.tmp;
  const tctx=scanner.tctx;
  tmp.width=cw;
  tmp.height=ch;
  tctx.setTransform(1,0,0,1,0,0);
  tctx.clearRect(0,0,cw,ch);
  tctx.drawImage($("#scanVideo"),sx,sy,sw,sh,0,0,cw,ch);

  // Paso 2: rotar desde el auxiliar al canvas final.
  const canvas=scanner.canvas;
  const ctx=scanner.ctx;
  canvas.width=dw;
  canvas.height=dh;
  ctx.setTransform(1,0,0,1,0,0);
  ctx.clearRect(0,0,dw,dh);
  ctx.translate(dw/2,dh/2);
  ctx.rotate(-Math.PI/2*quarter);
  ctx.drawImage(tmp,-cw/2,-ch/2,cw,ch);
  ctx.setTransform(1,0,0,1,0,0);

  lastBoxPixels=`${dw}x${dh}`;
  return prepareBand(ctx.getImageData(0,0,dw,dh));
}
let lastBoxPixels=null;

/* Region de escaneo libre: todo el frame. Solo con el toggle prendido. */
const FULL_FRAC={x:0,y:0,w:1,h:1};

/* Convierte el frame del canvas a un buffer GRIS de un byte por pixel y le
 * estira el contraste.
 *
 * OJO, esta es la parte importante. ZXing.RGBLuminanceSource, cuando se le pasa
 * un Uint8ClampedArray, espera UN BYTE POR PIXEL (escala de grises). Si se le
 * pasa el ImageData del canvas tal cual (RGBA, 4 bytes por pixel), NO da error:
 * simplemente interpreta los canales R, G, B y A de pixeles vecinos como si
 * fueran columnas contiguas. Las barras de un codigo miden 1 o 2 pixeles, asi
 * que cada transicion blanco/negro queda triangulada con el color del pixel de al
 * lado y no queda ninguna arista limpia que leer. Por eso no leia ni un digito.
 *
 * El estiramiento es por percentiles y no un umbral global: en una etiqueta
 * blanca el promedio da ~200, y un umbral ahi convertiria casi todo el sticker en
 * negro. El percentil 2 va a negro y el 98 a blanco, asi el blanco de la
 * etiqueta sigue blanco. Despues ZXing aplica su binarizado adaptativo por
 * bloques (HybridBinarizer). */
function prepareBand(imageData){
  const rgba=imageData.data;
  const w=imageData.width, h=imageData.height;
  const n=w*h;
  const hist=new Uint32Array(256);
  const gray=new Uint8ClampedArray(n);
  for(let p=0,i=0;p<n;p++,i+=4){
    const l=(rgba[i]*77+rgba[i+1]*150+rgba[i+2]*29)>>8;
    gray[p]=l;
    hist[l]++;
  }
  const p2=Math.floor(n*0.02), p98=Math.max(p2+1,Math.floor(n*0.98));
  let acc=0,lo=0,hi=255;
  for(let v=0;v<256;v++){acc+=hist[v];if(acc>=p2){lo=v;break}}
  acc=0;
  for(let v=0;v<256;v++){acc+=hist[v];if(acc>=p98){hi=v;break}}
  if(hi-lo<12)hi=lo+12;
  const span=hi-lo;
  const lut=new Uint8ClampedArray(256);
  for(let v=0;v<256;v++){
    const o=Math.round(((v-lo)*255)/span);
    lut[v]=o<0?0:o>255?255:o;
  }
  let sum=0;
  for(let p=0;p<n;p++){
    const v=lut[gray[p]];
    gray[p]=v;
    sum+=v;
  }
  return {data:gray,width:w,height:h,avg:sum/n};
}

let lastBandQuality=null;
let lastPass="";
let framesSeen=0;
let lastErrorText="";
const SCAN_DEBUG=true;function bandQuality(avg,attempts){
  if(attempts<4)return;
  if(avg>225)setScanMessage("Evitá reflejos y acercá el código al recuadro.");
  else if(avg<30)setScanMessage("Buscá más luz y acercá el código al recuadro.");
  else setScanMessage("Buscando código... acercá el producto al recuadro.");
}

/* Datos crudos del escaner + metricas para calibrar.
 * Se muestran en pantalla porque no puedo ver la consola del celular. */
let scanStartMs=0;
let msToFirstRead=null;
let lastReadInfo=null;

window.scanDebug=()=>({
  ZXING_AVAILABLE,
  mediaDevices:typeof navigator.mediaDevices,
  secureContext:typeof isSecureContext!=="undefined"?isSecureContext:"n/a",
  protocol:location.protocol,
  framesProcesados:framesSeen,
  pasosHastaLeer:msToFirstRead===null?null:Math.round(msToFirstRead),
  intentosHastaLeer:scanner.attemptsAtFirstRead,
  brilloPromedio:lastBandQuality===null?null:Math.round(lastBandQuality),
  rotacionAprendida:learnedRot===null?"ninguna":`${learnedRot*90}°`,
  formatoLeido:lastReadInfo?lastReadInfo.format:"-",
  codigoLeido:lastReadInfo?lastReadInfo.code:"-",
  escaneoLibre:scanner.freeScan,
  cuadro:{...scanBox},
  pixelesDelRecuadro:lastBoxPixels||"-",
  focusContinuo:focusModeOk,
  capacidadesCamara:cameraCaps||"sin leer",
  videoTamano:(()=>{const v=$("#scanVideo");return v?`${v.videoWidth}x${v.videoHeight}`:"sin video";})()
});

function showDebug(){
  if(!SCAN_DEBUG)return;
  const box=$("#scanDebug");
  if(!box)return;
  const d=window.scanDebug();
  const t=d.pasosHastaLeer===null?"-":`${d.pasosHastaLeer}ms`;
  box.textContent=`rec=${d.pixelesDelRecuadro} brillo=${d.brilloPromedio} `+
    `paso=${d.pasadaActual} lectura=${t} rot=${d.rotacionAprendida} `+
    `intentos=${d.intentosNormales} ${d.videoTamano}${d.ultimoError?" err="+d.ultimoError:""}`;
}

/* Un intento por frame, round-robin sobre las pasadas activas.
 * El recuadro rojo es limite duro: las pasadas "caja" leen solo esa region.
 * Cada 6 vueltas probamos con TRY_HARDER. */
async function scanFrame(){
  if(!scanner.running||scanner.working)return;
  scanner.working=true;
  try{
    const passes=activePasses();
    const spec=passes[scanner.pass%passes.length];
    const region=grabRegion(spec.free?FULL_FRAC:boxFrac(),spec.rot);
    if(region){
      framesSeen++;
      lastBandQuality=region.avg;
      lastErrorText="";
      lastPass=spec.label;
      const hard=scanner.attempts%6===0;
      if(hard)scanner.hardAttempts++;
      const keep=scanner.reader;
      if(hard)scanner.reader=buildReader(true);
      try{
        const src=new ZXing.RGBLuminanceSource(region.data,region.width,region.height);
        const result=scanner.reader.decodeWithState(new ZXing.BinaryBitmap(new ZXing.HybridBinarizer(src)));
        if(result&&scanner.running){
          scanner.working=false;
          scanner.reader=keep;
          // La rotacion que sirvio queda primera para el proximo producto.
          learnedRot=spec.rot;
          onBarcodeDetected(result.getText(),result.getBarcodeFormat(),spec);
          return;
        }
      }catch(error){
        if(!(error instanceof ZXing.NotFoundException)&&error.name!=="NotFoundError"){
          lastErrorText=error.name||String(error);
          console.debug("scan: error no esperado",error);
        }
      }
      scanner.reader=keep;
      scanner.attempts++;
      bandQuality(region.avg,scanner.attempts);
      showDebug();
    }
    scanner.pass++;
  }finally{
    scanner.working=false;
  }
  if(scanner.running)scanner.timer=setTimeout(scanFrame,70);
}

function stopScanner(){
  scanner.generation++;
  scanner.running=false;
  scanner.working=false;
  if(scanner.timer){clearTimeout(scanner.timer);scanner.timer=null}
  if(scanner.stream){scanner.stream.getTracks().forEach(t=>t.stop());scanner.stream=null}
  const video=$("#scanVideo");
  if(video){video.srcObject=null}
  scanner.reader=null;
  scanner.canvas=null;
  scanner.ctx=null;
  scanner.tmp=null;
  scanner.tctx=null;
}

window.switchScanCamera=async()=>{
  if($("#scanner").classList.contains("hidden")||scanner.detectTimer)return;
  scanner.facing=scanner.facing==="environment"?"user":"environment";
  await startScanner();
};

function openScanner(title="Escanear código"){
  if(!currentUser)return Promise.resolve(false);
  if(scanner.detectTimer){clearTimeout(scanner.detectTimer);scanner.detectTimer=null}
  rememberOverlayFocus($("#scanner"));
  $("#scanTitle").textContent=title;
  $("#scanner").classList.remove("hidden");
  syncOverlayScroll();
  $(".scan-area-settings").open=!window.matchMedia("(max-width: 780px)").matches;
  for(const el of document.querySelectorAll(".scan-advanced, .scan-history, .scan-help, .scan-technical"))el.open=false;
  $(".scanner-card").scrollTop=0;
  clearScanError();
  paintBox();
  syncSliders();
  scanStartMs=performance.now();
  msToFirstRead=null;
  scanner.attempts=0;
  scanner.attemptsAtFirstRead=null;
  lastReadHistory.length=0;
  $("#scanReadHistory").replaceChildren();
  showReadHistory();
  return startScanner();
}

function closeScanner(){
  if(scanner.detectTimer){clearTimeout(scanner.detectTimer);scanner.detectTimer=null}
  scanner.onDetected=null;
  stopScanner();
  $("#scanner").classList.add("hidden");
  syncOverlayScroll();restoreOverlayFocus($("#scanner"));
  setScanMessage("");
  clearScanError();
}

function onBarcodeDetected(code,format,spec){
  if(!code)return;
  scanner.running=false;
  if(scanner.timer){clearTimeout(scanner.timer);scanner.timer=null}
  const name=FORMAT_NAMES[format]||"código";
  // Metricas de calibracion: cuanto tardo en leer, y en que pasada.
  msToFirstRead=performance.now()-scanStartMs;
  scanner.attemptsAtFirstRead=scanner.attempts;
  lastReadInfo={code,format:name,pass:spec?spec.label:"-",box:lastBoxPixels};
  lastReadHistory.unshift({...lastReadInfo,ms:Math.round(msToFirstRead),intentos:scanner.attemptsAtFirstRead});
  if(lastReadHistory.length>12)lastReadHistory.pop();
  showReadHistory();
  // Muestra el numero en pantalla antes de cerrar: confirma que leyo bien.
  setScanMessage(`Código detectado: ${code}`,"good");
  const detected=code;
  stopScanner();
  scanner.detectTimer=setTimeout(()=>{
    const callback=scanner.onDetected;
    closeScanner();
    if(callback)callback(detected,name);
  },900);
}
const lastReadHistory=[];
window.scanHistory=()=>lastReadHistory.slice();

function showReadHistory(){
  const box=$("#scanReadHistory");
  if(!box||!lastReadHistory.length)return;
  box.innerHTML=lastReadHistory.map(r=>
    `<tr><td><b>${esc(r.code)}</b></td><td>${esc(r.format)}</td><td>${esc(r.pass)}</td>`+
    `<td>${esc(r.box||"-")}</td><td>${r.ms} ms</td><td>${r.intentos}</td></tr>`).join("");
}

window.setScanBox=(key,value)=>{
  if(!(key in BOX_LIMITS))return;
  scanBox[key]=clampBox(Number(value)/100,key);
  paintBox();
  syncSliders();
  saveBox();
};
window.resetScanBox=()=>{
  Object.assign(scanBox,BOX_DEFAULT);
  paintBox();
  syncSliders();
  saveBox();
  notify("Recuadro restablecido");
};
window.toggleFreeScan=(on)=>{
  scanner.freeScan=!!on;
  const el=$("#freeScanToggle");
  if(el)el.classList.toggle("on",scanner.freeScan);
  notify(scanner.freeScan?"Escaneo libre: lee todo el frame":"Escaneo con recuadro");
};

window.closeScanner=closeScanner;

/* Escanea y escribe el resultado en un input del formulario abierto.
 * Solo traduce el codigo a numero: no busca ni identifica ningun producto.
 * Se usa desde la ficha de producto, con data-scan-for="barcode". */
window.scanIntoField=async(name)=>{
  const input=$(`#modalForm [name="${name}"]`);
  if(!input)return fail("No se encuentra el campo para escanear");
  scanner.onDetected=code=>{
    input.value=code;
    input.dispatchEvent(new Event("input",{bubbles:true}));
    notify(`Código ${code} leído`);
  };
  return openScanner("Escanear código de barras");
};

/* Solo lee el numero, sin buscar ni dar de alta nada. */
window.scanCodeOnly=async()=>{
  scanner.onDetected=code=>{
    const last=$("#lastScannedCode");
    if(last){
      last.textContent=code;
      $("#lastScannedBox")?.classList.remove("hidden");
    }
    notify(`Código ${code} leído`);
  };
  return openScanner("Leer código");
};

/* Escanea y busca el producto. Es el flujo del punto de venta. */
window.scanProduct=async()=>{
  if($("#saleModal").classList.contains("hidden"))return fail("Abrí primero una venta");
  scanner.onDetected=code=>handleScannedProduct(code);
  return openScanner("Escanear producto");
};

function handleScannedProduct(code){
  const found=state.products.find(p=>p.barcode===code);
  if(!found){askNewProductFromBarcode(code);return}
  if(found.status!=="Activo")return fail(`${found.name} está desactivado`);
  addToCart(found.id);
  notify(`${found.name} agregado al carrito`);
}

/* Codigo desconocido: ofrece dar de alta el producto con el codigo ya puesto.
 * Asi se puede escanear cualquier producto real del local. */
function askNewProductFromBarcode(code){
  const name=$("#newFromBarcodeName").value.trim();
  const price=Number($("#newFromBarcodePrice").value);
  const category=activeCategories()[0]?.name||"";
  openModal("Producto nuevo desde código escaneado",`<div class="detail-box">
      <p>Código leído: <b>${esc(code)}</b></p>
      <p class="muted">No está cargado en el sistema. Cargalo ahora y va a quedar asociado a este código.</p></div>
    <div class="form-grid">
      <div class="span-2"><label>Nombre del producto</label><input name="name" required value="${esc(name)}" placeholder=" ej: Tornillo yeso 6x40"></div>
      <div><label>Categoría</label><select name="category">${esc(category)}</select></div>
      <div><label>Unidad</label><select name="unit">${["unidad","metro","kilo","caja","rollo","bolsa","balde"].map(x=>`<option>${x}</option>`).join("")}</select></div>
      <div><label>Costo</label><input name="cost" type="number" min="0" step=".01" required value="0"></div>
      <div><label>Precio de venta</label><input name="price" type="number" min="0" step=".01" required value="${price>0?price:""}"></div>
      <div><label>Stock inicial</label><input name="stock" type="number" min="0" step=".01" required value="1"></div>
      <div><label>Stock mínimo</label><input name="min" type="number" min="0" step=".01" required value="0"></div>
    </div>`,fd=>{
      const productName=fd.get("name").trim();
      const cost=+fd.get("cost"),sale=+fd.get("price"),stock=+fd.get("stock"),min=+fd.get("min");
      if(!productName)return fail("Ingresá un nombre para el producto");
      if(!validNumber(cost)||!validNumber(sale)||!validNumber(stock)||!validNumber(min))return fail("Revisá los valores numéricos");
      if(state.products.some(p=>p.barcode===code))return fail("Ese código ya fue asignado");
      const p={id:nextId(state.products),barcode:code,name:productName,
        category:fd.get("category"),unit:fd.get("unit"),cost,price:sale,stock,min,status:"Activo"};
      state.products.unshift(p);
      recordAdjustment(p,stock,`Alta por escaneo de código ${code}`);
      notify(`${p.name} cargado con el código ${code}`);
      return true;
    });
  $("#newFromBarcodeName").value=name;
  if(price>0)$("#newFromBarcodePrice").value=price;
}

/* Carga la calibracion guardada y deja el recuadro pintado desde el arranque.
 * Si no hay nada guardado, arranca con el cuadrado por defecto. */
(function initScanBox(){
  loadBox();
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>{paintBox();syncSliders()});
  else{paintBox();syncSliders()}
})();
