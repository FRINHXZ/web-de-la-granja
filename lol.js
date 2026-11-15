// Datos (LLUVIA, SECTORES, CULTIVOS) vienen de datos.js
const MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const USUARIO = "agricultor", CLAVE = "1234"; // cámbialos aquí
const $ = (id) => document.getElementById(id);
const siguiente = (i) => (i + 1) % 12;
const limpiar = (t) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

let mes = new Date().getMonth(), sector = 0, filtro = "todos";
const lluviaSector = (s) => SECTORES[s].lluvia;

/* ---------- LOGIN (panel lateral) ---------- */
function panel(abrir) {
  $("login").classList.toggle("abierto", abrir);
  $("fondo").classList.toggle("oculto", !abrir);
  if (abrir) $("usuario").focus();
}
function sesion() {
  const u = sessionStorage.getItem("usuario");
  $("saludo").textContent = u ? "Hola, " + u : "";
  $("abrirLogin").textContent = u ? "Salir" : "Ingresar";
}
$("abrirLogin").addEventListener("click", () => {
  if (sessionStorage.getItem("usuario")) { sessionStorage.removeItem("usuario"); sesion(); }
  else panel(true);
});
$("cerrarLogin").addEventListener("click", () => panel(false));
$("fondo").addEventListener("click", () => panel(false));
$("formLogin").addEventListener("submit", (e) => {
  e.preventDefault();
  if ($("usuario").value.trim() === USUARIO && $("clave").value === CLAVE) {
    sessionStorage.setItem("usuario", USUARIO);
    $("error").textContent = ""; $("clave").value = "";
    sesion(); panel(false);
  } else {
    $("error").textContent = "Usuario o contraseña incorrectos.";
  }
});

/* ---------- BOTONES ---------- */
function crearBotones(cont, lista, getTexto, alElegir) {
  lista.forEach((x, i) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "btn"; b.textContent = getTexto(x);
    b.addEventListener("click", () => alElegir(i));
    cont.appendChild(b);
  });
}
crearBotones($("meses"), MESES, (m) => m.slice(0, 3), (i) => { mes = i; actualizar(); });
crearBotones($("sectores"), SECTORES, (s) => s.nombre, (i) => { sector = i; actualizar(); });
document.querySelectorAll(".filtros .btn").forEach((b) =>
  b.addEventListener("click", () => { filtro = b.dataset.f; actualizar(); })
);
$("buscar").addEventListener("input", () => mostrarCultivos(lluviaSector(sector)));

/* ---------- ALERTA ---------- */
function mostrarAlerta(L) {
  const ahora = L[mes];
  const prox = (L[siguiente(mes)] + L[(mes + 2) % 12]) / 2;
  let clase = "igual", titulo = "Lluvias parecidas";
  let texto = "Se esperan unos " + Math.round(ahora) + " mm este mes y algo similar en los próximos.";
  if (prox >= ahora * 1.4 && prox >= 30) {
    clase = "lluvia"; titulo = "Se acercan las lluvias";
    texto = "Este mes llueve ~" + Math.round(ahora) + " mm y los próximos ~" + Math.round(prox) + " mm por mes. Prepare la tierra.";
  } else if (prox <= ahora * 0.6) {
    clase = "seca"; titulo = "Se acerca la época seca";
    texto = "Este mes llueve ~" + Math.round(ahora) + " mm y los próximos bajan a ~" + Math.round(prox) + " mm. Piense en riego.";
  }
  $("alerta").className = "alert " + clase;
  // Cambia el fondo según el clima que se acerca: clima-lluvia, clima-seca o clima-igual
  document.body.className = "clima-" + clase;
  $("alerta").innerHTML = "<b>" + titulo + "</b>" + texto;
}

/* ---------- GRÁFICO DE BARRAS (sector elegido) ---------- */
function dibujarGrafico(L) {
  const base = 135, tope = 10, ancho = 22, espacio = 7.5, maximo = Math.max(...L);
  let svg = "";
  L.forEach((v, k) => {
    const alto = Math.max(2, (v / maximo) * (base - tope));
    const x = 6 + k * (ancho + espacio), y = base - alto;
    let relleno = "#d6e0d4", borde = "";
    if (k === mes) relleno = "#2f6fa3";
    else if (k === siguiente(mes) || k === (mes + 2) % 12) { relleno = "#bcd6ea"; borde = ' stroke="#2f6fa3" stroke-width="2"'; }
    svg += '<rect x="' + x + '" y="' + y + '" width="' + ancho + '" height="' + alto + '" rx="4" fill="' + relleno + '"' + borde + "/>";
    svg += '<text x="' + (x + ancho / 2) + '" y="' + (y - 4) + '" text-anchor="middle" font-size="10" fill="#5a6b61">' + v + "</text>";
    svg += '<text x="' + (x + ancho / 2) + '" y="' + (base + 16) + '" text-anchor="middle" font-size="11" fill="#1c2a22" font-weight="' + (k === mes ? 700 : 400) + '">' + MESES[k].slice(0, 3) + "</text>";
  });
  $("grafico").innerHTML = svg;
  $("tituloGrafico").textContent = "Lluvia por mes en " + SECTORES[sector].nombre + " (mm)";
}

/* ---------- COMPARAR SECTORES EN EL MES ELEGIDO ---------- */
function dibujarComparacion() {
  const vals = SECTORES.map((_, s) => lluviaSector(s)[mes]);
  const max = Math.max(...vals, 1);
  $("tituloComp").textContent = "Lluvia en " + MESES[mes] + " por sector (mm, escala ajustada)";
  $("comparar").innerHTML = SECTORES.map((s, i) =>
    '<div class="fila' + (i === sector ? " sel" : "") + '"><span class="nom">' + s.nombre +
    '</span><div class="pista"><div class="barra-v" style="width:' + Math.sqrt(vals[i] / max) * 100 + '%"></div></div>' +
    '<span class="mm">' + vals[i] + "</span></div>"
  ).join("");
}

/* ---------- CULTIVOS (con buscador y filtro) ---------- */
function mostrarCultivos(L) {
  $("cultivos").parentElement.querySelector("h2").textContent = "Cultivos en " + SECTORES[sector].nombre;
  $("cultivos").parentElement.querySelector("h2").title = SECTORES[sector].info;
  const m = mes + 1, lluvia = (L[mes] + L[siguiente(mes)]) / 2;
  const q = limpiar($("buscar").value.trim());
  const lista = SECTORES[sector].cultivos.map((c) => {
    let orden, etiqueta, clase, texto;
    if (c.siembra.includes(m)) {
      if (lluvia >= c.minLluvia) { orden = 0; etiqueta = "Sembrar ahora"; clase = "t-ok"; texto = "Mes de siembra y hay lluvia suficiente."; }
      else { orden = 1; etiqueta = "Sembrar con riego"; clase = "t-aviso"; texto = "Mes de siembra, pero llueve poco (necesita ~" + c.minLluvia + " mm)."; }
    } else if (c.siembra.includes((m % 12) + 1)) {
      orden = 2; etiqueta = "Preparar suelo"; clase = "t-prox"; texto = "Su siembra empieza el próximo mes.";
    } else { orden = 3; etiqueta = "Esperar"; clase = "t-espera"; texto = "Fuera de su época de siembra."; }
    return { c, orden, etiqueta, clase, texto };
  })
    .filter((x) => limpiar(x.c.nombre).includes(q))
    .filter((x) => filtro === "todos" || x.orden <= 1)
    .sort((a, b) => a.orden - b.orden);

  $("cultivos").innerHTML = lista.length
    ? lista.map((x) =>
        '<div class="crop"><div><div class="n">' + x.c.nombre + '</div><div class="d">' + x.texto +
        '</div></div><span class="tag ' + x.clase + '">' + x.etiqueta + "</span></div>").join("")
    : '<p class="vacio">No hay cultivos con ese filtro. Prueba otro nombre o pulsa "Todos".</p>';
}

/* ---------- ACTUALIZAR TODO ---------- */
function actualizar() {
  const L = lluviaSector(sector);
  document.querySelectorAll("#meses .btn").forEach((b, i) => b.classList.toggle("activo", i === mes));
  document.querySelectorAll("#sectores .btn").forEach((b, i) => b.classList.toggle("activo", i === sector));
  document.querySelectorAll(".filtros .btn").forEach((b) => b.classList.toggle("activo", b.dataset.f === filtro));
  mostrarAlerta(L); dibujarGrafico(L); dibujarComparacion(); mostrarCultivos(L);
}

sesion();
actualizar();
