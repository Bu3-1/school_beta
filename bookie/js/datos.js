/* =========================================================
   DATOS DE EJEMPLO
   Esto simula lo que normalmente vendría de una base de datos.
   Cuando conectes un backend real, reemplaza este archivo por
   peticiones a tu API (fetch) y borra este arreglo.
   ========================================================= */

const ALUMNOS = [
  {
    id: 1,
    nombre: "Camila Torres",
    grupo: "1ro A",
    iniciales: "CT",
    color: "#3C3489",
    nivel: "Silábico",
    progreso: 82,
    estado: "al día",
    reportes: {
      "Lectura":            [ {intento: 1, puntos: 80}, {intento: 2, puntos: 90} ],
      "Escritura":          [ {intento: 1, puntos: 65}, {intento: 2, puntos: 70} ],
      "Comprensión lectora":[ {intento: 1, puntos: 88}, {intento: 2, puntos: 85} ]
    }
  },
  {
    id: 2,
    nombre: "Mateo Gómez",
    grupo: "2do B",
    iniciales: "MG",
    color: "#8C93A1",
    nivel: "Presilábico",
    progreso: 45,
    estado: "en progreso",
    reportes: {
      "Lectura":            [ {intento: 1, puntos: 40}, {intento: 2, puntos: 50} ],
      "Escritura":          [ {intento: 1, puntos: 35}, {intento: 2, puntos: 42} ],
      "Comprensión lectora":[ {intento: 1, puntos: 38}, {intento: 2, puntos: 45} ]
    }
  },
  {
    id: 3,
    nombre: "Valentina Ruiz",
    grupo: "1ro A",
    iniciales: "VR",
    color: "#0F6E56",
    nivel: "Silábico alfabético",
    progreso: 90,
    estado: "al día",
    reportes: {
      "Lectura":            [ {intento: 1, puntos: 85}, {intento: 2, puntos: 92} ],
      "Escritura":          [ {intento: 1, puntos: 80}, {intento: 2, puntos: 87} ],
      "Comprensión lectora":[ {intento: 1, puntos: 84}, {intento: 2, puntos: 90} ]
    }
  },
  {
    id: 4,
    nombre: "Diego Fernández",
    grupo: "3ro A",
    iniciales: "DF",
    color: "#993C1D",
    nivel: "Alfabético",
    progreso: 30,
    estado: "requiere apoyo",
    reportes: {
      "Lectura":            [ {intento: 1, puntos: 32}, {intento: 2, puntos: 35} ],
      "Escritura":          [ {intento: 1, puntos: 25}, {intento: 2, puntos: 28} ],
      "Comprensión lectora":[ {intento: 1, puntos: 29}, {intento: 2, puntos: 31} ]
    }
  },
  {
    id: 5,
    nombre: "Sofía Herrera",
    grupo: "2do B",
    iniciales: "SH",
    color: "#3C3489",
    nivel: "Silábico",
    progreso: 78,
    estado: "al día",
    reportes: {
      "Lectura":            [ {intento: 1, puntos: 72}, {intento: 2, puntos: 79} ],
      "Escritura":          [ {intento: 1, puntos: 70}, {intento: 2, puntos: 75} ],
      "Comprensión lectora":[ {intento: 1, puntos: 74}, {intento: 2, puntos: 78} ]
    }
  }
];

// Estilo visual (fondo/texto) para cada badge de estado.
const ESTILO_ESTADO = {
  "al día":          { clase: "badge-bien" },
  "en progreso":     { clase: "badge-progreso" },
  "requiere apoyo":  { clase: "badge-atencion" }
};

// Ícono + color de fondo para cada nivel de lectoescritura.
const ESTILO_NIVEL = {
  "Presilábico":          { icono: "◆", fondo: "#BED0CE", texto: "#085041" },
  "Silábico":             { icono: "Ab", fondo: "#C2C1D5", texto: "#3C3489" },
  "Silábico alfabético":  { icono: "Aa", fondo: "#FAECE7", texto: "#993C1D" },
  "Alfabético":           { icono: "A",  fondo: "#FBEAF0", texto: "#993556" }
};

// Ícono + color para cada actividad (Lectura, Escritura, Comprensión lectora).
const ESTILO_ACTIVIDAD = {
  "Lectura":             { icono: "👁", fondo: "#C2C1D522", texto: "#3C3489" },
  "Escritura":           { icono: "✎",  fondo: "#8C93A122", texto: "#585347" },
  "Comprensión lectora": { icono: "💬", fondo: "#0F6E5622", texto: "#0F6E56" }
};

/* Helper: lee un parámetro de la URL, ej. alumnos.html?id=3 */
function obtenerParametro(nombre) {
  return new URLSearchParams(window.location.search).get(nombre);
}

/* Helper: busca un alumno por su id */
function buscarAlumno(id) {
  return ALUMNOS.find(a => a.id === Number(id));
}
