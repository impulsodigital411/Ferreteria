
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const STORAGE_KEY = "impulso_ferreteria_demo_v05";

function seedState(){
  const data = {
    categories:[
      {id:1,name:"Herramientas",description:"Herramientas manuales y accesorios",status:"Activo"},
      {id:2,name:"Electricidad",description:"Cables, cintas y materiales eléctricos",status:"Activo"},
      {id:3,name:"Tornillería",description:"Tornillos, tuercas, arandelas y fijaciones",status:"Activo"},
      {id:4,name:"Plomería",description:"Caños, llaves y conexiones",status:"Activo"},
      {id:5,name:"Pinturería",description:"Pinturas, rodillos y accesorios",status:"Activo"},
      {id:6,name:"Adhesivos",description:"Selladores, siliconas y adhesivos",status:"Activo"}
    ],
    products:[
      {id:1,code:"FER-001",barcode:"7791000000017",name:"Martillo carpintero 16 oz",category:"Herramientas",unit:"unidad",cost:14500,price:19500,stock:8,min:5,status:"Activo"},
      {id:2,code:"FER-002",barcode:"7791000000024",name:"Cinta aisladora negra 20 m",category:"Electricidad",unit:"unidad",cost:1050,price:1800,stock:24,min:10,status:"Activo"},
      {id:3,code:"FER-003",barcode:"7791000000031",name:"Tornillo autoperforante 8x1",category:"Tornillería",unit:"unidad",cost:55,price:100,stock:120,min:150,status:"Activo"},
      {id:4,code:"FER-004",barcode:"7791000000048",name:"Cable unipolar 2,5 mm",category:"Electricidad",unit:"metro",cost:820,price:1200,stock:68,min:40,status:"Activo"},
      {id:5,code:"FER-005",barcode:"7791000000055",name:"Llave de paso 1/2",category:"Plomería",unit:"unidad",cost:4100,price:5900,stock:3,min:6,status:"Activo"},
      {id:6,code:"FER-006",barcode:"7791000000062",name:"Disco de corte 115 mm",category:"Herramientas",unit:"unidad",cost:1850,price:2800,stock:18,min:8,status:"Activo"},
      {id:7,code:"FER-007",barcode:"7791000000079",name:"Silicona transparente 280 ml",category:"Adhesivos",unit:"unidad",cost:3250,price:4700,stock:5,min:5,status:"Activo"},
      {id:8,code:"FER-008",barcode:"7791000000086",name:"Rodillo antigota 22 cm",category:"Pinturería",unit:"unidad",cost:5800,price:7900,stock:11,min:4,status:"Activo"},
      {id:9,code:"FER-009",barcode:"7791000000093",name:"Caño PVC 40 mm x 4 m",category:"Plomería",unit:"unidad",cost:9100,price:12900,stock:7,min:6,status:"Activo"},
      {id:10,code:"FER-010",barcode:"7791000000109",name:"Mecha widia 8 mm",category:"Herramientas",unit:"unidad",cost:3600,price:5200,stock:0,min:4,status:"Activo"},
      {id:11,code:"FER-011",barcode:"7791000000116",name:"Látex interior blanco 20 L",category:"Pinturería",unit:"balde",cost:68500,price:89900,stock:6,min:3,status:"Activo"}
    ],
    sales:[
      {id:"V-00154",date:"2026-10-01",time:"09:18",items:[{pid:4,code:"FER-004",name:"Cable unipolar 2,5 mm",qty:12,price:1200},{pid:2,code:"FER-002",name:"Cinta aisladora negra 20 m",qty:2,price:1800}],subtotal:18000,discount:0,total:18000,method:"Efectivo",seller:"Vendedor",status:"Vigente"},
      {id:"V-00153",date:"2026-10-01",time:"08:52",items:[{pid:1,code:"FER-001",name:"Martillo carpintero 16 oz",qty:1,price:19500},{pid:6,code:"FER-006",name:"Disco de corte 115 mm",qty:3,price:2800}],subtotal:27900,discount:0,total:27900,method:"Transferencia",seller:"Vendedor",status:"Vigente"},
      {id:"V-00152",date:"2026-09-30",time:"18:26",items:[{pid:5,code:"FER-005",name:"Llave de paso 1/2",qty:2,price:5900},{pid:9,code:"FER-009",name:"Caño PVC 40 mm x 4 m",qty:4,price:12900}],subtotal:63400,discount:0,total:63400,method:"Transferencia",seller:"Administrador",status:"Vigente"}
    ],
     moves:[{id:1,date:"2026-10-01",time:"08:47",productId:3,product:"Tornillo autoperforante 8x1",type:"Ajuste",qty:-15,reason:"Conteo físico",user:"Ariel",status:"Vigente",linked:null}],
     purchases:[
       {id:"C-00078",date:"2026-10-01",time:"08:47",reference:"Distribuidora Cuyo",items:[{pid:1,code:"FER-001",name:"Martillo carpintero 16 oz",qty:2,cost:14500},{pid:6,code:"FER-006",name:"Disco de corte 115 mm",qty:2,cost:1850}],total:32700,method:"Transferencia",status:"Vigente"},
       {id:"C-00077",date:"2026-09-30",time:"12:00",reference:"Pinturas del Oeste",items:[{pid:8,code:"FER-008",name:"Rodillo antigota 22 cm",qty:2,cost:5800},{pid:11,code:"FER-011",name:"Látex interior blanco 20 L",qty:1,cost:68500}],total:80100,method:"Transferencia",status:"Vigente"}
     ],
     accounting:[
       {id:1,date:"2026-09-30",time:"12:00",concept:"Flete de mercadería",origin:"Manual",type:"Egreso",amount:13500,method:"Efectivo",user:"Ariel",status:"Vigente",linked:null}
     ],
     users:[
      {id:1,name:"Ariel",username:"admin",password:"xjbhoeyp8k",role:"Administrador",status:"Activo",last:"Sin acceso"},
      {id:2,name:"Vendedor Mostrador",username:"vendedor",password:"1fmab8n5ow",role:"Vendedor",status:"Activo",last:"Sin acceso"}
    ],
    employees:[
      {id:1,name:"Lucas Pérez",dni:"38.111.220",sector:"Mostrador",position:"Vendedor",phone:"264 555-1201",status:"Activo"},
      {id:2,name:"Mariana Díaz",dni:"36.904.552",sector:"Caja",position:"Cajera",phone:"264 555-2240",status:"Activo"},
      {id:3,name:"Nicolás Sosa",dni:"41.088.337",sector:"Depósito",position:"Depósito",phone:"264 555-4190",status:"Activo"},
      {id:4,name:"Ariel",dni:"-",sector:"Administración",position:"Administrador",phone:"-",status:"Activo"}
    ],
     attendance:[
       {id:1,date:"2026-10-01",entry:"08:03",exit:"16:27",employeeId:1,employee:"Lucas Pérez",sector:"Mostrador",status:"Finalizada",method:"Huella (demo)"},
       {id:2,date:"2026-10-01",entry:"08:05",exit:"16:10",employeeId:2,employee:"Mariana Díaz",sector:"Caja",status:"Finalizada",method:"Huella (demo)"},
       {id:3,date:"2026-09-30",entry:"08:09",exit:"17:12",employeeId:3,employee:"Nicolás Sosa",sector:"Depósito",status:"Finalizada",method:"Huella (demo)"},
       {id:4,date:"2026-10-01",entry:"08:09",exit:null,employeeId:3,employee:"Nicolás Sosa",sector:"Depósito",status:"En curso",method:"Huella (demo)"}
     ]
  };
  const current=today(), previous=new Date(`${current}T12:00:00`);previous.setDate(previous.getDate()-1);
  const yesterday=`${previous.getFullYear()}-${String(previous.getMonth()+1).padStart(2,"0")}-${String(previous.getDate()).padStart(2,"0")}`;
  for(const key of ["sales","moves","purchases","accounting","attendance"])data[key].forEach(x=>x.date=x.date==="2026-10-01"?current:yesterday);
  for(const s of data.sales){for(const i of s.items)data.moves.push({id:nextId(data.moves),date:s.date,time:s.time,productId:i.pid,product:i.name,type:"Salida",qty:-i.qty,reason:`Venta ${s.id}`,user:s.seller,status:"Vigente",linked:s.id});data.accounting.push({id:nextId(data.accounting),date:s.date,time:s.time,concept:`Venta ${s.id}`,origin:"Venta",type:"Ingreso",amount:s.total,method:s.method,user:s.seller,status:"Vigente",linked:s.id})}
  for(const p of data.purchases){for(const i of p.items)data.moves.push({id:nextId(data.moves),date:p.date,time:p.time,productId:i.pid,product:i.name,type:"Entrada",qty:i.qty,reason:`Compra ${p.id}`,user:"Ariel",status:"Vigente",linked:p.id});data.accounting.push({id:nextId(data.accounting),date:p.date,time:p.time,concept:`Compra ${p.id}`,origin:"Compra",type:"Egreso",amount:p.total,method:p.method,user:"Ariel",status:"Vigente",linked:p.id})}
  return data;
}
let state = loadState();
let currentUser = null;
let cart = [];

function loadState(){try{const s=localStorage.getItem(STORAGE_KEY);if(!s)return seedState();const data=JSON.parse(s);data.users.forEach(u=>u.password??=({admin:"xjbhoeyp8k",vendedor:"1fmab8n5ow"}[u.username]||"demo123"));if(data.attendance.some(a=>a.type)){
  const sessions=[];[...data.attendance].reverse().forEach(a=>{if(a.type==="Entrada")sessions.push({id:a.id,date:a.date,entry:a.time,exit:null,employeeId:a.employeeId,employee:a.employee,sector:a.sector,status:a.status==="Anulado"?"Anulada":"En curso",method:a.method});else{const open=sessions.find(x=>x.employeeId===a.employeeId&&x.status==="En curso");if(open){open.exit=a.time;open.status="Finalizada"}}});data.attendance=sessions.reverse();
}return data}catch(e){return seedState()}}
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
function money(n){return new Intl.NumberFormat("es-AR",{style:"currency",currency:"ARS",maximumFractionDigits:2}).format(Number(n)||0)}
function fmtDate(d){if(!d)return"";const [y,m,day]=d.split("-");return `${day}/${m}/${y}`}
function today(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`}
function stamp(){const d=new Date();return {date:today(),time:nowTime(),at:d.toISOString()}}
function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]))}
function fail(msg){notify(msg);return false}
function validNumber(n,min=0){return Number.isFinite(n)&&n>=min}
function duration(a){if(!a.exit)return 0;return Math.max(0,Math.round((new Date(a.exitAt||`${a.date}T${a.exit}:00`)-new Date(a.entryAt||`${a.date}T${a.entry}:00`))/60000))}
function hours(mins){return `${Math.floor(mins/60)} h ${mins%60} min`}
function nowTime(){return new Date().toLocaleTimeString("es-AR",{hour:"2-digit",minute:"2-digit"})}
function isAdmin(){return currentUser?.role==="Administrador"}
function notify(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function badge(status){
  if(status==="Vigente"||status==="Activo")return `<span class="badge good">${status}</span>`;
  if(status==="Anulada"||status==="Anulado"||status==="Inactivo")return `<span class="badge bad">${status}</span>`;
  return `<span class="badge info">${status}</span>`;
}
function stockBadge(p){if(p.stock<=0)return'<span class="badge bad">Sin stock</span>';if(p.stock<=p.min)return'<span class="badge warn">Stock bajo</span>';return'<span class="badge good">Normal</span>'}
function nextCode(prefix,arr){const nums=arr.map(x=>parseInt(String(x.id).replace(/\D/g,""))||0);return `${prefix}-${String(Math.max(0,...nums)+1).padStart(5,"0")}`}
function nextId(arr){return Math.max(0,...arr.map(x=>Number(x.id)||0))+1}
function activeProducts(){return state.products.filter(p=>p.status==="Activo")}
function activeCategories(){return state.categories.filter(c=>c.status==="Activo")}

function login(user,pass){
  const a=state.users.find(u=>u.username===user&&u.password===pass&&u.status==="Activo");
  if(!a)return false;
  currentUser={id:a.id,username:a.username,name:a.name,role:a.role};a.last=`${fmtDate(today())} ${nowTime()}`;save();
  $("#loginView").classList.add("hidden");$("#appView").classList.remove("hidden");
  $("#sidebarUser").textContent=a.name;$("#sidebarRole").textContent=a.role;
  showSection("ventas");renderAll();return true;
}
function logout(){currentUser=null;cart=[];$("#saleModal").classList.add("hidden");$("#appView").classList.add("hidden");$("#loginView").classList.remove("hidden");$("#loginForm").reset()}
function applyRole(){
  $$(".admin-only").forEach(el=>el.classList.toggle("hidden",!isAdmin()));
  if(!isAdmin()&&["dashboard","categorias","movimientos","compras","contabilidad","reportes","empleados","asistencias","usuarios"].includes($(".section.active")?.id||""))showSection("ventas");
}
function showSection(id){
  if(!currentUser||(!isAdmin()&&!(["ventas","inventario"].includes(id))))return;
  $$(".section").forEach(s=>s.classList.toggle("active",s.id===id));
  $$(".nav-item, .nav-subitem").forEach(n=>n.classList.toggle("active",n.dataset.section===id));
  const nav = document.querySelector(`[data-section="${id}"]`);
  $("#pageTitle").textContent=nav?.textContent.trim()||"Ventas";

  const groupMap={
    inventario:"stockGroup",categorias:"stockGroup",movimientos:"stockGroup",compras:"stockGroup",
    ventas:"accountingGroup",contabilidad:"accountingGroup",reportes:"accountingGroup",
    empleados:"personalGroup",asistencias:"personalGroup",usuarios:"adminGroup"
  };
  if(groupMap[id]){
    const menu=$("#"+groupMap[id]);
    const toggle=document.querySelector(`[data-group="${groupMap[id]}"]`);
    menu?.classList.add("open");
    toggle?.setAttribute("aria-expanded","true");
  }
   window.scrollTo({top:0,behavior:"instant"});
}

/* POS */
const cents=n=>Math.round((n+Number.EPSILON)*100)/100;
const validMoney=n=>validNumber(n)&&Math.abs(n*100-Math.round(n*100))<0.00001;
function fillCategorySelects(){
  const cats=activeCategories().map(c=>c.name).sort();
  const ids=["posCategory","categoryFilter"];
  ids.forEach(id=>{
    const el=$("#"+id); if(!el)return;
    const cur=el.value;
    el.innerHTML='<option value="">Todas las categorías</option>'+cats.map(c=>`<option ${c===cur?"selected":""}>${esc(c)}</option>`).join("");
  });
}
function renderPosResults(){
  fillCategorySelects();
  const q=$("#posSearch").value.toLowerCase().trim(),cat=$("#posCategory").value;
  if(!q&&!cat){$("#posResults").innerHTML='<div class="empty-state">Busque un producto por código o nombre.</div>';return}
  const matches=activeProducts().filter(p=>`${p.code} ${p.name} ${p.barcode||""}`.toLowerCase().includes(q)&&(!cat||p.category===cat));
  const rows=matches.slice(0,30);
  $("#posResults").innerHTML=rows.map(p=>`
    <div class="product-result">
      <div><h4>${esc(p.name)}</h4><p>Código: ${esc(p.code)}${p.barcode?` · Barcode: ${esc(p.barcode)}`:""} · ${esc(p.category)} · Stock: ${p.stock} ${esc(p.unit)}</p></div>
      <div class="price"><small>Precio</small><strong>${money(p.price)}</strong></div>
      <button type="button" class="btn ${p.stock>0?"secondary":"light"} small" ${p.stock<=0?"disabled":""} onclick="addToCart(${p.id})">${p.stock>0?"Agregar":"Sin stock"}</button>
    </div>`).join("")+(matches.length>30?'<p class="form-help">Mostrando 30 resultados. Refiná la búsqueda para encontrar otros productos.</p>':"")||'<div class="empty-state">No se encontraron productos.</div>';
}
function openNewSale(){
  if(!currentUser)return;
  cart=[];$("#posSearch").value="";$("#posCategory").value="";
  $("#lastScannedCode").textContent="—";$("#lastScannedBox")?.classList.add("hidden");
  $("#saleAdjustment").value="none";$("#saleAdjustmentMode").value="percent";$("#saleAdjustmentValue").value="0";
  $("#cartMethod").value="Efectivo";["mixedCash","mixedTransfer","mixedCard"].forEach(id=>$("#"+id).value="0");
  $("#saleProductPicker").classList.remove("hidden");$("#showProductPicker").setAttribute("aria-expanded","true");
  $("#saleError").textContent="";$("#saleModal").classList.remove("hidden");
  updateSaleControls();renderCart();renderPosResults();$("#posSearch").focus();
}
function closeSale(){cart=[];$("#saleModal").classList.add("hidden");$("#saleError").textContent="";$("#newSaleBtn").focus()}
window.addToCart=id=>{
  if($("#saleModal").classList.contains("hidden"))return;
  const p=state.products.find(x=>x.id===id&&x.status==="Activo");if(!p||p.stock<=0)return fail("Producto sin stock disponible");
  const row=cart.find(x=>x.pid===id);
  if(row){if(row.qty+1>p.stock)return fail(`Stock disponible: ${p.stock}`);row.qty=cents(row.qty+1)}
  else{if(p.stock<1)return fail(`Stock disponible: ${p.stock}`);cart.push({pid:p.id,code:p.code,name:p.name,price:p.price,cost:p.cost,qty:1,discount:0})}
  $("#saleError").textContent="";renderCart();$("#posSearch").value="";$("#posCategory").value="";renderPosResults();$("#posSearch").focus();
}
window.cartQty=(pid,value)=>{
  const p=state.products.find(x=>x.id===pid),row=cart.find(x=>x.pid===pid);
  if(!p||!row)return;
  const q=Number(value);
  if(!validNumber(q,0.01)){renderCart();return saleError("Ingresá una cantidad mayor a cero")}
  if(q>p.stock){renderCart();return saleError(`Stock disponible: ${p.stock}`)}
  row.qty=q;if(row.discount>cents(row.price*q))row.discount=cents(row.price*q);
  $("#saleError").textContent="";renderCart();
}
window.cartLineDiscount=(pid,value)=>{
  const row=cart.find(x=>x.pid===pid);if(!row)return;
  const discount=Number(value),max=cents(row.qty*row.price);
  if(!validMoney(discount)||discount>max){renderCart();return saleError(`El descuento del producto debe estar entre $0 y ${money(max)}, con hasta dos decimales`)}
  row.discount=cents(discount);$("#saleError").textContent="";renderCart();
}
window.removeCart=pid=>{cart=cart.filter(x=>x.pid!==pid);$("#saleError").textContent="";renderCart()}
function saleError(message){$("#saleError").textContent=message;notify(message);return false}
function saleAmounts(items,adjustment){
  const subtotal=cents(items.reduce((sum,i)=>sum+i.price*i.qty,0));
  const itemDiscount=cents(items.reduce((sum,i)=>sum+(i.discount||0),0));
  const base=cents(subtotal-itemDiscount),value=Number(adjustment.value||0);
  let error="";
  if(!validNumber(value)||(adjustment.type!=="none"&&adjustment.mode==="fixed"&&!validMoney(value)))error="Ingresá un ajuste válido (hasta dos decimales para montos fijos)";
  if(adjustment.type==="discount"&&adjustment.mode==="percent"&&value>100)error="El descuento no puede superar el 100 %";
  const adjustmentAmount=adjustment.type==="none"?0:cents(adjustment.mode==="percent"?base*value/100:value);
  if(adjustment.type==="discount"&&adjustmentAmount>base)error="El descuento no puede superar el subtotal";
  const generalDiscount=adjustment.type==="discount"?adjustmentAmount:0,surcharge=adjustment.type==="surcharge"?adjustmentAmount:0;
  return {subtotal,itemDiscount,discount:cents(itemDiscount+generalDiscount),surcharge,total:cents(base-generalDiscount+surcharge),error};
}
function saleAdjustment(){return {type:$("#saleAdjustment").value,mode:$("#saleAdjustmentMode").value,value:$("#saleAdjustmentValue").value}}
function salePayments(method,total,values){
  if(method!=="Mixto")return {payments:{[method]:total},error:""};
  const payments=Object.fromEntries(["Efectivo","Transferencia","Tarjeta"].map((name,index)=>[name,Number(values[index])]));
  if(Object.values(payments).some(n=>!validMoney(n)))return {error:"Ingresá importes válidos con hasta dos decimales"};
  const paid=cents(Object.values(payments).reduce((a,b)=>a+b,0));
  if(Object.values(payments).filter(n=>n>0).length<2)return {error:"Para pago mixto usá al menos dos medios de pago"};
  if(Math.round(paid*100)!==Math.round(total*100))return {error:`La suma de los medios debe ser ${money(total)}. Diferencia: ${money(cents(total-paid))}`};
  return {payments,error:""};
}
function currentSalePayment(total){return salePayments($("#cartMethod").value,total,["mixedCash","mixedTransfer","mixedCard"].map(id=>$("#"+id).value))}
function updateSaleControls(){
  const hasAdjustment=$("#saleAdjustment").value!=="none";
  $("#saleAdjustmentMode").disabled=!hasAdjustment;$("#saleAdjustmentValue").disabled=!hasAdjustment;
  $("#mixedPayment").classList.toggle("hidden",$("#cartMethod").value!=="Mixto");
  renderCart();
}
function renderCart(){
  $("#cartTable").innerHTML=cart.map(x=>`<tr>
    <td><b>${esc(x.name)}</b><br><small class="muted">${esc(x.code)} · ${esc(state.products.find(p=>p.id===x.pid)?.unit||"")}</small></td>
    <td><div class="qty-control"><button type="button" class="table-btn" aria-label="Disminuir ${esc(x.name)}" onclick="cartQty(${x.pid},${x.qty-1})">−</button><input type="number" aria-label="Cantidad de ${esc(x.name)}" min="0.01" step="0.01" value="${x.qty}" onchange="cartQty(${x.pid},this.value)"><button type="button" class="table-btn" aria-label="Aumentar ${esc(x.name)}" onclick="cartQty(${x.pid},${x.qty+1})">+</button></div></td>
    <td>${money(x.price)}</td><td><input class="line-discount" type="number" aria-label="Descuento de ${esc(x.name)}" min="0" step="0.01" value="${x.discount||0}" onchange="cartLineDiscount(${x.pid},this.value)"></td>
    <td><b>${money(cents(x.price*x.qty-(x.discount||0)))}</b></td><td><button type="button" class="table-btn" onclick="removeCart(${x.pid})">Quitar</button></td>
  </tr>`).join("");
  $("#emptyCart").classList.toggle("hidden",cart.length>0);
  $(".sale-cart-wrap").classList.toggle("hidden",cart.length===0);
  const values=saleAmounts(cart,saleAdjustment());
  $("#cartItemsCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
  $("#cartSubtotal").textContent=money(values.subtotal);
  $("#cartDiscountValue").textContent=values.discount?`−${money(values.discount)}`:money(0);
  $("#cartSurchargeValue").textContent=values.surcharge?`+${money(values.surcharge)}`:money(0);
  $("#cartTotal").textContent=money(Math.max(0,values.total));
  $("#saleMethodSummary").textContent=$("#cartMethod").value;
  const paid=["mixedCash","mixedTransfer","mixedCard"].map(id=>Number($("#"+id).value)||0).reduce((a,b)=>a+b,0);
  $("#mixedBalance").textContent=`Asignado: ${money(paid)} de ${money(values.total)} · Diferencia: ${money(cents(values.total-paid))}`;
}
function validateSale(){
  if(!cart.length)return {error:"Agregá al menos un producto"};
  for(const x of cart){const p=state.products.find(y=>y.id===x.pid);if(!p||p.status!=="Activo")return {error:`El producto ${x.name} ya no está activo`};if(!validNumber(x.qty,.01)||p.stock<x.qty)return {error:`Stock disponible: ${p.stock} (${x.name})`};if(!validNumber(x.discount||0)||x.discount>cents(x.price*x.qty))return {error:`Revisá el descuento de ${x.name}`}}
  const amounts=saleAmounts(cart,saleAdjustment());if(amounts.error)return amounts;
  const payment=currentSalePayment(amounts.total);if(payment.error)return payment;
  return {...amounts,...payment};
}
function confirmSale(){
  if(!currentUser||$("#saleModal").classList.contains("hidden"))return;
  const data=validateSale();if(data.error)return saleError(data.error);
  const {subtotal,discount,surcharge,total,payments}=data,method=$("#cartMethod").value,id=nextCode("V",state.sales),ts=stamp();
  const items=cart.map(x=>({...x,discount:x.discount||0}));
  state.sales.unshift({id,...ts,items,subtotal,discount,surcharge,total,adjustment:{...saleAdjustment(),value:Number(saleAdjustment().value)},method,payments,seller:currentUser.name,status:"Vigente"});
  items.forEach(x=>{
    const p=state.products.find(y=>y.id===x.pid);p.stock=cents(p.stock-x.qty);
    state.moves.unshift({id:nextId(state.moves),...ts,productId:p.id,product:p.name,type:"Salida",qty:-x.qty,reason:`Venta ${id}`,user:currentUser.name,status:"Vigente",linked:id});
  });
  state.accounting.unshift({id:nextId(state.accounting),...ts,concept:`Venta ${id}`,origin:"Venta",type:"Ingreso",amount:total,method,payments,user:currentUser.name,status:"Vigente",linked:id});
  save();closeSale();renderAll();notify(`Venta ${id} registrada`);
}
function saleDetail(s,preview=false){
  const payments=s.payments||{[s.method]:s.total};
  return `<div class="detail-box"><strong>${preview?"Vista previa · sin registrar":`Venta Nº ${esc(s.id)}`}</strong>
    <p>Fecha: ${fmtDate(s.date)} · Hora: ${s.time} · Vendedor: ${esc(s.seller)}</p><p>Estado: ${preview?"Borrador":s.status}</p></div>
    <div class="detail-box"><strong>Productos</strong><div class="table-wrap"><table class="sale-detail-table"><thead><tr><th>Producto</th><th>Cantidad</th><th>Precio</th><th>Descuento</th><th>Subtotal</th></tr></thead><tbody>${s.items.map(i=>`<tr><td>${esc(i.code)} · ${esc(i.name)}</td><td>${i.qty}</td><td>${money(i.price)}</td><td>${money(i.discount||0)}</td><td>${money(cents(i.price*i.qty-(i.discount||0)))}</td></tr>`).join("")}</tbody></table></div></div>
    <div class="detail-box"><p>Subtotal: ${money(s.subtotal)}</p><p>Descuento: −${money(s.discount||0)}</p><p>Recargo: +${money(s.surcharge||0)}</p><strong>Total: ${money(s.total)}</strong>
    <p>Medio de pago: ${s.method}${s.method==="Mixto"?` · ${Object.entries(payments).filter(([,n])=>n>0).map(([m,n])=>`${m} ${money(n)}`).join(" · ")}`:""}</p></div>`;
}
function openSaleDetail(title,content){openModal(title,content,()=>{});$("#modalForm button[type=submit]").remove();$("#modal .modal-card").classList.add("wide")}
function previewSale(){const data=validateSale();if(data.error)return saleError(data.error);const ts=stamp();openSaleDetail("Vista previa de venta",saleDetail({date:ts.date,time:ts.time,seller:currentUser.name,items:cart,method:$("#cartMethod").value,status:"Borrador",...data},true))}
window.viewSale=id=>{const s=state.sales.find(x=>x.id===id);if(s)openSaleDetail(`Detalle ${id}`,saleDetail(s))};
window.voidSale=id=>{
  const s=state.sales.find(x=>x.id===id);if(!s||s.status==="Anulada")return;
  if(!isAdmin()||!confirm(`¿Anular la venta ${id}? El stock será reintegrado y el movimiento contable quedará anulado.`))return;
  s.status="Anulada";
  s.items.forEach(i=>{const p=state.products.find(x=>x.id===i.pid);if(p)p.stock=cents(p.stock+i.qty)});
  state.moves.filter(m=>m.linked===id).forEach(m=>m.status="Anulado");
  state.accounting.filter(a=>a.linked===id).forEach(a=>a.status="Anulado");
  save();renderAll();notify("Venta anulada y stock reintegrado");
}
function renderSales(){
  const q=$("#saleSearch").value.toLowerCase(),seller=$("#saleSeller").value.toLowerCase(),d=$("#saleDate").value,m=$("#saleMethod").value,st=$("#saleStatus").value;
  const rows=state.sales.filter(x=>x.id.toLowerCase().includes(q)&&x.seller.toLowerCase().includes(seller)&&(!d||x.date===d)&&(!m||x.method===m)&&(!st||x.status===st));
  $("#salesTable").innerHTML=rows.map(x=>`<tr>
    <td><b>${x.id}</b></td><td>${fmtDate(x.date)} ${x.time}</td><td class="sale-products-cell"><b>${x.items.length} producto${x.items.length===1?"":"s"}</b><small class="muted" title="${esc(x.items.map(i=>i.name).join(", "))}">${esc(x.items.map(i=>i.name).join(", "))}</small></td><td>${money(x.subtotal)}</td>
    <td>${x.discount?`−${money(x.discount)}`:""}${x.discount&&x.surcharge?" / ":""}${x.surcharge?`+${money(x.surcharge)}`:""}${!x.discount&&!x.surcharge?money(0):""}</td><td><b>${money(x.total)}</b></td><td>${x.method}</td><td>${esc(x.seller)}</td><td>${badge(x.status)}</td>
    <td><div class="action-row"><button class="table-btn" onclick="viewSale('${x.id}')">Ver</button>${isAdmin()&&x.status==="Vigente"?`<button class="table-btn" onclick="editSale('${x.id}')">Editar</button><button class="table-btn" onclick="voidSale('${x.id}')">Anular</button>`:""}</div></td>
  </tr>`).join("")||'<tr><td colspan="10" class="empty-state">No se encontraron ventas.</td></tr>';
}
window.editSale=id=>{
  if(!isAdmin())return;
  const s=state.sales.find(x=>x.id===id);if(!s||s.status!=="Vigente")return;
  const previous=s.adjustment||{type:s.discount?"discount":"none",mode:"fixed",value:s.discount||0};
  openModal(`Editar venta ${id}`,`<p class="form-help">Podés corregir el ajuste general y el medio de pago. Para cambiar productos, anulá la venta y registrá una nueva.</p>
    <div class="form-grid"><div><label>Ajuste</label><select name="adjustType">${[["none","Sin ajuste"],["discount","Descuento"],["surcharge","Recargo"]].map(([v,n])=>`<option value="${v}" ${previous.type===v?"selected":""}>${n}</option>`).join("")}</select></div>
    <div><label>Aplicar por</label><select name="adjustMode"><option value="percent" ${previous.mode==="percent"?"selected":""}>Porcentaje</option><option value="fixed" ${previous.mode==="fixed"?"selected":""}>Monto fijo</option></select></div>
    <div><label>Valor</label><input name="adjustValue" type="number" min="0" step="0.01" value="${previous.value||0}" required></div>
    <div><label>Medio de pago</label><select name="method">${["Efectivo","Transferencia","Tarjeta","Mixto"].map(m=>`<option ${m===s.method?"selected":""}>${m}</option>`).join("")}</select></div></div>
    <p id="editSaleTotal" class="form-help"></p>
    <div id="editSaleMixed" class="mixed-payment"><p>Distribuí el total entre al menos dos medios.</p><div class="mixed-fields">${[["Efectivo","cash"],["Transferencia","transfer"],["Tarjeta","card"]].map(([name,key])=>`<label>${name}<input name="${key}" type="number" min="0" step="0.01" value="${s.method==="Mixto"?(s.payments?.[name]||0):0}"></label>`).join("")}</div></div>`,fd=>{
      const adjustment={type:fd.get("adjustType"),mode:fd.get("adjustMode")||"percent",value:Number(fd.get("adjustValue")||0)};
      const amounts=saleAmounts(s.items,adjustment);if(amounts.error)return fail(amounts.error);
      const method=fd.get("method"),payment=salePayments(method,amounts.total,[fd.get("cash"),fd.get("transfer"),fd.get("card")]);if(payment.error)return fail(payment.error);
      Object.assign(s,{subtotal:amounts.subtotal,discount:amounts.discount,surcharge:amounts.surcharge,total:amounts.total,adjustment,method,payments:payment.payments});
      const a=state.accounting.find(x=>x.linked===id&&x.status==="Vigente");if(a)Object.assign(a,{amount:s.total,method,payments:s.payments});return true;
    });
  const form=$("#modalForm");function refresh(){const type=form.elements.adjustType.value;form.elements.adjustMode.disabled=type==="none";form.elements.adjustValue.disabled=type==="none";$("#editSaleMixed").classList.toggle("hidden",form.elements.method.value!=="Mixto");const values=saleAmounts(s.items,{type,mode:form.elements.adjustMode.value,value:form.elements.adjustValue.value});$("#editSaleTotal").textContent=`Nuevo total: ${money(values.total)}${values.error?` · ${values.error}`:""}`}
  form.addEventListener("change",refresh);form.addEventListener("input",refresh);refresh();
};

/* Dashboard */
function renderDashboard(){
  const validSales=state.sales.filter(x=>x.status==="Vigente"),todaySales=validSales.filter(x=>x.date===today());
  $("#kpiSalesToday").textContent=money(todaySales.reduce((s,x)=>s+x.total,0));$("#kpiSalesCount").textContent=`${todaySales.length} operaciones`;
   $("#kpiProducts").textContent=state.products.filter(p=>p.status==="Activo").length;$("#kpiLowStock").textContent=state.products.filter(p=>p.status==="Activo"&&p.stock<=p.min).length;
   $("#kpiZeroStock").textContent=activeProducts().filter(p=>p.stock===0).length;
  const acc=state.accounting.filter(x=>x.status==="Vigente"),inc=acc.filter(x=>x.type==="Ingreso").reduce((s,x)=>s+x.amount,0),exp=acc.filter(x=>x.type==="Egreso").reduce((s,x)=>s+x.amount,0);
   $("#kpiMonthResult").textContent=money(inc-exp);
   $("#kpiIncome").textContent=money(inc);$("#kpiInventory").textContent=money(activeProducts().reduce((sum,p)=>sum+p.stock*p.cost,0));$("#kpiPresent").textContent=state.attendance.filter(a=>a.status==="En curso").length;
   $("#lowStockList").innerHTML=state.products.filter(p=>p.status==="Activo"&&p.stock<=p.min).slice(0,6).map(p=>`<div class="list-row"><div><strong>${esc(p.name)}</strong><span>${p.stock} ${esc(p.unit)} · mínimo ${p.min}</span></div>${stockBadge(p)}</div>`).join("")||'<div class="empty-state">Sin alertas de stock.</div>';
   const recent=[
     ...state.sales.slice(0,5).map(x=>({key:x.date+x.time,title:`Venta ${x.id}`,sub:`${money(x.total)} · ${x.status}`,tag:"Venta"})),
     ...state.purchases.slice(0,5).map(x=>({key:x.date+(x.time||"00:00"),title:`Compra ${x.id}`,sub:`${money(x.total)} · ${x.status}`,tag:"Compra"})),
     ...state.moves.slice(0,7).map(x=>({key:x.date+x.time,title:`${x.type} de stock`,sub:`${esc(x.product)} · ${x.status}`,tag:"Stock"}))
   ].sort((a,b)=>b.key.localeCompare(a.key)).slice(0,5);
   $("#recentActivity").innerHTML=recent.map(x=>`<div class="list-row"><div><strong>${x.title}</strong><span>${x.sub}</span></div><span class="badge info">${x.tag}</span></div>`).join("");
}

/* Products CRUD */
function renderProducts(){
  fillCategorySelects();
  const q=$("#productSearch").value.toLowerCase(),cat=$("#categoryFilter").value,sf=$("#stockFilter").value,st=$("#productStatusFilter").value;
  const rows=state.products.filter(p=>{
    const match=(`${p.code} ${p.name} ${p.category} ${p.barcode||""}`).toLowerCase().includes(q);
    const stockOk=!sf||(sf==="low"&&p.stock<=p.min&&p.stock>0)||(sf==="ok"&&p.stock>p.min)||(sf==="zero"&&p.stock<=0);
    return match&&(!cat||p.category===cat)&&stockOk&&(!st||p.status===st);
  });
   $("#productsTable").innerHTML=rows.map(p=>`<tr>
     <td>${esc(p.code)}</td><td><b>${esc(p.name)}</b></td><td>${esc(p.category)}</td><td>${esc(p.unit)}</td>${isAdmin()?`<td>${money(p.cost)}</td>`:""}<td>${money(p.price)}</td><td><b>${p.stock}</b></td><td>${p.min}</td>
     <td>${badge(p.status)}<div class="status-text">${stockBadge(p)}</div></td>
     <td><div class="action-row"><button class="table-btn" onclick="detailProduct(${p.id})">Ver</button>${isAdmin()?`<button class="table-btn" onclick="editProduct(${p.id})">Editar</button><button class="table-btn" onclick="toggleProduct(${p.id})">${p.status==="Activo"?"Desactivar":"Activar"}</button>`:""}</div></td>
   </tr>`).join("");
}
window.detailProduct=id=>{const p=state.products.find(x=>x.id===id);detail(`Producto ${p.code}`,`<p>${esc(p.name)} · ${esc(p.category)} · ${esc(p.unit)}</p><p>Venta: ${money(p.price)}${isAdmin()?` · Costo: ${money(p.cost)}`:""}</p>${p.barcode?`<p>Barcode: ${esc(p.barcode)}</p>`:""}<p>Stock: ${p.stock} · Mínimo: ${p.min} · ${p.status}</p>`)};
function barcodeField(p={}){
  const value=esc(p.barcode||"");
  return `<div class="span-2 barcode-field">
    <label for="barcodeInput">Código de barras</label>
    <div class="barcode-row">
      <input id="barcodeInput" name="barcode" inputmode="numeric" pattern="[0-9]*" maxlength="13" value="${value}" placeholder="7791000000017" autocomplete="off">
      <button type="button" class="btn scan-btn" data-scan-for="barcode">${ZXING_AVAILABLE?"Escanear con la cámara":"Escáner no disponible"}</button>
    </div>
    <small class="form-help">Opcional. Entre 8 y 13 dígitos. Podés escribirlo a mano o escanearlo: el escáner solo traduce las barras al número, no busca productos.</small>
  </div>`;
}
function productFields(p={}){
   const cats=activeCategories().map(c=>`<option ${p.category===c.name?"selected":""}>${esc(c.name)}</option>`).join("");
  return `<div class="form-grid">
     <div><label>Código</label><input name="code" required value="${esc(p.code)}"></div>
     <div><label>Nombre del producto</label><input name="name" required value="${esc(p.name)}"></div>
     ${barcodeField(p)}
     <div><label>Categoría</label><select name="category">${cats}${p.category&&!activeCategories().some(c=>c.name===p.category)?`<option selected>${esc(p.category)}</option>`:""}</select></div>
    <div><label>Unidad</label><select name="unit">${["unidad","metro","kilo","caja","rollo","bolsa","balde"].map(x=>`<option ${p.unit===x?"selected":""}>${x}</option>`).join("")}</select></div>
    <div><label>Costo</label><input name="cost" type="number" min="0" required value="${p.cost||0}"></div>
    <div><label>Precio de venta</label><input name="price" type="number" min="0" required value="${p.price||0}"></div>
     <div><label>Stock inicial / ajuste</label><input name="stock" type="number" min="0" step=".01" required value="${p.stock??0}"></div>
     <div><label>Stock mínimo</label><input name="min" type="number" min="0" step=".01" required value="${p.min??0}"></div>
  </div>`;
}
function validBarcode(value,id){
  const code=(value||"").trim();
  if(!code)return "";
  if(!/^[0-9]{8,13}$/.test(code))return fail("El código de barras debe tener entre 8 y 13 dígitos");
  if(state.products.some(p=>p.id!==id&&p.barcode===code))return fail("Ese código de barras ya está asignado a otro producto");
  return code;
}
function productData(fd,id){const code=fd.get("code").trim(),name=fd.get("name").trim(),stock=+fd.get("stock"),min=+fd.get("min"),cost=+fd.get("cost"),price=+fd.get("price");if(!code||!name)return fail("Completá código y nombre");if(state.products.some(p=>p.id!==id&&p.code.toLowerCase()===code.toLowerCase()))return fail("El código ya existe");if(!fd.get("category"))return fail("Seleccioná una categoría activa");if(![stock,min,cost,price].every(n=>validNumber(n)))return fail("Precios y stock no pueden ser negativos");const barcode=validBarcode(fd.get("barcode"),id);if(barcode===false)return false;return {code,name,barcode,category:fd.get("category"),unit:fd.get("unit"),stock,min,cost,price}}
function recordAdjustment(p,delta,reason){if(!delta)return;state.moves.unshift({id:nextId(state.moves),...stamp(),productId:p.id,product:p.name,type:"Ajuste",qty:delta,reason,user:currentUser.name,status:"Vigente",linked:null})}
function addProduct(){if(!isAdmin())return;openModal("Nuevo producto",productFields(),fd=>{const data=productData(fd);if(!data)return false;const p={id:nextId(state.products),...data,status:"Activo"};state.products.unshift(p);recordAdjustment(p,p.stock,"Stock inicial del producto");return true})}
window.editProduct=id=>{if(!isAdmin())return;const p=state.products.find(x=>x.id===id);openModal("Editar producto",productFields(p),fd=>{const data=productData(fd,id);if(!data)return false;const delta=data.stock-p.stock;Object.assign(p,data);recordAdjustment(p,delta,"Corrección de stock en ficha de producto");return true})}
window.toggleProduct=id=>{if(!isAdmin())return;const p=state.products.find(x=>x.id===id);p.status=p.status==="Activo"?"Inactivo":"Activo";save();renderAll();notify(`Producto ${p.status.toLowerCase()}`)}

/* Categories CRUD */
function renderCategories(){
  const q=$("#categorySearch").value.toLowerCase(),st=$("#categoryStatusFilter").value;
  const rows=state.categories.filter(c=>(`${c.name} ${c.description}`).toLowerCase().includes(q)&&(!st||c.status===st));
   $("#categoriesTable").innerHTML=rows.map(c=>`<tr><td><b>${esc(c.name)}</b></td><td>${esc(c.description)}</td><td>${state.products.filter(p=>p.category===c.name).length}</td><td>${badge(c.status)}</td>
     <td><div class="action-row"><button class="table-btn" onclick="viewCategory(${c.id})">Ver</button><button class="table-btn" onclick="editCategory(${c.id})">Editar</button><button class="table-btn" onclick="toggleCategory(${c.id})">${c.status==="Activo"?"Desactivar":"Activar"}</button></div></td></tr>`).join("");
}
window.viewCategory=id=>{const c=state.categories.find(x=>x.id===id);detail(`Categoría ${c.name}`,`<p>${esc(c.description)} · ${c.status}</p><p>Productos: ${state.products.filter(p=>p.category===c.name).length}</p>`)};
function categoryFields(c={}){return `<div><label>Nombre</label><input name="name" required value="${esc(c.name)}"></div><div><label>Descripción</label><input name="description" value="${esc(c.description)}"></div>`}
function checkCategory(fd,id){const name=fd.get("name").trim();if(!name)return fail("Ingresá un nombre de categoría");if(state.categories.some(c=>c.id!==id&&c.name.toLowerCase()===name.toLowerCase()))return fail("La categoría ya existe");return {name,description:fd.get("description").trim()}}
function addCategory(){openModal("Nueva categoría",categoryFields(),fd=>{const data=checkCategory(fd);if(!data)return false;state.categories.push({id:nextId(state.categories),...data,status:"Activo"});return true})}
window.editCategory=id=>{const c=state.categories.find(x=>x.id===id),old=c.name;openModal("Editar categoría",categoryFields(c),fd=>{const data=checkCategory(fd,id);if(!data)return false;Object.assign(c,data);state.products.filter(p=>p.category===old).forEach(p=>p.category=c.name);return true})}
window.toggleCategory=id=>{if(!isAdmin())return;const c=state.categories.find(x=>x.id===id);c.status=c.status==="Activo"?"Inactivo":"Activo";save();renderAll();notify(`Categoría ${c.status.toLowerCase()}`)}

/* Stock movements CRUD-ish: create, read, annul */
function renderMoves(){
  const q=$("#moveSearch").value.toLowerCase(),t=$("#moveType").value,d=$("#moveDate").value,st=$("#moveStatus").value;
  const rows=state.moves.filter(x=>(`${x.product} ${x.reason} ${x.user}`).toLowerCase().includes(q)&&(!t||x.type===t)&&(!d||x.date===d)&&(!st||x.status===st));
   $("#movesTable").innerHTML=rows.map(x=>`<tr><td>${fmtDate(x.date)} ${x.time}</td><td>${esc(x.product)}</td><td><span class="badge info">${x.type}</span></td><td><b>${x.qty>0?"+":""}${x.qty}</b></td><td>${esc(x.reason)}</td><td>${esc(x.user)}</td><td>${badge(x.status)}</td><td><div class="action-row"><button class="table-btn" onclick="viewMove(${x.id})">Ver</button>${x.status==="Vigente"&&!x.linked?`<button class="table-btn" onclick="voidMove(${x.id})">Anular</button>`:""}</div></td></tr>`).join("");
   $("#stockAvailable").textContent=activeProducts().filter(p=>p.stock>0).length;$("#stockLow").textContent=activeProducts().filter(p=>p.stock>0&&p.stock<=p.min).length;$("#stockZero").textContent=activeProducts().filter(p=>p.stock===0).length;$("#stockUnits").textContent=activeProducts().reduce((s,p)=>s+p.stock,0);
}
window.viewMove=id=>{const m=state.moves.find(x=>x.id===id);detail(`Movimiento ${id}`,`<p>${esc(m.product)} · ${m.type} ${m.qty}</p><p>${fmtDate(m.date)} ${m.time} · ${esc(m.user)}</p><p>Motivo: ${esc(m.reason)} · ${m.status}</p><p>${m.linked?`Operación: ${esc(m.linked)}`:"Movimiento manual"}</p>`)};
function addMove(){
   const opts=activeProducts().map(p=>`<option value="${p.id}">${esc(p.code)} · ${esc(p.name)}</option>`).join("");
   openModal("Registrar movimiento de stock",`<div class="form-grid">
     <div class="span-2"><label>Producto</label><select name="product">${opts}</select></div>
     <div><label>Tipo</label><select name="type"><option>Entrada</option><option>Salida</option><option>Ajuste</option></select></div>
     <div><label>Sentido del ajuste</label><select name="direction"><option value="1">Sumar</option><option value="-1">Restar</option></select></div>
     <div><label>Cantidad</label><input name="qty" type="number" min=".01" step=".01" required></div>
    <div class="span-2"><label>Motivo</label><input name="reason" required></div>
  </div>`,fd=>{
     const p=state.products.find(x=>x.id==fd.get("product")),type=fd.get("type"),raw=+fd.get("qty"),delta=type==="Entrada"?raw:type==="Salida"?-raw:raw*Number(fd.get("direction"));
     if(!p||!validNumber(raw,.01)||!fd.get("reason").trim())return fail("Indicá producto, cantidad positiva y motivo");
     if(p.stock+delta<0)return fail("El movimiento dejaría stock negativo");
     p.stock+=delta;state.moves.unshift({id:nextId(state.moves),...stamp(),productId:p.id,product:p.name,type,qty:delta,reason:fd.get("reason").trim(),user:currentUser.name,status:"Vigente",linked:null});return true;
   });
}
window.voidMove=id=>{if(!isAdmin())return;const m=state.moves.find(x=>x.id===id);if(!m||m.status!=="Vigente"||m.linked)return;const p=state.products.find(x=>x.id===m.productId);if(!p||p.stock-m.qty<0)return fail("No se puede anular: el stock quedaría negativo");if(!confirm("¿Anular este movimiento? Se revertirá su efecto sobre el stock."))return;p.stock-=m.qty;m.status="Anulado";save();renderAll();notify("Movimiento anulado")}

/* Purchases: CRUD logical */
function renderPurchases(){
  const q=$("#purchaseSearch").value.toLowerCase(),d=$("#purchaseDate").value,pm=$("#purchasePayment").value,st=$("#purchaseStatus").value;
   const rows=state.purchases.filter(x=>(`${x.id} ${x.reference} ${(x.items||[]).map(i=>i.name).join(" ")} ${x.detail||""}`).toLowerCase().includes(q)&&(!d||x.date===d)&&(!pm||x.method===pm)&&(!st||x.status===st));
   $("#purchasesTable").innerHTML=rows.map(x=>`<tr><td><b>${x.id}</b></td><td>${fmtDate(x.date)} ${x.time||""}</td><td>${esc(x.reference)}</td><td>${esc((x.items||[]).map(i=>`${i.qty} × ${i.name}`).join(", ")||x.detail||"")}</td><td><b>${money(x.total)}</b></td><td>${x.method}</td><td>${badge(x.status)}</td>
     <td><div class="action-row"><button class="table-btn" onclick="viewPurchase('${x.id}')">Ver</button>${x.status==="Vigente"?`<button class="table-btn" onclick="editPurchase('${x.id}')">Editar</button><button class="table-btn" onclick="voidPurchase('${x.id}')">Anular</button>`:""}</div></td></tr>`).join("");
}
function purchaseLine(i={}){const cost=i.cost??state.products.find(p=>p.id===i.pid)?.cost??activeProducts()[0]?.cost??0,options=state.products.filter(p=>p.status==="Activo"||p.id===i.pid);return `<div class="purchase-line"><select class="line-product" aria-label="Producto">${options.map(p=>`<option value="${p.id}" ${p.id===i.pid?"selected":""}>${esc(p.code)} · ${esc(p.name)}</option>`).join("")}</select><input class="line-qty" aria-label="Cantidad" type="number" min=".01" step=".01" value="${i.qty||1}" required><input class="line-cost" aria-label="Costo unitario" type="number" min="0" step=".01" value="${cost}" required><strong class="line-subtotal">${money((i.qty||1)*cost)}</strong><button type="button" class="table-btn remove-line">Quitar</button></div>`}
function purchaseFields(p={}){return `<div class="form-grid"><div><label>Comercio / referencia</label><input name="reference" required value="${esc(p.reference)}"></div><div><label>Medio de pago</label><select name="method">${["Efectivo","Transferencia","Tarjeta","Mixto"].map(x=>`<option ${p.method===x?"selected":""}>${x}</option>`).join("")}</select></div></div><h4>Productos</h4><div class="purchase-head"><span>Producto</span><span>Cantidad</span><span>Costo unitario</span><span>Subtotal</span><span></span></div><div id="purchaseLines">${(p.items?.length?p.items:[{}]).map(purchaseLine).join("")}</div><button type="button" id="addPurchaseLine" class="btn light small">Agregar producto</button><div class="checkout-line"><span>Total compra</span><strong id="purchaseTotal">$0</strong></div>`}
function purchaseEditor(p){if(!activeProducts().length)return fail("Creá un producto activo antes de registrar compras");openModal(p?`Editar compra ${p.id}`:"Nueva compra",purchaseFields(p),fd=>{
   const reference=fd.get("reference").trim();if(!reference)return fail("Ingresá el comercio o referencia");const items=[...$$("#purchaseLines .purchase-line")].map(el=>{const product=state.products.find(x=>x.id===+el.querySelector(".line-product").value);return {pid:product.id,code:product.code,name:product.name,qty:+el.querySelector(".line-qty").value,cost:+el.querySelector(".line-cost").value}});
   if(!items.length||items.some(i=>!validNumber(i.qty,.01)||!validNumber(i.cost)))return fail("Agregá productos con cantidades positivas y costos válidos");
   if(new Set(items.map(i=>i.pid)).size!==items.length)return fail("No repitas productos: unificá sus cantidades en una línea");
   const old=p?.items||[],delta=new Map();for(const i of old)delta.set(i.pid,(delta.get(i.pid)||0)-i.qty);for(const i of items)delta.set(i.pid,(delta.get(i.pid)||0)+i.qty);
   if([...delta].some(([pid,qty])=>(state.products.find(x=>x.id===pid)?.stock??0)+qty<0))return fail("No se puede editar: el stock quedaría negativo");
   const id=p?.id||nextCode("C",state.purchases),ts=stamp(),total=items.reduce((sum,i)=>sum+i.qty*i.cost,0);
   if(p){state.moves.filter(m=>m.linked===id&&m.status==="Vigente").forEach(m=>m.status="Anulado");Object.assign(p,{reference,method:fd.get("method"),items,total});}
   else{p={id,...ts,reference,method:fd.get("method"),items,total,status:"Vigente"};state.purchases.unshift(p)}
   for(const [pid,qty] of delta){const product=state.products.find(x=>x.id===pid);product.stock+=qty}
   for(const i of items){const product=state.products.find(x=>x.id===i.pid);const prior=old.find(o=>o.pid===i.pid);i.previousCost=prior?.previousCost??product.cost;product.cost=i.cost;state.moves.unshift({id:nextId(state.moves),...ts,productId:i.pid,product:i.name,type:"Entrada",qty:i.qty,reason:`Compra ${id}`,user:currentUser.name,status:"Vigente",linked:id})}
   let a=state.accounting.find(x=>x.linked===id&&x.status==="Vigente");if(a){a.amount=total;a.method=p.method}else state.accounting.unshift({id:nextId(state.accounting),...ts,concept:`Compra ${id}`,origin:"Compra",type:"Egreso",amount:total,method:p.method,user:currentUser.name,status:"Vigente",linked:id});return true
 });$("#modal .modal-card").classList.add("wide");$("#modalForm").addEventListener("click",e=>{if(e.target.id==="addPurchaseLine")$("#purchaseLines").insertAdjacentHTML("beforeend",purchaseLine());if(e.target.classList.contains("remove-line")){e.target.closest(".purchase-line").remove();recalcPurchase()}});$("#modalForm").addEventListener("input",recalcPurchase);$("#modalForm").addEventListener("change",e=>{if(e.target.classList.contains("line-product")){const product=state.products.find(x=>x.id===+e.target.value);e.target.closest(".purchase-line").querySelector(".line-cost").value=product.cost}recalcPurchase()});recalcPurchase()}
function recalcPurchase(){$$("#purchaseLines .purchase-line").forEach(el=>el.querySelector(".line-subtotal").textContent=money(+el.querySelector(".line-qty").value*+el.querySelector(".line-cost").value));$("#purchaseTotal").textContent=money($$("#purchaseLines .purchase-line").reduce((s,el)=>s+(+el.querySelector(".line-qty").value*+el.querySelector(".line-cost").value),0))}
function addPurchase(){purchaseEditor()}
window.editPurchase=id=>{if(!isAdmin())return;const p=state.purchases.find(x=>x.id===id);if(p?.status==="Vigente"&&p.items?.length)purchaseEditor(p);else fail("Esta compra anterior no tiene productos asociados; solo puede consultarse o anularse")};
window.viewPurchase=id=>{const p=state.purchases.find(x=>x.id===id);detail(`Compra ${id}`,`<p>${fmtDate(p.date)} ${p.time||""} · ${esc(p.reference)} · ${p.status}</p>${(p.items||[]).map(i=>`<p>${esc(i.code)} · ${esc(i.name)}: ${i.qty} × ${money(i.cost)} = ${money(i.qty*i.cost)}</p>`).join("")||`<p>${esc(p.detail||"Sin detalle")}</p>`}<p>Total: ${money(p.total)} · ${p.method}</p>`)};
window.voidPurchase=id=>{if(!isAdmin())return;const p=state.purchases.find(x=>x.id===id);if(!p||p.status==="Anulada")return;if((p.items||[]).some(i=>state.products.find(x=>x.id===i.pid)?.stock<i.qty))return fail("No se puede anular: parte de la mercadería ya fue vendida o utilizada");if(!confirm(`¿Anular la compra ${id}? Se revertirá el stock y el egreso.`))return;for(const i of p.items||[]){const product=state.products.find(x=>x.id===i.pid);if(product){product.stock-=i.qty;if(i.previousCost!=null&&product.cost===i.cost)product.cost=i.previousCost}}p.status="Anulada";state.moves.filter(m=>m.linked===id).forEach(m=>m.status="Anulado");state.accounting.filter(a=>a.linked===id).forEach(a=>a.status="Anulado");save();renderAll();notify("Compra anulada")}

/* Accounting CRUD */
function renderAccounting(){
   const q=$("#accountSearch").value.toLowerCase(),t=$("#accountType").value,m=$("#accountMethod").value,st=$("#accountStatus").value,d=$("#accountDate").value;
   const rows=state.accounting.filter(x=>(`${x.concept} ${x.origin} ${x.user}`).toLowerCase().includes(q)&&(!t||x.type===t)&&(!m||x.method===m)&&(!st||x.status===st)&&(!d||x.date===d));
   $("#accountingTable").innerHTML=rows.map(x=>`<tr><td>${fmtDate(x.date)} ${x.time}</td><td>${esc(x.concept)}</td><td>${x.origin}</td><td><span class="badge info">${x.type}</span></td><td><b>${money(x.amount)}</b></td><td>${x.method}</td><td>${esc(x.user)}</td><td>${badge(x.status)}</td>
   <td><div class="action-row"><button class="table-btn" onclick="viewAccounting(${x.id})">Ver</button>${x.origin==="Manual"&&x.status==="Vigente"?`<button class="table-btn" onclick="editAccounting(${x.id})">Editar</button><button class="table-btn" onclick="voidAccounting(${x.id})">Anular</button>`:""}</div></td></tr>`).join("");
  const valid=state.accounting.filter(x=>x.status==="Vigente"),inc=valid.filter(x=>x.type==="Ingreso").reduce((s,x)=>s+x.amount,0),exp=valid.filter(x=>x.type==="Egreso").reduce((s,x)=>s+x.amount,0);
  $("#accountIncome").textContent=money(inc);$("#accountExpense").textContent=money(exp);$("#accountBalance").textContent=money(inc-exp);
  for(const [method,id] of [["Efectivo","cashEstimate"],["Transferencia","transferEstimate"],["Tarjeta","cardEstimate"]]){
    const balance=valid.reduce((sum,x)=>sum+(x.type==="Ingreso"?1:-1)*(x.method==="Mixto"?(x.payments?.[method]||0):x.method===method?x.amount:0),0);
    $("#"+id).textContent=money(balance);
  }
}
window.viewAccounting=id=>{const a=state.accounting.find(x=>x.id===id);detail(`Movimiento de caja ${id}`,`<p>${fmtDate(a.date)} ${a.time} · ${esc(a.concept)}</p><p>${a.type} ${money(a.amount)} · ${a.method} · ${a.status}</p>${a.method==="Mixto"&&a.payments?`<p>${Object.entries(a.payments).filter(([,n])=>n>0).map(([m,n])=>`${m}: ${money(n)}`).join(" · ")}</p>`:""}<p>Origen: ${a.origin}${a.linked?` · Operación ${esc(a.linked)}`:""} · Usuario: ${esc(a.user)}</p>`)};
function accountingFields(a={}){
   return `<div class="form-grid"><div class="span-2"><label>Concepto</label><input name="concept" required value="${esc(a.concept)}"></div><div><label>Tipo</label><select name="type">${["Ingreso","Egreso"].map(x=>`<option ${a.type===x?"selected":""}>${x}</option>`).join("")}</select></div><div><label>Monto</label><input name="amount" type="number" min=".01" step=".01" required value="${a.amount??""}"></div><div class="span-2"><label>Medio</label><select name="method">${["Efectivo","Transferencia","Tarjeta","Mixto"].map(x=>`<option ${a.method===x?"selected":""}>${x}</option>`).join("")}</select></div></div>`;
}
function accountingData(fd){const concept=fd.get("concept").trim(),amount=+fd.get("amount");if(!concept||!validNumber(amount,.01))return fail("Indicá un concepto y un monto positivo");return {concept,amount,type:fd.get("type"),method:fd.get("method")}}
function addAccounting(){openModal("Nuevo movimiento contable",accountingFields(),fd=>{const data=accountingData(fd);if(!data)return false;state.accounting.unshift({id:nextId(state.accounting),...stamp(),...data,origin:"Manual",user:currentUser.name,status:"Vigente",linked:null});return true})}
window.editAccounting=id=>{const a=state.accounting.find(x=>x.id===id);if(a?.origin!=="Manual")return;openModal("Editar movimiento",accountingFields(a),fd=>{const data=accountingData(fd);if(!data)return false;Object.assign(a,data);return true})}
window.voidAccounting=id=>{const a=state.accounting.find(x=>x.id===id);if(a?.origin!=="Manual"||a.status!=="Vigente")return;if(confirm("¿Anular este movimiento contable?")){a.status="Anulado";save();renderAll();notify("Movimiento anulado")}}


/* Employees */
function renderEmployees(){
  const q=$("#employeeSearch")?.value.toLowerCase()||"", sector=$("#employeeSectorFilter")?.value||"", st=$("#employeeStatusFilter")?.value||"", role=$("#employeeRoleFilter")?.value||"";
  const sectors=[...new Set(state.employees.map(e=>e.sector))].sort();
  const roles=[...new Set(state.employees.map(e=>e.position))].sort();
  const sf=$("#employeeSectorFilter"), rf=$("#employeeRoleFilter");
   if(sf){const cur=sf.value;sf.innerHTML='<option value="">Todos los sectores</option>'+sectors.map(x=>`<option ${x===cur?"selected":""}>${esc(x)}</option>`).join("")}
   if(rf){const cur=rf.value;rf.innerHTML='<option value="">Todos los puestos</option>'+roles.map(x=>`<option ${x===cur?"selected":""}>${esc(x)}</option>`).join("")}

  const rows=state.employees.filter(e=>(`${e.name} ${e.dni} ${e.sector} ${e.position}`).toLowerCase().includes(q)&&(!sector||e.sector===sector)&&(!st||e.status===st)&&(!role||e.position===role));
   $("#employeesTable").innerHTML=rows.map(e=>`<tr>
     <td><b>${esc(e.name)}</b></td><td>${esc(e.dni)}</td><td>${esc(e.sector)}</td><td>${esc(e.position)}</td><td>${esc(e.phone)}</td><td>${badge(e.status)}</td>
     <td><div class="action-row"><button class="table-btn" onclick="viewEmployee(${e.id})">Ver</button><button class="table-btn" onclick="editEmployee(${e.id})">Editar</button><button class="table-btn" onclick="toggleEmployee(${e.id})">${e.status==="Activo"?"Desactivar":"Activar"}</button></div></td>
   </tr>`).join("");

   const active=state.employees.filter(e=>e.status==="Activo");
   const present=active.filter(e=>state.attendance.some(a=>a.employeeId===e.id&&a.status==="En curso"));
   $("#employeeActiveCount").textContent=active.length;
   $("#employeePresentCount").textContent=present.length;
   $("#employeeOpenCount").textContent=state.attendance.filter(a=>a.status==="En curso").length;
   $("#employeeAbsentCount").textContent=active.length-present.length;
   $("#employeeHoursToday").textContent=hours(state.attendance.filter(a=>a.date===today()&&a.status==="Finalizada").reduce((s,a)=>s+duration(a),0));
   $("#employeeSectorCount").textContent=new Set(active.map(e=>e.sector)).size;
   $("#presentList").innerHTML=present.map(e=>{const a=state.attendance.find(x=>x.employeeId===e.id&&x.status==="En curso");return `<div class="list-row"><div><strong>${esc(e.name)}</strong><span>${esc(e.sector)} · Entrada ${a.entry}</span></div>${badge("En curso")}</div>`}).join("")||'<div class="empty-state">No hay sesiones abiertas.</div>';
}
window.viewEmployee=id=>{const e=state.employees.find(x=>x.id===id);detail(e.name,`<p>DNI: ${esc(e.dni)} · Teléfono: ${esc(e.phone)}</p><p>${esc(e.sector)} · ${esc(e.position)} · ${e.status}</p>`)};
function employeeFields(e={}){
  return `<div class="form-grid">
     <div><label>Nombre y apellido</label><input name="name" required value="${esc(e.name)}"></div>
     <div><label>DNI</label><input name="dni" required value="${esc(e.dni)}"></div>
     <div><label>Sector</label><select name="sector">${["Mostrador","Caja","Depósito","Administración"].map(s=>`<option ${e.sector===s?"selected":""}>${s}</option>`).join("")}</select></div>
     <div><label>Puesto</label><input name="position" required value="${esc(e.position)}"></div>
     <div class="span-2"><label>Teléfono</label><input name="phone" value="${esc(e.phone)}"></div>
   </div>`;
}
function employeeData(fd,id){const name=fd.get("name").trim(),dni=fd.get("dni").trim(),position=fd.get("position").trim();if(!name||!dni||!position)return fail("Completá nombre, DNI y puesto");if(state.employees.some(e=>e.id!==id&&e.dni===dni))return fail("El DNI ya está registrado");return {name,dni,position,sector:fd.get("sector"),phone:fd.get("phone").trim()||"-"}}
function addEmployee(){openModal("Nuevo empleado",employeeFields(),fd=>{const data=employeeData(fd);if(!data)return false;state.employees.push({id:nextId(state.employees),...data,status:"Activo"});return true})}
window.editEmployee=id=>{const e=state.employees.find(x=>x.id===id);openModal("Editar empleado",employeeFields(e),fd=>{const data=employeeData(fd,id);if(!data)return false;Object.assign(e,data);return true})}
window.toggleEmployee=id=>{const e=state.employees.find(x=>x.id===id);if(e.status==="Activo"&&state.attendance.some(a=>a.employeeId===id&&a.status==="En curso"))return fail("Cerrá su sesión de asistencia antes de desactivar al empleado");e.status=e.status==="Activo"?"Inactivo":"Activo";save();renderAll();notify(`Empleado ${e.status.toLowerCase()}`)}

/* Attendance */
function renderAttendance(){
   const q=$("#attendanceSearch").value.toLowerCase(),emp=$("#attendanceEmployeeFilter").value,type=$("#attendanceTypeFilter").value,date=$("#attendanceDateFilter").value,sector=$("#attendanceSectorFilter").value,from=$("#attendanceFrom").value,to=$("#attendanceTo").value;
   const ef=$("#attendanceEmployeeFilter");
   if(ef){const cur=ef.value;ef.innerHTML='<option value="">Todos los empleados</option>'+state.employees.map(e=>`<option value="${e.id}" ${String(e.id)===cur?"selected":""}>${esc(e.name)}</option>`).join("")}
   const rows=state.attendance.filter(a=>{
     const e=state.employees.find(x=>x.id===a.employeeId);
     const text=`${a.employee} ${e?.dni||""} ${a.sector}`.toLowerCase();
     return text.includes(q)&&(!emp||String(a.employeeId)===emp)&&(!type||a.status===type)&&(!date||a.date===date)&&(!sector||a.sector===sector)&&(!from||a.date>=from)&&(!to||a.date<=to);
   });
   $("#attendanceTable").innerHTML=rows.map(a=>`<tr>
     <td><b>${esc(a.employee)}</b><br>${esc(state.employees.find(e=>e.id===a.employeeId)?.dni||"-")}</td><td>${esc(a.sector)}</td><td>${fmtDate(a.date)}</td><td>${a.entry}</td><td>${a.exit||"En curso"}</td><td>${a.exit?hours(duration(a)):"En curso"}</td><td>${badge(a.status)}</td>
     <td><div class="action-row"><button class="table-btn" onclick="viewAttendance(${a.id})">Ver</button>${a.status!=="Anulada"?`<button class="table-btn" onclick="editAttendance(${a.id})">Corregir</button><button class="table-btn" onclick="voidAttendance(${a.id})">Anular</button>`:""}</div></td>
   </tr>`).join("");
   const valid=state.attendance.filter(a=>a.status!=="Anulada"),completed=valid.filter(a=>a.status==="Finalizada"),open=valid.filter(a=>a.status==="En curso");
   $("#attendanceEntriesCount").textContent=state.employees.filter(e=>e.status==="Activo").length;
   $("#attendanceExitsCount").textContent=completed.filter(a=>a.date===today()).length;
   $("#attendancePresentCount").textContent=open.length;
   $("#attendanceTotalCount").textContent=hours(completed.filter(a=>a.date===today()).reduce((s,a)=>s+duration(a),0));
   $("#attendanceSummary").innerHTML=`<table><thead><tr><th>Empleado</th><th>Horas hoy</th><th>Horas en período</th><th>Asistencias</th><th>Sesiones abiertas</th></tr></thead><tbody>${state.employees.map(e=>{const sessions=valid.filter(a=>a.employeeId===e.id&&(!from||a.date>=from)&&(!to||a.date<=to));return `<tr><td>${esc(e.name)}</td><td>${hours(sessions.filter(a=>a.date===today()).reduce((s,a)=>s+duration(a),0))}</td><td>${hours(sessions.reduce((s,a)=>s+duration(a),0))}</td><td>${sessions.length}</td><td>${sessions.filter(a=>a.status==="En curso").length}</td></tr>`}).join("")}</tbody></table>`;
}
function updateClock(){const d=new Date();$("#kioskClock").textContent=d.toLocaleTimeString("es-AR");$("#kioskDate").textContent=d.toLocaleDateString("es-AR",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}
function addAttendance(){if(!isAdmin())return;$("#fingerEmployee").innerHTML=state.employees.filter(e=>e.status==="Activo").map(e=>`<option value="${e.id}">${esc(e.name)} · ${esc(e.sector)}</option>`).join("");$("#readerStatus").textContent="Lector listo";$("#kioskResult").classList.add("hidden");$("#kiosk").classList.remove("hidden");updateClock()}
function scanFinger(){const e=state.employees.find(x=>x.id===+$("#fingerEmployee").value&&x.status==="Activo");if(!e)return fail("Seleccioná un empleado activo");const open=state.attendance.find(a=>a.employeeId===e.id&&a.status==="En curso"),ts=stamp();let result;
   if(open){if(new Date(ts.at)<new Date(open.entryAt||`${open.date}T${open.entry}:00`))return fail("La salida debe ser posterior a la entrada");open.exit=ts.time;open.exitAt=ts.at;open.status="Finalizada";result=`<strong>${esc(e.name)}</strong><br>SALIDA REGISTRADA · ${ts.time}<br>Tiempo trabajado: ${hours(duration(open))}`}
   else{state.attendance.unshift({id:nextId(state.attendance),employeeId:e.id,employee:e.name,sector:e.sector,date:ts.date,entry:ts.time,entryAt:ts.at,exit:null,status:"En curso",method:"Huella (demo)"});result=`<strong>${esc(e.name)}</strong><br>ENTRADA REGISTRADA · ${ts.time}`}
   $("#kioskResult").innerHTML=result;$("#kioskResult").classList.remove("hidden");$("#kioskResult").classList.add("good");$("#readerStatus").textContent="Lectura correcta · listo para la próxima huella";save();renderAll();notify("Asistencia registrada")
}
window.viewAttendance=id=>{if(!isAdmin())return;const a=state.attendance.find(x=>x.id===id),e=state.employees.find(x=>x.id===a.employeeId);detail(`Sesión ${id}`,`<p>${esc(a.employee)} · DNI ${esc(e?.dni||"-")} · ${esc(a.sector)}</p><p>${fmtDate(a.date)} · Entrada ${a.entry} · Salida ${a.exit||"En curso"}</p><p>${a.exit?hours(duration(a)):"En curso"} · ${a.status} · ${esc(a.method)}</p>`)};
window.editAttendance=id=>{if(!isAdmin())return;const a=state.attendance.find(x=>x.id===id);if(!a||a.status==="Anulada")return;openModal(`Corregir sesión ${id}`,`<div class="form-grid"><div><label>Fecha</label><input name="date" type="date" required value="${a.date}"></div><div><label>Entrada</label><input name="entry" type="time" required value="${a.entry}"></div><div><label>Salida (vacía si continúa)</label><input name="exit" type="time" value="${a.exit||""}"></div><div><label>Motivo de corrección</label><input name="reason" required></div></div>`,fd=>{const date=fd.get("date"),entry=fd.get("entry"),exit=fd.get("exit");if(!fd.get("reason").trim())return fail("Indicá el motivo de la corrección");const start=new Date(`${date}T${entry}:00`),end=exit?new Date(`${date}T${exit}:00`):null;if(Number.isNaN(+start)||(end&&(+end<=+start)))return fail("La salida debe ser posterior a la entrada");if(!exit&&state.attendance.some(x=>x!==a&&x.employeeId===a.employeeId&&x.status==="En curso"))return fail("El empleado ya tiene otra sesión abierta");Object.assign(a,{date,entry,exit:exit||null,entryAt:start.toISOString(),exitAt:end?.toISOString()||null,status:exit?"Finalizada":"En curso",correction:fd.get("reason").trim()});return true})};
window.voidAttendance=id=>{if(!isAdmin())return;const a=state.attendance.find(x=>x.id===id);if(a&&a.status!=="Anulada"&&confirm("¿Anular esta sesión? El registro se conservará en el historial.")){a.status="Anulada";save();renderAll();notify("Sesión anulada")}}


/* Reports */
function renderReports(){
   const from=$("#reportFrom").value,to=$("#reportTo").value,period=x=>(!from||x.date>=from)&&(!to||x.date<=to);
   const sales=state.sales.filter(s=>s.status==="Vigente"&&period(s)),financial=state.accounting.filter(a=>a.status==="Vigente"&&period(a));
   const totals={};sales.forEach(s=>s.items.forEach(i=>totals[i.name]=(totals[i.name]||0)+i.qty));
   $("#topProductsReport").innerHTML=Object.entries(totals).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([n,q])=>`<div class="report-item"><span>${esc(n)}</span><b>${q} u.</b></div>`).join("")||'<p class="muted">Sin ventas en el período.</p>';
   const pay={};sales.forEach(s=>pay[s.method]=(pay[s.method]||0)+s.total);
   $("#paymentReport").innerHTML=Object.entries(pay).map(([m,v])=>`<div class="report-item"><span>${m}</span><b>${money(v)}</b></div>`).join("")||'<p class="muted">Sin ventas en el período.</p>';
   const inv=state.products.filter(p=>p.status==="Activo").reduce((s,p)=>s+p.cost*p.stock,0);
   $("#inventoryReport").innerHTML=`${money(inv)}<small>Valor estimado al costo de los productos actualmente en stock.</small>`;
   const revenue=sales.reduce((s,x)=>s+x.total,0);
   const cost=sales.reduce((s,sale)=>s+sale.items.reduce((z,i)=>z+(i.cost??state.products.find(x=>x.id===i.pid)?.cost??0)*i.qty,0),0);
   $("#marginReport").innerHTML=`${money(revenue-cost)}<small>Margen bruto estimado de las ventas registradas en la demo.</small>`;
   const income=financial.filter(a=>a.type==="Ingreso").reduce((s,a)=>s+a.amount,0),expense=financial.filter(a=>a.type==="Egreso").reduce((s,a)=>s+a.amount,0);
   $("#reportSummary").innerHTML=[["Ventas totales",money(revenue)],["Cantidad de ventas",sales.length],["Ingresos",money(income)],["Egresos",money(expense)],["Resultado",money(income-expense)],["Margen bruto",money(revenue-cost)],["Stock bajo",activeProducts().filter(p=>p.stock>0&&p.stock<=p.min).length],["Sin stock",activeProducts().filter(p=>p.stock===0).length]].map(([label,value])=>`<article class="stat-card"><span>${label}</span><strong>${value}</strong></article>`).join("");
   $("#reportStock").innerHTML=activeProducts().filter(p=>p.stock<=p.min).map(p=>`<div class="report-item"><span>${esc(p.name)}</span><b>${p.stock===0?"Agotado":`${p.stock} / ${p.min}`}</b></div>`).join("")||'<p class="muted">Sin alertas.</p>';
   const daily={};sales.forEach(s=>daily[s.date]=(daily[s.date]||0)+s.total);$("#reportDaily").innerHTML=Object.entries(daily).sort((a,b)=>b[0].localeCompare(a[0])).map(([d,total])=>`<div class="report-item"><span>${fmtDate(d)}</span><b>${money(total)}</b></div>`).join("")||'<p class="muted">Sin ventas en el período.</p>';
}

/* Users CRUD */
function renderUsers(){
  const q=$("#userSearch").value.toLowerCase(),st=$("#userStatusFilter").value;
   $("#usersTable").innerHTML=state.users.filter(x=>(`${x.name} ${x.username}`).toLowerCase().includes(q)&&(!st||x.status===st)).map(x=>`<tr><td><b>${esc(x.name)}</b></td><td>${esc(x.username)}</td><td>${x.role}</td><td>${badge(x.status)}</td><td>${esc(x.last)}</td>
   <td><div class="action-row"><button class="table-btn" onclick="viewUser(${x.id})">Ver</button><button class="table-btn" onclick="editUser(${x.id})">Editar</button><button class="table-btn" onclick="toggleUser(${x.id})">${x.status==="Activo"?"Desactivar":"Activar"}</button></div></td></tr>`).join("");
}
window.viewUser=id=>{if(!isAdmin())return;const u=state.users.find(x=>x.id===id);detail(u.name,`<p>Usuario: ${esc(u.username)} · ${u.role} · ${u.status}</p><p>Último acceso: ${esc(u.last)}</p>`)};
function userFields(u={}){
   return `<div class="form-grid"><div><label>Nombre</label><input name="name" required value="${esc(u.name)}"></div><div><label>Usuario</label><input name="username" required value="${esc(u.username)}"></div><div><label>Contraseña ${u.id?"(dejar vacía para mantener)":""}</label><input name="password" type="password" ${u.id?"":"required"} minlength="4" autocomplete="new-password"></div><div><label>Rol</label><select name="role">${["Vendedor","Administrador"].map(x=>`<option ${u.role===x?"selected":""}>${x}</option>`).join("")}</select></div><div><label>Estado</label><select name="status">${["Activo","Inactivo"].map(x=>`<option ${u.status===x?"selected":""}>${x}</option>`).join("")}</select></div></div>`;
}
function userData(fd,id){const name=fd.get("name").trim(),username=fd.get("username").trim(),password=fd.get("password");if(!name||!username)return fail("Ingresá nombre y usuario");if(state.users.some(u=>u.id!==id&&u.username.toLowerCase()===username.toLowerCase()))return fail("El nombre de usuario ya existe");if(password&&password.length<4)return fail("La contraseña debe tener al menos 4 caracteres");if(!id&&!password)return fail("Ingresá una contraseña");if(id===currentUser.id&&(fd.get("status")!=="Activo"||fd.get("role")!=="Administrador"))return fail("No podés quitarte el acceso de administrador en esta sesión");return {name,username,role:fd.get("role"),status:fd.get("status"),...(password?{password}:{})}}
function addUser(){if(!isAdmin())return;openModal("Nuevo usuario",userFields(),fd=>{const data=userData(fd);if(!data)return false;state.users.push({id:nextId(state.users),...data,last:"Sin acceso"});return true})}
window.editUser=id=>{if(!isAdmin())return;const u=state.users.find(x=>x.id===id);openModal("Editar usuario",userFields(u),fd=>{const data=userData(fd,id);if(!data)return false;Object.assign(u,data);if(id===currentUser.id){currentUser.name=u.name;currentUser.username=u.username;$("#sidebarUser").textContent=u.name}return true})}
window.toggleUser=id=>{if(!isAdmin())return;if(id===currentUser.id)return fail("No podés desactivar tu propio usuario");const u=state.users.find(x=>x.id===id);u.status=u.status==="Activo"?"Inactivo":"Activo";save();renderAll();notify(`Usuario ${u.status.toLowerCase()}`)}

/* Modal and render */
function openModal(title,html,onSubmit){
   $("#modal .modal-card").classList.remove("wide");$("#modalTitle").textContent=title;$("#modalForm").innerHTML=html+'<button class="btn primary full" type="submit">Guardar</button>';$("#modal").classList.remove("hidden");
   $("#modalForm").onsubmit=e=>{e.preventDefault();if(onSubmit(new FormData($("#modalForm")))===false)return;save();closeModal();renderAll();notify("Cambios guardados")};
}
function detail(title,html){openModal(title,`<div class="detail-box">${html}</div>`,()=>true);$("#modalForm button[type=submit]").remove()}
function closeModal(){$("#modal").classList.add("hidden")}
function renderAll(){fillCategorySelects();renderPosResults();renderCart();renderSales();renderDashboard();renderProducts();renderCategories();renderMoves();renderPurchases();renderAccounting();renderEmployees();renderAttendance();renderReports();renderUsers();applyRole()}

/* Events */
$("#loginForm").addEventListener("submit",e=>{e.preventDefault();const ok=login($("#username").value.trim(),$("#password").value);$("#loginError").textContent=ok?"":"Usuario o contraseña incorrectos."});
$$(".demo-user").forEach(b=>b.addEventListener("click",()=>{$("#username").value=b.dataset.user;$("#password").value=b.dataset.pass}));
$("#logoutBtn").addEventListener("click",logout);

/* Menu lateral en pantallas chicas: cajon deslizante con overlay.
 * En escritorio el menu siempre esta visible, asi que todo esto es no-op. */
const MOBILE_NAV=window.matchMedia("(max-width:780px)");
function setMenu(open){
  $("#appView").classList.toggle("menu-open",open);
  $("#menuOverlay").hidden=!open;
  document.body.classList.toggle("menu-locked",open&&MOBILE_NAV.matches);
  $("#menuToggle")?.setAttribute("aria-expanded",String(open));
  if(open)$("#menuClose")?.focus();
}
$("#menuToggle").addEventListener("click",()=>setMenu(true));
$("#menuClose").addEventListener("click",()=>setMenu(false));
$("#menuOverlay").addEventListener("click",()=>setMenu(false));
// Al navegar en movil se cierra el cajon.
$("#sidebar").addEventListener("click",e=>{if(e.target.closest(".nav-item,.nav-subitem,.nav-group-toggle")&&MOBILE_NAV.matches)setMenu(false)});
// Escape cierra el menu si esta abierto. El cierre de scanner, modal y venta
// lo maneja un unico listener mas abajo, asi no se pisan entre si.
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"&&$("#appView").classList.contains("menu-open"))setMenu(false);
});
// Si pasamos a escritorio, el estado del cajon no debe quedar pegado.
MOBILE_NAV.addEventListener("change",e=>{if(!e.matches)setMenu(false)});
$$(".nav-item, .nav-subitem").forEach(b=>b.addEventListener("click",()=>showSection(b.dataset.section)));
$$(".nav-group-toggle").forEach(b=>b.addEventListener("click",()=>{const menu=$("#"+b.dataset.group);const open=menu.classList.toggle("open");b.setAttribute("aria-expanded",String(open));}));
$$("[data-go]").forEach(b=>b.addEventListener("click",()=>showSection(b.dataset.go)));
$("#closeModal").addEventListener("click",closeModal);$("#modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});

$("#posSearch").addEventListener("input",renderPosResults);$("#posCategory").addEventListener("change",renderPosResults);
$("#newSaleBtn").addEventListener("click",openNewSale);
$("#closeSaleBtn").addEventListener("click",closeSale);$("#cancelSaleBtn").addEventListener("click",closeSale);
$("#saleModal").addEventListener("click",e=>{if(e.target.id==="saleModal")closeSale()});
document.addEventListener("keydown",e=>{if(e.key!=="Escape")return;if(!$("#scanner")?.classList.contains("hidden")){e.preventDefault();return closeScanner()}if(!$("#modal").classList.contains("hidden"))closeModal();else if(!$("#saleModal").classList.contains("hidden"))closeSale()});
$("#showProductPicker").addEventListener("click",()=>{$("#saleProductPicker").classList.remove("hidden");$("#showProductPicker").setAttribute("aria-expanded","true");$("#posSearch").focus()});
$("#scanProductBtn").addEventListener("click",()=>window.scanProduct());
$("#scanCodeOnlyBtn").addEventListener("click",()=>window.scanCodeOnly());
$("#closeScanner").addEventListener("click",closeScanner);
$("#scanner").addEventListener("click",e=>{if(e.target.id==="scanner")closeScanner()});
document.addEventListener("click",e=>{const trigger=e.target.closest("[data-scan-for]");if(!trigger)return;e.preventDefault();window.scanIntoField(trigger.dataset.scanFor)});
$("#saleAdjustment").addEventListener("change",updateSaleControls);
$("#saleAdjustmentMode").addEventListener("change",renderCart);$("#saleAdjustmentValue").addEventListener("input",renderCart);
$("#cartMethod").addEventListener("change",updateSaleControls);
["mixedCash","mixedTransfer","mixedCard"].forEach(id=>$("#"+id).addEventListener("input",renderCart));
$("#previewSaleBtn").addEventListener("click",previewSale);$("#confirmSaleBtn").addEventListener("click",confirmSale);
 ["saleSearch","saleSeller","saleDate","saleMethod","saleStatus"].forEach(id=>$("#"+id).addEventListener(["saleSearch","saleSeller"].includes(id)?"input":"change",renderSales));
["productSearch","categoryFilter","stockFilter","productStatusFilter"].forEach(id=>$("#"+id).addEventListener(id==="productSearch"?"input":"change",renderProducts));
["categorySearch","categoryStatusFilter"].forEach(id=>$("#"+id).addEventListener(id==="categorySearch"?"input":"change",renderCategories));
["moveSearch","moveType","moveDate","moveStatus"].forEach(id=>$("#"+id).addEventListener(id==="moveSearch"?"input":"change",renderMoves));
["purchaseSearch","purchaseDate","purchasePayment","purchaseStatus"].forEach(id=>$("#"+id).addEventListener(id==="purchaseSearch"?"input":"change",renderPurchases));
 ["accountSearch","accountType","accountMethod","accountStatus","accountDate"].forEach(id=>$("#"+id).addEventListener(id==="accountSearch"?"input":"change",renderAccounting));
 ["reportFrom","reportTo"].forEach(id=>$("#"+id).addEventListener("change",renderReports));
["userSearch","userStatusFilter"].forEach(id=>$("#"+id).addEventListener(id==="userSearch"?"input":"change",renderUsers));

["employeeSearch","employeeSectorFilter","employeeStatusFilter","employeeRoleFilter"].forEach(id=>$("#"+id)?.addEventListener(id==="employeeSearch"?"input":"change",renderEmployees));
 ["attendanceSearch","attendanceEmployeeFilter","attendanceTypeFilter","attendanceDateFilter","attendanceFrom","attendanceTo","attendanceSectorFilter"].forEach(id=>$("#"+id)?.addEventListener(id==="attendanceSearch"?"input":"change",renderAttendance));
 $("#newEmployeeBtn")?.addEventListener("click",addEmployee);
 $("#newAttendanceBtn")?.addEventListener("click",addAttendance);
 $("#closeKiosk").addEventListener("click",()=>$("#kiosk").classList.add("hidden"));
 $("#scanFinger").addEventListener("click",scanFinger);
 setInterval(()=>{if(!$("#kiosk").classList.contains("hidden"))updateClock()},1000);
$("#newProductBtn").addEventListener("click",addProduct);$("#newCategoryBtn").addEventListener("click",addCategory);$("#newStockMoveBtn").addEventListener("click",addMove);
$("#newPurchaseBtn").addEventListener("click",addPurchase);$("#newAccountingBtn").addEventListener("click",addAccounting);$("#newUserBtn").addEventListener("click",addUser);
 $("#resetDemo").addEventListener("click",()=>{if(!isAdmin())return;if(confirm("¿Restablecer todos los datos de demostración?")){state=seedState();cart=[];save();if(!state.users.some(u=>u.id===currentUser.id&&u.status==="Activo")){logout()}else{const u=state.users.find(x=>x.id===currentUser.id);currentUser={id:u.id,username:u.username,name:u.name,role:u.role};$("#sidebarUser").textContent=u.name}renderAll();if(currentUser)showSection("ventas");notify("Datos de demostración restablecidos")}});

renderCart();
