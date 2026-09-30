
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const STORAGE_KEY = "impulso_ferreteria_demo_v02";

function seedState(){
  return {
    products:[
      {id:1,code:"FER-001",name:"Martillo carpintero 16 oz",brand:"Tramontina",category:"Herramientas",unit:"unidad",cost:14500,price:19500,stock:8,min:5},
      {id:2,code:"FER-002",name:"Cinta aisladora negra 20 m",brand:"Tacsa",category:"Electricidad",unit:"unidad",cost:1050,price:1800,stock:24,min:10},
      {id:3,code:"FER-003",name:"Tornillo autoperforante 8x1",brand:"Genérico",category:"Tornillería",unit:"unidad",cost:55,price:100,stock:120,min:150},
      {id:4,code:"FER-004",name:"Cable unipolar 2,5 mm",brand:"Kalop",category:"Electricidad",unit:"metro",cost:820,price:1200,stock:68,min:40},
      {id:5,code:"FER-005",name:"Llave de paso 1/2",brand:"Hidro 3",category:"Plomería",unit:"unidad",cost:4100,price:5900,stock:3,min:6},
      {id:6,code:"FER-006",name:"Disco de corte 115 mm",brand:"Bosch",category:"Herramientas",unit:"unidad",cost:1850,price:2800,stock:18,min:8},
      {id:7,code:"FER-007",name:"Silicona transparente 280 ml",brand:"Suprabond",category:"Adhesivos",unit:"unidad",cost:3250,price:4700,stock:5,min:5},
      {id:8,code:"FER-008",name:"Rodillo antigota 22 cm",brand:"El Galgo",category:"Pinturería",unit:"unidad",cost:5800,price:7900,stock:11,min:4},
      {id:9,code:"FER-009",name:"Caño PVC 40 mm x 4 m",brand:"Tigre",category:"Plomería",unit:"unidad",cost:9100,price:12900,stock:7,min:6},
      {id:10,code:"FER-010",name:"Mecha widia 8 mm",brand:"Bosch",category:"Herramientas",unit:"unidad",cost:3600,price:5200,stock:0,min:4},
      {id:11,code:"FER-011",name:"Látex interior blanco 20 L",brand:"Alba",category:"Pinturería",unit:"balde",cost:68500,price:89900,stock:6,min:3},
      {id:12,code:"FER-012",name:"Candado 50 mm",brand:"Yale",category:"Seguridad",unit:"unidad",cost:9800,price:13800,stock:14,min:5}
    ],
    sales:[
      {id:"V-000154",date:"2026-09-30",time:"09:18",client:"Consumidor final",items:[{pid:4,name:"Cable unipolar 2,5 mm",qty:12,price:1200},{pid:2,name:"Cinta aisladora negra 20 m",qty:2,price:1800}],total:18000,method:"Efectivo",seller:"Vendedor"},
      {id:"V-000153",date:"2026-09-30",time:"08:52",client:"Carlos Gómez",items:[{pid:1,name:"Martillo carpintero 16 oz",qty:1,price:19500},{pid:6,name:"Disco de corte 115 mm",qty:3,price:2800}],total:27900,method:"Transferencia",seller:"Vendedor"},
      {id:"V-000152",date:"2026-09-29",time:"18:26",client:"Constructora San Juan",items:[{pid:5,name:"Llave de paso 1/2",qty:2,price:5900},{pid:9,name:"Caño PVC 40 mm x 4 m",qty:4,price:12900}],total:63400,method:"Transferencia",seller:"Administrador"},
      {id:"V-000151",date:"2026-09-29",time:"16:05",client:"Consumidor final",items:[{pid:7,name:"Silicona transparente 280 ml",qty:2,price:4700}],total:9400,method:"Efectivo",seller:"Vendedor"},
      {id:"V-000150",date:"2026-09-28",time:"12:12",client:"Juan Rojas",items:[{pid:8,name:"Rodillo antigota 22 cm",qty:2,price:7900},{pid:11,name:"Látex interior blanco 20 L",qty:1,price:89900}],total:105700,method:"Tarjeta",seller:"Vendedor"}
    ],
    moves:[
      {date:"2026-09-30",time:"09:18",product:"Cable unipolar 2,5 mm",type:"Salida",qty:-12,reason:"Venta V-000154",user:"Vendedor"},
      {date:"2026-09-30",time:"08:47",product:"Martillo carpintero 16 oz",type:"Entrada",qty:6,reason:"Compra C-00078",user:"Administrador"},
      {date:"2026-09-29",time:"18:26",product:"Llave de paso 1/2",type:"Salida",qty:-2,reason:"Venta V-000152",user:"Vendedor"},
      {date:"2026-09-29",time:"16:12",product:"Tornillo autoperforante 8x1",type:"Ajuste",qty:-15,reason:"Conteo físico",user:"Administrador"},
      {date:"2026-09-28",time:"11:20",product:"Látex interior blanco 20 L",type:"Entrada",qty:4,reason:"Compra C-00077",user:"Administrador"}
    ],
    purchases:[
      {id:"C-00078",date:"2026-09-30",supplier:"Distribuidora Cuyo",products:"Martillos, discos y mechas",total:138500,status:"Pagada",method:"Transferencia"},
      {id:"C-00077",date:"2026-09-28",supplier:"Pinturas del Oeste",products:"Látex, rodillos y pinceles",total:214000,status:"Pendiente",method:"Cuenta corriente"},
      {id:"C-00076",date:"2026-09-26",supplier:"San Juan Eléctrica",products:"Cable, térmicas y cintas",total:176800,status:"Pagada",method:"Transferencia"},
      {id:"C-00075",date:"2026-09-24",supplier:"Plásticos Andinos",products:"Caños PVC y accesorios",total:125300,status:"Pagada",method:"Efectivo"}
    ],
    suppliers:[
      {name:"Distribuidora Cuyo",category:"Herramientas",phone:"264 555-1020",last:"30/09/2026",balance:0,status:"Activo"},
      {name:"Pinturas del Oeste",category:"Pinturería",phone:"264 555-2217",last:"28/09/2026",balance:214000,status:"Activo"},
      {name:"San Juan Eléctrica",category:"Electricidad",phone:"264 555-3098",last:"26/09/2026",balance:0,status:"Activo"},
      {name:"Plásticos Andinos",category:"Plomería",phone:"264 555-4112",last:"24/09/2026",balance:0,status:"Activo"}
    ],
    clients:[
      {name:"Consumidor final",doc:"-",phone:"-",type:"Consumidor final",purchases:23,balance:0},
      {name:"Carlos Gómez",doc:"29.456.321",phone:"264 555-7781",type:"Profesional",purchases:8,balance:0},
      {name:"Constructora San Juan",doc:"30-71234567-8",phone:"264 555-9932",type:"Cuenta corriente",purchases:14,balance:82500},
      {name:"Juan Rojas",doc:"32.775.201",phone:"264 555-4410",type:"Profesional",purchases:5,balance:0},
      {name:"Marta Herrera",doc:"27.223.110",phone:"264 555-8200",type:"Consumidor final",purchases:3,balance:0}
    ],
    accounting:[
      {date:"2026-09-30",time:"09:18",concept:"Venta V-000154",origin:"Venta",type:"Ingreso",amount:18000,method:"Efectivo",user:"Vendedor"},
      {date:"2026-09-30",time:"08:52",concept:"Venta V-000153",origin:"Venta",type:"Ingreso",amount:27900,method:"Transferencia",user:"Vendedor"},
      {date:"2026-09-30",time:"08:47",concept:"Compra C-00078",origin:"Compra",type:"Egreso",amount:138500,method:"Transferencia",user:"Administrador"},
      {date:"2026-09-29",time:"18:26",concept:"Venta V-000152",origin:"Venta",type:"Ingreso",amount:63400,method:"Transferencia",user:"Administrador"},
      {date:"2026-09-29",time:"16:05",concept:"Venta V-000151",origin:"Venta",type:"Ingreso",amount:9400,method:"Efectivo",user:"Vendedor"},
      {date:"2026-09-29",time:"12:00",concept:"Flete de mercadería",origin:"Manual",type:"Egreso",amount:13500,method:"Efectivo",user:"Administrador"},
      {date:"2026-09-28",time:"12:12",concept:"Venta V-000150",origin:"Venta",type:"Ingreso",amount:105700,method:"Tarjeta",user:"Vendedor"},
      {date:"2026-09-28",time:"11:20",concept:"Compra C-00077",origin:"Compra",type:"Egreso",amount:214000,method:"Transferencia",user:"Administrador"}
    ],
    employees:[
      {id:1,name:"Lucas Pérez",dni:"38.111.220",sector:"Mostrador",active:true},
      {id:2,name:"Mariana Díaz",dni:"36.904.552",sector:"Caja",active:true},
      {id:3,name:"Nicolás Sosa",dni:"41.088.337",sector:"Depósito",active:true},
      {id:4,name:"Ariel",dni:"-",sector:"Administración",active:true}
    ],
    attendance:[
      {date:"2026-09-30",time:"08:02",employee:"Lucas Pérez",dni:"38.111.220",sector:"Mostrador",type:"Entrada",method:"Huella"},
      {date:"2026-09-30",time:"08:05",employee:"Mariana Díaz",dni:"36.904.552",sector:"Caja",type:"Entrada",method:"Huella"},
      {date:"2026-09-30",time:"08:09",employee:"Nicolás Sosa",dni:"41.088.337",sector:"Depósito",type:"Entrada",method:"Huella"},
      {date:"2026-09-29",time:"18:03",employee:"Lucas Pérez",dni:"38.111.220",sector:"Mostrador",type:"Salida",method:"Huella"},
      {date:"2026-09-29",time:"18:06",employee:"Mariana Díaz",dni:"36.904.552",sector:"Caja",type:"Salida",method:"Huella"},
      {date:"2026-09-29",time:"18:10",employee:"Nicolás Sosa",dni:"41.088.337",sector:"Depósito",type:"Salida",method:"Huella"},
      {date:"2026-09-29",time:"08:01",employee:"Lucas Pérez",dni:"38.111.220",sector:"Mostrador",type:"Entrada",method:"Huella"},
      {date:"2026-09-29",time:"08:04",employee:"Mariana Díaz",dni:"36.904.552",sector:"Caja",type:"Entrada",method:"Huella"},
      {date:"2026-09-29",time:"08:12",employee:"Nicolás Sosa",dni:"41.088.337",sector:"Depósito",type:"Entrada",method:"Huella"}
    ],
    users:[
      {name:"Ariel",username:"admin",role:"Administrador",status:"Activo",last:"30/09/2026 09:02"},
      {name:"Vendedor Mostrador",username:"vendedor",role:"Vendedor",status:"Activo",last:"30/09/2026 09:15"}
    ],
    monthly:[
      {label:"Mayo",income:2450000,expense:1670000},{label:"Junio",income:2780000,expense:1810000},
      {label:"Julio",income:3010000,expense:2050000},{label:"Agosto",income:3220000,expense:2190000},
      {label:"Sept.",income:3480000,expense:2370000}
    ]
  }
}

let state = loadState();
let currentUser = null;

const accounts = {
  admin:{password:"admin123",name:"Ariel",role:"Administrador"},
  vendedor:{password:"vendedor123",name:"Vendedor Mostrador",role:"Vendedor"}
};

function loadState(){
  try{ const s=localStorage.getItem(STORAGE_KEY); return s?JSON.parse(s):seedState(); }catch(e){ return seedState(); }
}
function save(){ localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); }
function money(n){ return new Intl.NumberFormat("es-AR",{style:"currency",currency:"ARS",maximumFractionDigits:0}).format(Number(n)||0); }
function fmtDate(d){ if(!d)return""; const [y,m,day]=d.split("-"); return `${day}/${m}/${y}`; }
function isoToday(){ return "2026-09-30"; } // Fecha fija para que la demo siempre tenga datos "de hoy".
function nowTime(){ return new Date().toLocaleTimeString("es-AR",{hour:"2-digit",minute:"2-digit"}); }
function notify(msg){ const t=$("#toast"); t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2100); }
function isAdmin(){ return currentUser?.role==="Administrador"; }
function lowStock(p){ return p.stock<=p.min; }
function statusStock(p){ if(p.stock<=0)return'<span class="badge bad">Sin stock</span>'; if(lowStock(p))return'<span class="badge warn">Bajo</span>';return'<span class="badge good">Normal</span>'; }
function typeBadge(type){
  const map={Entrada:"good",Salida:"bad",Ajuste:"warn",Ingreso:"good",Egreso:"bad",Pagada:"good",Pendiente:"warn"};
  return `<span class="badge ${map[type]||"info"}">${type}</span>`;
}
function nextCode(prefix,arr){
  const nums=arr.map(x=>parseInt(String(x.id).replace(/\D/g,""))||0);
  return `${prefix}-${String(Math.max(0,...nums)+1).padStart(5,"0")}`;
}

function login(user,pass){
  const a=accounts[user];
  if(!a || a.password!==pass)return false;
  currentUser={username:user,...a};
  $("#loginView").classList.add("hidden");$("#appView").classList.remove("hidden");
  $("#sidebarUser").textContent=a.name;$("#sidebarRole").textContent=a.role;
  applyRole();renderAll();return true;
}
function logout(){ currentUser=null;$("#appView").classList.add("hidden");$("#loginView").classList.remove("hidden");$("#loginForm").reset(); }
function applyRole(){
  $$(".admin-only").forEach(el=>el.classList.toggle("hidden",!isAdmin()));
  if(!isAdmin() && ["movimientos","compras","proveedores","contabilidad","asistencia","reportes","usuarios"].includes($(".section.active")?.id||""))showSection("dashboard");
}
function showSection(id){
  $$(".section").forEach(s=>s.classList.toggle("active",s.id===id));
  $$(".nav-item").forEach(n=>n.classList.toggle("active",n.dataset.section===id));
  $("#pageTitle").textContent=$(`.nav-item[data-section="${id}"] span`)?.textContent||"Dashboard";
}
function activityRows(){
  let a=[];
  state.sales.slice(0,3).forEach(x=>a.push({sort:x.date+x.time,title:`Venta ${x.id}`,sub:`${x.client} · ${money(x.total)}`,tag:"Venta",cls:"good"}));
  state.purchases.slice(0,2).forEach(x=>a.push({sort:x.date+"00:00",title:`Compra ${x.id}`,sub:`${x.supplier} · ${money(x.total)}`,tag:"Compra",cls:"info"}));
  return a.sort((x,y)=>y.sort.localeCompare(x.sort)).slice(0,5);
}

function renderDashboard(){
  const td=isoToday();
  const todaySales=state.sales.filter(x=>x.date===td);
  $("#kpiSalesToday").textContent=money(todaySales.reduce((s,x)=>s+x.total,0));
  $("#kpiSalesCount").textContent=`${todaySales.length} operaciones`;
  $("#kpiProducts").textContent=state.products.length;
  $("#kpiLowStock").textContent=state.products.filter(lowStock).length;
  const inc=state.accounting.filter(x=>x.type==="Ingreso").reduce((s,x)=>s+x.amount,0);
  const exp=state.accounting.filter(x=>x.type==="Egreso").reduce((s,x)=>s+x.amount,0);
  $("#kpiMonthResult").textContent=money(inc-exp);

  $("#lowStockList").innerHTML=state.products.filter(lowStock).sort((a,b)=>(a.stock-a.min)-(b.stock-b.min)).slice(0,6).map(p=>`
    <div class="list-row"><div><strong>${p.name}</strong><span>${p.stock} ${p.unit} · mínimo ${p.min}</span></div>${statusStock(p)}</div>`).join("")||'<div class="list-row"><span>Sin alertas.</span></div>';

  $("#recentActivity").innerHTML=activityRows().map(a=>`<div class="list-row"><div><strong>${a.title}</strong><span>${a.sub}</span></div><span class="badge ${a.cls}">${a.tag}</span></div>`).join("");

  const max=Math.max(...state.monthly.map(x=>x.income));
  $("#monthlyBars").innerHTML=state.monthly.map(x=>`
    <div class="bar-row"><strong>${x.label}</strong><div><div class="bar-track"><div class="bar-fill" style="width:${Math.round(x.income/max*100)}%"></div></div><span>Ingresos ${money(x.income)} · Egresos ${money(x.expense)}</span></div><strong>${money(x.income-x.expense)}</strong></div>`).join("");
}

function renderSales(){
  const q=$("#saleSearch").value.toLowerCase(), d=$("#saleDate").value, m=$("#saleMethod").value;
  const rows=state.sales.filter(x=>(`${x.id} ${x.client} ${x.seller}`).toLowerCase().includes(q)&&(!d||x.date===d)&&(!m||x.method===m));
  $("#salesTable").innerHTML=rows.map(x=>`<tr><td><b>${x.id}</b></td><td>${fmtDate(x.date)} ${x.time}</td><td>${x.client}</td><td>${x.items.reduce((s,i)=>s+i.qty,0)}</td><td><b>${money(x.total)}</b></td><td>${x.method}</td><td>${x.seller}</td></tr>`).join("");
  const td=isoToday(),today=state.sales.filter(x=>x.date===td),sum=today.reduce((s,x)=>s+x.total,0);
  $("#salesTodayTotal").textContent=money(sum);$("#salesTodayCount").textContent=today.length;$("#avgTicket").textContent=money(today.length?sum/today.length:0);
}

function renderProducts(){
  const q=$("#productSearch").value.toLowerCase(),cat=$("#categoryFilter").value,brand=$("#brandFilter").value,sf=$("#stockFilter").value;
  const cats=[...new Set(state.products.map(x=>x.category))].sort(), brands=[...new Set(state.products.map(x=>x.brand))].sort();
  const curCat=cat,curBrand=brand;
  $("#categoryFilter").innerHTML='<option value="">Todas las categorías</option>'+cats.map(x=>`<option ${x===curCat?"selected":""}>${x}</option>`).join("");
  $("#brandFilter").innerHTML='<option value="">Todas las marcas</option>'+brands.map(x=>`<option ${x===curBrand?"selected":""}>${x}</option>`).join("");

  const rows=state.products.filter(p=>{
    const txt=`${p.code} ${p.name} ${p.brand} ${p.category}`.toLowerCase();
    const stockOK=!sf || (sf==="low"&&lowStock(p)&&p.stock>0)||(sf==="ok"&&!lowStock(p))||(sf==="zero"&&p.stock<=0);
    return txt.includes(q)&&(!cat||p.category===cat)&&(!brand||p.brand===brand)&&stockOK;
  });
  $("#productsTable").innerHTML=rows.map(p=>`<tr>
    <td>${p.code}</td><td><b>${p.name}</b></td><td>${p.brand}</td><td>${p.category}</td><td>${p.unit}</td>
    ${isAdmin()?`<td>${money(p.cost)}</td>`:""}<td>${money(p.price)}</td><td><b>${p.stock}</b></td><td>${p.min}</td><td>${statusStock(p)}</td>
    ${isAdmin()?`<td><button class="table-btn" onclick="editProduct(${p.id})">Editar</button></td>`:""}
  </tr>`).join("");
}

function renderMoves(){
  const q=$("#moveSearch").value.toLowerCase(),t=$("#moveType").value,d=$("#moveDate").value;
  const rows=state.moves.filter(x=>(`${x.product} ${x.reason} ${x.user}`).toLowerCase().includes(q)&&(!t||x.type===t)&&(!d||x.date===d));
  $("#movesTable").innerHTML=rows.map(x=>`<tr><td>${fmtDate(x.date)} ${x.time}</td><td>${x.product}</td><td>${typeBadge(x.type)}</td><td><b>${x.qty>0?"+":""}${x.qty}</b></td><td>${x.reason}</td><td>${x.user}</td></tr>`).join("");
}

function renderPurchases(){
  const q=$("#purchaseSearch").value.toLowerCase(),d=$("#purchaseDate").value,s=$("#purchaseStatus").value;
  const rows=state.purchases.filter(x=>(`${x.id} ${x.supplier} ${x.products}`).toLowerCase().includes(q)&&(!d||x.date===d)&&(!s||x.status===s));
  $("#purchasesTable").innerHTML=rows.map(x=>`<tr><td><b>${x.id}</b></td><td>${fmtDate(x.date)}</td><td>${x.supplier}</td><td>${x.products}</td><td><b>${money(x.total)}</b></td><td>${typeBadge(x.status)}</td><td>${x.method}</td></tr>`).join("");
}

function renderSuppliers(){
  const q=$("#supplierSearch").value.toLowerCase(),f=$("#supplierBalance").value;
  const rows=state.suppliers.filter(x=>(`${x.name} ${x.phone} ${x.category}`).toLowerCase().includes(q)&&(!f||(f==="debt"&&x.balance>0)||(f==="clear"&&x.balance===0)));
  $("#suppliersTable").innerHTML=rows.map(x=>`<tr><td><b>${x.name}</b></td><td>${x.category}</td><td>${x.phone}</td><td>${x.last}</td><td><b>${money(x.balance)}</b></td><td><span class="badge good">${x.status}</span></td></tr>`).join("");
}

function renderClients(){
  const q=$("#clientSearch").value.toLowerCase(),t=$("#clientType").value;
  const rows=state.clients.filter(x=>(`${x.name} ${x.doc} ${x.phone}`).toLowerCase().includes(q)&&(!t||x.type===t));
  $("#clientsTable").innerHTML=rows.map(x=>`<tr><td><b>${x.name}</b></td><td>${x.doc}</td><td>${x.phone}</td><td>${x.type}</td><td>${x.purchases}</td>${isAdmin()?`<td>${money(x.balance)}</td>`:""}</tr>`).join("");
}

function renderAccounting(){
  const q=$("#accountSearch").value.toLowerCase(),t=$("#accountType").value,m=$("#accountMethod").value,d=$("#accountDate").value;
  const rows=state.accounting.filter(x=>(`${x.concept} ${x.user} ${x.origin}`).toLowerCase().includes(q)&&(!t||x.type===t)&&(!m||x.method===m)&&(!d||x.date===d));
  $("#accountingTable").innerHTML=rows.map(x=>`<tr><td>${fmtDate(x.date)} ${x.time}</td><td>${x.concept}</td><td>${x.origin}</td><td>${typeBadge(x.type)}</td><td><b>${money(x.amount)}</b></td><td>${x.method}</td><td>${x.user}</td></tr>`).join("");
  const inc=state.accounting.filter(x=>x.type==="Ingreso").reduce((s,x)=>s+x.amount,0), exp=state.accounting.filter(x=>x.type==="Egreso").reduce((s,x)=>s+x.amount,0);
  const cash=state.accounting.filter(x=>x.method==="Efectivo").reduce((s,x)=>s+(x.type==="Ingreso"?x.amount:-x.amount),0);
  $("#accountIncome").textContent=money(inc);$("#accountExpense").textContent=money(exp);$("#accountBalance").textContent=money(inc-exp);$("#cashEstimate").textContent=money(cash);
}

function renderAttendance(){
  const q=$("#attendanceSearch").value.toLowerCase(),e=$("#attendanceEmployee").value,t=$("#attendanceType").value,d=$("#attendanceDate").value;
  const names=[...new Set(state.attendance.map(x=>x.employee))].sort(),cur=e;
  $("#attendanceEmployee").innerHTML='<option value="">Todos los empleados</option>'+names.map(x=>`<option ${x===cur?"selected":""}>${x}</option>`).join("");
  const rows=state.attendance.filter(x=>(`${x.employee} ${x.dni} ${x.sector}`).toLowerCase().includes(q)&&(!e||x.employee===e)&&(!t||x.type===t)&&(!d||x.date===d));
  $("#attendanceTable").innerHTML=rows.map(x=>`<tr><td>${fmtDate(x.date)}</td><td>${x.time}</td><td><b>${x.employee}</b></td><td>${x.dni}</td><td>${x.sector}</td><td>${typeBadge(x.type)}</td><td>${x.method}</td></tr>`).join("");
  const td=isoToday(),today=state.attendance.filter(x=>x.date===td), entries=today.filter(x=>x.type==="Entrada"),exits=today.filter(x=>x.type==="Salida");
  $("#attendancePresent").textContent=new Set(entries.map(x=>x.employee).filter(n=>!exits.some(y=>y.employee===n))).size;
  $("#attendanceEntries").textContent=entries.length;$("#attendanceExits").textContent=exits.length;$("#attendanceEmployees").textContent=state.employees.filter(x=>x.active).length;
}

function renderReports(){
  const totals={};
  state.sales.forEach(s=>s.items.forEach(i=>totals[i.name]=(totals[i.name]||0)+i.qty));
  $("#topProductsReport").innerHTML=Object.entries(totals).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([n,q])=>`<div class="report-item"><span>${n}</span><b>${q} u.</b></div>`).join("");
  const pay={}; state.sales.forEach(s=>pay[s.method]=(pay[s.method]||0)+s.total);
  $("#paymentReport").innerHTML=Object.entries(pay).sort((a,b)=>b[1]-a[1]).map(([m,v])=>`<div class="report-item"><span>${m}</span><b>${money(v)}</b></div>`).join("");
  const inv=state.products.reduce((s,p)=>s+p.cost*p.stock,0),debt=state.suppliers.reduce((s,x)=>s+x.balance,0);
  $("#inventoryReport").innerHTML=`${money(inv)}<small>Valor estimado al costo actual.</small>`;
  $("#supplierDebtReport").innerHTML=`${money(debt)}<small>Saldo pendiente informado por proveedores.</small>`;
}

function renderUsers(){ $("#usersTable").innerHTML=state.users.map(x=>`<tr><td><b>${x.name}</b></td><td>${x.username}</td><td>${x.role}</td><td><span class="badge good">${x.status}</span></td><td>${x.last}</td></tr>`).join(""); }

function renderKioskEmployees(){
  $("#kioskEmployees").innerHTML=state.employees.filter(e=>e.active).map(e=>`<button onclick="markAttendance(${e.id})"><b>${e.name}</b><small>${e.sector}</small></button>`).join("");
}
function renderAll(){ renderDashboard();renderSales();renderProducts();renderMoves();renderPurchases();renderSuppliers();renderClients();renderAccounting();renderAttendance();renderReports();renderUsers();renderKioskEmployees();applyRole(); }

function openModal(title,html,onSubmit){
  $("#modalTitle").textContent=title;$("#modalForm").innerHTML=html+'<button class="btn primary full" type="submit">Guardar</button>';
  $("#modal").classList.remove("hidden");
  $("#modalForm").onsubmit=e=>{e.preventDefault();onSubmit(new FormData($("#modalForm")));save();$("#modal").classList.add("hidden");renderAll();notify("Cambios guardados en la demo");}
}
function closeModal(){ $("#modal").classList.add("hidden"); }

function productFields(p={}){
 return `<div class="form-grid">
  <div><label>Código</label><input name="code" required value="${p.code||""}"></div>
  <div><label>Producto</label><input name="name" required value="${p.name||""}"></div>
  <div><label>Marca</label><input name="brand" required value="${p.brand||""}"></div>
  <div><label>Categoría</label><input name="category" required value="${p.category||""}"></div>
  <div><label>Unidad</label><select name="unit">${["unidad","metro","kilo","caja","rollo","bolsa","balde"].map(x=>`<option ${p.unit===x?"selected":""}>${x}</option>`).join("")}</select></div>
  <div><label>Costo</label><input name="cost" type="number" min="0" required value="${p.cost||0}"></div>
  <div><label>Precio venta</label><input name="price" type="number" min="0" required value="${p.price||0}"></div>
  <div><label>Stock actual</label><input name="stock" type="number" step=".01" required value="${p.stock??0}"></div>
  <div><label>Stock mínimo</label><input name="min" type="number" step=".01" required value="${p.min??0}"></div>
 </div>`;
}
function addProduct(){ openModal("Nuevo producto",productFields(),fd=>state.products.unshift({id:Date.now(),code:fd.get("code"),name:fd.get("name"),brand:fd.get("brand"),category:fd.get("category"),unit:fd.get("unit"),cost:+fd.get("cost"),price:+fd.get("price"),stock:+fd.get("stock"),min:+fd.get("min")}));}
window.editProduct=id=>{const p=state.products.find(x=>x.id===id);openModal("Editar producto",productFields(p),fd=>Object.assign(p,{code:fd.get("code"),name:fd.get("name"),brand:fd.get("brand"),category:fd.get("category"),unit:fd.get("unit"),cost:+fd.get("cost"),price:+fd.get("price"),stock:+fd.get("stock"),min:+fd.get("min")}));}

function addSale(){
  const opts=state.products.filter(p=>p.stock>0).map(p=>`<option value="${p.id}">${p.name} · ${money(p.price)} · stock ${p.stock}</option>`).join("");
  const clients=state.clients.map(c=>`<option>${c.name}</option>`).join("");
  openModal("Nueva venta",`<div class="form-grid">
    <div class="span-2"><label>Cliente</label><select name="client">${clients}</select></div>
    <div class="span-2"><label>Producto</label><select name="product">${opts}</select></div>
    <div><label>Cantidad</label><input name="qty" type="number" min="1" value="1" required></div>
    <div><label>Medio de pago</label><select name="method"><option>Efectivo</option><option>Transferencia</option><option>Tarjeta</option></select></div>
    <div class="span-2"><label>Descuento ($)</label><input name="discount" type="number" min="0" value="0"></div>
  </div>`,fd=>{
    const p=state.products.find(x=>x.id==fd.get("product")),qty=+fd.get("qty"),disc=+fd.get("discount");
    if(qty>p.stock){notify("No hay stock suficiente");return;}
    const total=Math.max(0,p.price*qty-disc),id=nextCode("V",state.sales);
    state.sales.unshift({id,date:isoToday(),time:nowTime(),client:fd.get("client"),items:[{pid:p.id,name:p.name,qty,price:p.price}],total,method:fd.get("method"),seller:currentUser.role});
    p.stock-=qty;
    state.moves.unshift({date:isoToday(),time:nowTime(),product:p.name,type:"Salida",qty:-qty,reason:`Venta ${id}`,user:currentUser.role});
    state.accounting.unshift({date:isoToday(),time:nowTime(),concept:`Venta ${id}`,origin:"Venta",type:"Ingreso",amount:total,method:fd.get("method"),user:currentUser.name});
    const c=state.clients.find(x=>x.name===fd.get("client")); if(c)c.purchases++;
  });
}
function addMove(){
  const opts=state.products.map(p=>`<option value="${p.id}">${p.name}</option>`).join("");
  openModal("Movimiento de stock",`<div class="form-grid">
    <div class="span-2"><label>Producto</label><select name="product">${opts}</select></div>
    <div><label>Tipo</label><select name="type"><option>Entrada</option><option>Salida</option><option>Ajuste</option></select></div>
    <div><label>Cantidad</label><input name="qty" type="number" min=".01" step=".01" required></div>
    <div class="span-2"><label>Motivo</label><input name="reason" required placeholder="Reposición, rotura, conteo físico..."></div>
  </div>`,fd=>{
    const p=state.products.find(x=>x.id==fd.get("product")),type=fd.get("type"),raw=+fd.get("qty"),delta=type==="Entrada"?raw:type==="Salida"?-raw:raw;
    p.stock+=delta;state.moves.unshift({date:isoToday(),time:nowTime(),product:p.name,type,qty:delta,reason:fd.get("reason"),user:currentUser.name});
  });
}
function addPurchase(){
  const suppliers=state.suppliers.map(s=>`<option>${s.name}</option>`).join("");
  openModal("Registrar compra",`<div class="form-grid">
    <div><label>Proveedor</label><select name="supplier">${suppliers}</select></div>
    <div><label>Estado</label><select name="status"><option>Pagada</option><option>Pendiente</option></select></div>
    <div class="span-2"><label>Descripción / productos</label><input name="products" required placeholder="Ej.: herramientas, tornillos, cable..."></div>
    <div><label>Total</label><input name="total" type="number" min="1" required></div>
    <div><label>Medio</label><select name="method"><option>Transferencia</option><option>Efectivo</option><option>Cuenta corriente</option></select></div>
  </div>`,fd=>{
    const id=nextCode("C",state.purchases),total=+fd.get("total"),status=fd.get("status");
    state.purchases.unshift({id,date:isoToday(),supplier:fd.get("supplier"),products:fd.get("products"),total,status,method:fd.get("method")});
    if(status==="Pagada")state.accounting.unshift({date:isoToday(),time:nowTime(),concept:`Compra ${id}`,origin:"Compra",type:"Egreso",amount:total,method:fd.get("method")==="Cuenta corriente"?"Transferencia":fd.get("method"),user:currentUser.name});
    if(status==="Pendiente"){const s=state.suppliers.find(x=>x.name===fd.get("supplier"));if(s)s.balance+=total;}
  });
}
function addSupplier(){ openModal("Nuevo proveedor",`<div class="form-grid"><div><label>Nombre</label><input name="name" required></div><div><label>Rubro</label><input name="category" required></div><div><label>Teléfono</label><input name="phone" required></div><div><label>Saldo inicial</label><input name="balance" type="number" min="0" value="0"></div></div>`,fd=>state.suppliers.push({name:fd.get("name"),category:fd.get("category"),phone:fd.get("phone"),last:"Sin compras",balance:+fd.get("balance"),status:"Activo"}));}
function addClient(){ openModal("Nuevo cliente",`<div class="form-grid"><div><label>Nombre</label><input name="name" required></div><div><label>DNI / CUIT</label><input name="doc"></div><div><label>Teléfono</label><input name="phone"></div><div><label>Tipo</label><select name="type"><option>Consumidor final</option><option>Profesional</option><option>Cuenta corriente</option></select></div></div>`,fd=>state.clients.push({name:fd.get("name"),doc:fd.get("doc")||"-",phone:fd.get("phone")||"-",type:fd.get("type"),purchases:0,balance:0}));}
function addAccounting(){ openModal("Movimiento contable manual",`<div class="form-grid"><div class="span-2"><label>Concepto</label><input name="concept" required></div><div><label>Tipo</label><select name="type"><option>Ingreso</option><option>Egreso</option></select></div><div><label>Monto</label><input name="amount" type="number" min="1" required></div><div class="span-2"><label>Medio</label><select name="method"><option>Efectivo</option><option>Transferencia</option><option>Tarjeta</option><option>Mixto</option></select></div></div>`,fd=>state.accounting.unshift({date:isoToday(),time:nowTime(),concept:fd.get("concept"),origin:"Manual",type:fd.get("type"),amount:+fd.get("amount"),method:fd.get("method"),user:currentUser.name}));}
function addUser(){ openModal("Nuevo usuario",`<div class="form-grid"><div><label>Nombre</label><input name="name" required></div><div><label>Usuario</label><input name="username" required></div><div><label>Rol</label><select name="role"><option>Vendedor</option><option>Administrador</option></select></div><div><label>Estado</label><select name="status"><option>Activo</option><option>Inactivo</option></select></div></div>`,fd=>state.users.push({name:fd.get("name"),username:fd.get("username"),role:fd.get("role"),status:fd.get("status"),last:"Sin acceso"}));}

window.markAttendance=id=>{
  const e=state.employees.find(x=>x.id===id), today=state.attendance.filter(x=>x.date===isoToday()&&x.employee===e.name);
  const last=today[0],type=!last||last.type==="Salida"?"Entrada":"Salida";
  state.attendance.unshift({date:isoToday(),time:nowTime(),employee:e.name,dni:e.dni,sector:e.sector,type,method:"Huella (simulada)"});
  save();renderAttendance();
  const r=$("#kioskResult");r.className="kiosk-result good";r.innerHTML=`${e.name} · ${type} registrada · ${nowTime()}`;
  setTimeout(()=>{r.className="kiosk-result";r.textContent="Esperando lectura...";},3500);
}
function openKiosk(){ $("#attendanceKiosk").classList.remove("hidden");renderKioskEmployees();updateClock(); }
function updateClock(){ const d=new Date();$("#kioskTime").textContent=d.toLocaleTimeString("es-AR",{hour:"2-digit",minute:"2-digit"});$("#kioskDate").textContent=d.toLocaleDateString("es-AR",{weekday:"long",day:"numeric",month:"long",year:"numeric"}); }

$("#loginForm").addEventListener("submit",e=>{e.preventDefault();const ok=login($("#username").value.trim(),$("#password").value);$("#loginError").textContent=ok?"":"Usuario o contraseña incorrectos.";});
$$(".demo-user").forEach(b=>b.addEventListener("click",()=>{$("#username").value=b.dataset.user;$("#password").value=b.dataset.pass;}));
$("#logoutBtn").addEventListener("click",logout);
$$(".nav-item").forEach(b=>b.addEventListener("click",()=>showSection(b.dataset.section)));
$$("[data-go]").forEach(b=>b.addEventListener("click",()=>showSection(b.dataset.go)));
$("#closeModal").addEventListener("click",closeModal);$("#modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal();});

["saleSearch","saleDate","saleMethod"].forEach(id=>$("#"+id).addEventListener(id.includes("Search")?"input":"change",renderSales));
["productSearch","categoryFilter","brandFilter","stockFilter"].forEach(id=>$("#"+id).addEventListener(id==="productSearch"?"input":"change",renderProducts));
["moveSearch","moveType","moveDate"].forEach(id=>$("#"+id).addEventListener(id==="moveSearch"?"input":"change",renderMoves));
["purchaseSearch","purchaseDate","purchaseStatus"].forEach(id=>$("#"+id).addEventListener(id==="purchaseSearch"?"input":"change",renderPurchases));
["supplierSearch","supplierBalance"].forEach(id=>$("#"+id).addEventListener(id==="supplierSearch"?"input":"change",renderSuppliers));
["clientSearch","clientType"].forEach(id=>$("#"+id).addEventListener(id==="clientSearch"?"input":"change",renderClients));
["accountSearch","accountType","accountMethod","accountDate"].forEach(id=>$("#"+id).addEventListener(id==="accountSearch"?"input":"change",renderAccounting));
["attendanceSearch","attendanceEmployee","attendanceType","attendanceDate"].forEach(id=>$("#"+id).addEventListener(id==="attendanceSearch"?"input":"change",renderAttendance));

$("#newSaleBtn").addEventListener("click",addSale);$("#newProductBtn").addEventListener("click",addProduct);$("#newStockMoveBtn").addEventListener("click",addMove);
$("#newPurchaseBtn").addEventListener("click",addPurchase);$("#newSupplierBtn").addEventListener("click",addSupplier);$("#newClientBtn").addEventListener("click",addClient);
$("#newAccountingBtn").addEventListener("click",addAccounting);$("#newUserBtn").addEventListener("click",addUser);
$("#openAttendanceKiosk").addEventListener("click",openKiosk);$("#openKioskFromAdmin").addEventListener("click",openKiosk);$("#closeKiosk").addEventListener("click",()=>$("#attendanceKiosk").classList.add("hidden"));
$("#resetDemo").addEventListener("click",()=>{if(confirm("¿Restablecer todos los datos mock de la maqueta?")){state=seedState();save();renderAll();notify("Datos de demostración restablecidos");}});
setInterval(()=>{if(!$("#attendanceKiosk").classList.contains("hidden"))updateClock();},1000);
