// LLUVIA: mm promedio por mes (Enero a Diciembre) para el Valle de Cochabamba.
// Son valores aproximados: cámbialos por datos reales.
const LLUVIA = [130, 110, 70, 25, 5, 2, 3, 8, 20, 40, 65, 110];

// SECTORES: "factor" multiplica la lluvia base (1.1 = 10% más lluvia).
// Ajusta los nombres y factores a tus zonas reales.
const SECTORES = [
  { nombre: "Cercado",     factor: 1.0 },
  { nombre: "Sacaba",      factor: 1.1 },
  { nombre: "Quillacollo", factor: 0.95 },
  { nombre: "Tiquipaya",   factor: 1.15 },
  { nombre: "Cliza",       factor: 0.85 }
];

// CULTIVOS: siembra = números de mes (1 = enero ... 12 = diciembre)
const CULTIVOS = [
  { nombre: "Maíz",   siembra: [9, 10, 11], minLluvia: 40 },
  { nombre: "Papa",   siembra: [8, 9, 10],  minLluvia: 30 },
  { nombre: "Trigo",  siembra: [11, 12],    minLluvia: 50 },
  { nombre: "Arveja", siembra: [3, 4],      minLluvia: 30 },
  { nombre: "Haba",   siembra: [7, 8],      minLluvia: 20 }
];
