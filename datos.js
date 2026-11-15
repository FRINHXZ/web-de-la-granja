
// ============================================================
// DATOS POR SECTOR. Todos los valores son ORIENTATIVOS.
// Ajústalos con datos de SENAMHI, INIAF, SEDECA o técnicos de tu zona.
//   lluvia   = mm promedio por mes, de Enero a Diciembre (12 valores)
//   siembra  = meses de siembra (1 = enero ... 12 = diciembre)
//   minLluvia= mm por mes que el cultivo necesita para no depender de riego
// ============================================================
const SECTORES = [
  {
    nombre: "Valle Central",
    info: "Cercado, Sacaba, Tiquipaya · clima templado de valle",
    lluvia: [130, 110, 70, 25, 5, 2, 3, 8, 20, 40, 65, 110],
    cultivos: [
      { nombre: "Maíz",        siembra: [9, 10, 11],   minLluvia: 40 },
      { nombre: "Papa",        siembra: [8, 9, 10, 11], minLluvia: 30 },
      { nombre: "Haba",        siembra: [8, 9],        minLluvia: 20 },
      { nombre: "Arveja",      siembra: [3, 4, 9],     minLluvia: 30 },
      { nombre: "Trigo",       siembra: [5, 6, 11, 12], minLluvia: 50 },
      { nombre: "Hortalizas",  siembra: [2, 3, 8, 9],  minLluvia: 30 },
      { nombre: "Alfalfa",     siembra: [3, 4, 9, 10], minLluvia: 25 }
    ]
  },
  {
    nombre: "Valle Bajo",
    info: "Quillacollo, Sipe Sipe, Vinto · valle más seco y cálido",
    lluvia: [120, 105, 65, 22, 4, 2, 3, 7, 18, 35, 60, 100],
    cultivos: [
      { nombre: "Maíz",        siembra: [9, 10, 11],   minLluvia: 40 },
      { nombre: "Papa",        siembra: [8, 9, 10],    minLluvia: 30 },
      { nombre: "Hortalizas",  siembra: [2, 3, 8, 9],  minLluvia: 30 },
      { nombre: "Alfalfa",     siembra: [3, 4, 9, 10], minLluvia: 25 },
      { nombre: "Arveja",      siembra: [3, 4, 9],     minLluvia: 30 },
      { nombre: "Trigo",       siembra: [5, 6, 11, 12], minLluvia: 50 }
    ]
  },
  {
    nombre: "Valle Alto",
    info: "Cliza, Punata, Tarata, Arani · valle agrícola",
    lluvia: [100, 85, 55, 15, 3, 1, 2, 5, 15, 30, 50, 85],
    cultivos: [
      { nombre: "Maíz",        siembra: [9, 10, 11],   minLluvia: 35 },
      { nombre: "Papa",        siembra: [8, 9, 10],    minLluvia: 30 },
      { nombre: "Trigo",       siembra: [5, 6, 11, 12], minLluvia: 45 },
      { nombre: "Haba",        siembra: [8, 9],        minLluvia: 20 },
      { nombre: "Cebolla",     siembra: [7, 8, 9],     minLluvia: 20 },
      { nombre: "Hortalizas",  siembra: [2, 3, 8, 9],  minLluvia: 30 }
    ]
  },
  {
    nombre: "Valles secos",
    info: "Mizque, Aiquile · poca lluvia, casi todo con riego",
    lluvia: [100, 90, 60, 15, 2, 0, 1, 3, 12, 30, 50, 90],
    cultivos: [
      { nombre: "Maíz",        siembra: [10, 11, 12],  minLluvia: 40 },
      { nombre: "Maní",        siembra: [10, 11],      minLluvia: 40 },
      { nombre: "Ají",         siembra: [8, 9, 10],    minLluvia: 30 },
      { nombre: "Cebolla",     siembra: [7, 8, 9],     minLluvia: 20 },
      { nombre: "Trigo",       siembra: [5, 6, 11],    minLluvia: 40 }
    ]
  },
  {
    nombre: "Cordillera",
    info: "Tapacarí, Morochata, Ayopaya, Colomi · zona alta y fría",
    lluvia: [150, 130, 90, 40, 10, 5, 5, 15, 35, 60, 80, 130],
    cultivos: [
      { nombre: "Papa",        siembra: [9, 10, 11],   minLluvia: 40 },
      { nombre: "Oca y papalisa", siembra: [10, 11],   minLluvia: 40 },
      { nombre: "Haba",        siembra: [9, 10],       minLluvia: 30 },
      { nombre: "Cebada",      siembra: [10, 11],      minLluvia: 40 },
      { nombre: "Arveja",      siembra: [9, 10],       minLluvia: 30 },
      { nombre: "Avena forrajera", siembra: [11, 12],  minLluvia: 40 }
    ]
  },
  {
    nombre: "Chapare",
    info: "Villa Tunari, Shinahota, Chimoré · trópico muy húmedo",
    lluvia: [600, 550, 500, 350, 250, 180, 150, 170, 220, 300, 400, 520],
    cultivos: [
      { nombre: "Plátano y banano", siembra: [10, 11, 12],    minLluvia: 250 },
      { nombre: "Piña",             siembra: [10, 11, 12, 1], minLluvia: 200 },
      { nombre: "Yuca",             siembra: [10, 11, 12],    minLluvia: 200 },
      { nombre: "Arroz",            siembra: [11, 12],        minLluvia: 300 },
      { nombre: "Maracuyá",         siembra: [8, 9, 10],      minLluvia: 150 },
      { nombre: "Cítricos",         siembra: [11, 12, 1],     minLluvia: 250 },
      { nombre: "Palmito",          siembra: [11, 12, 1],     minLluvia: 250 },
      { nombre: "Jengibre",         siembra: [9, 10, 11],     minLluvia: 150 },
      { nombre: "Papaya",           siembra: [9, 10, 11],     minLluvia: 200 }
    ]
  },
  {
    nombre: "Carrasco",
    info: "Puerto Villarroel, Entre Ríos · trópico, algo menos lluvioso",
    lluvia: [450, 420, 380, 250, 170, 120, 100, 110, 160, 230, 300, 400],
    cultivos: [
      { nombre: "Plátano y banano", siembra: [10, 11, 12], minLluvia: 200 },
      { nombre: "Yuca",             siembra: [10, 11, 12], minLluvia: 150 },
      { nombre: "Arroz",            siembra: [11, 12],     minLluvia: 250 },
      { nombre: "Maíz",             siembra: [4, 5, 10],   minLluvia: 120 },
      { nombre: "Papaya",           siembra: [9, 10, 11],  minLluvia: 150 },
      { nombre: "Cítricos",         siembra: [11, 12, 1],  minLluvia: 200 },
      { nombre: "Piña",             siembra: [10, 11, 12], minLluvia: 150 }
    ]
  }
];