// ---------------------------------------------------------------------------
// Contenido de las actividades interactivas.
//
// Cada entrada está indexada por el "id" real de la actividad en la base de
// datos (los mismos ids que carga `actividades/prisma/seed.js`). Si un id no
// aparece aquí, esa actividad sigue funcionando como antes (el maestro
// captura el puntaje manualmente).
//
// Tipos de ejercicio soportados:
//  - "opcion_multiple": se muestra un emoji/pista/contexto de lectura y el
//    alumno elige una opción entre varias.
//  - "construir_palabra": el alumno arma una palabra letra por letra con un
//    "teclado" de opciones.
// ---------------------------------------------------------------------------

const contenido = {
  // Presilábico — "Identificar Vocales y Garabateo"
  1: {
    ejercicios: [
      {
        tipo: "opcion_multiple",
        emoji: "🐱",
        pista: "?ATO",
        enunciado: "¿Qué letra completa la palabra?",
        opciones: ["G", "P", "M"],
        correcta: "G",
      },
      {
        tipo: "opcion_multiple",
        emoji: "🦆",
        pista: "?ATO",
        enunciado: "¿Qué letra completa la palabra?",
        opciones: ["S", "P", "L"],
        correcta: "P",
      },
      {
        tipo: "opcion_multiple",
        emoji: "🏠",
        pista: "?ASA",
        enunciado: "¿Qué letra completa la palabra?",
        opciones: ["C", "T", "B"],
        correcta: "C",
      },
      {
        tipo: "opcion_multiple",
        emoji: "🌙",
        pista: "?UNA",
        enunciado: "¿Qué letra completa la palabra?",
        opciones: ["M", "L", "R"],
        correcta: "L",
      },
      {
        tipo: "construir_palabra",
        emoji: "🐱",
        palabraCorrecta: "GATO",
        letras: ["G", "A", "T", "O", "M", "S"],
      },
      {
        tipo: "construir_palabra",
        emoji: "☀️",
        palabraCorrecta: "SOL",
        letras: ["S", "O", "L", "P", "R", "A"],
      },
      {
        tipo: "construir_palabra",
        emoji: "🏠",
        palabraCorrecta: "CASA",
        letras: ["C", "A", "S", "M", "T", "O"],
      },
    ],
  },

  // Presilábico — "Lectura de Longitud y Palabras Cortas/Largas"
  2: {
    ejercicios: [
      {
        tipo: "opcion_multiple",
        emoji: "🐶",
        enunciado: "¿Qué palabra corresponde a la imagen?",
        opciones: ["PERRO", "PELO", "GATO"],
        correcta: "PERRO",
      },
      {
        tipo: "opcion_multiple",
        emoji: "🍎",
        enunciado: "¿Qué palabra corresponde a la imagen?",
        opciones: ["MANZANA", "MESA", "PERA"],
        correcta: "MANZANA",
      },
      {
        tipo: "opcion_multiple",
        emoji: "🐟",
        enunciado: "¿Qué palabra corresponde a la imagen?",
        opciones: ["PEZ", "PAN", "SOL"],
        correcta: "PEZ",
      },
      {
        tipo: "opcion_multiple",
        emoji: "🌟",
        enunciado: "¿Qué palabra corresponde a la imagen?",
        opciones: ["ESTRELLA", "ESCUELA", "LUNA"],
        correcta: "ESTRELLA",
      },
      {
        tipo: "opcion_multiple",
        emoji: "🐱",
        pista: "GATO",
        enunciado: "¿Qué palabra rima?",
        opciones: ["PATO 🦆", "SOL ☀️", "CASA 🏠"],
        correcta: "PATO 🦆",
      },
      {
        tipo: "opcion_multiple",
        emoji: "🌙",
        pista: "LUNA",
        enunciado: "¿Qué palabra rima?",
        opciones: ["PERRO 🐶", "CUNA 🛏️", "PAN 🍞"],
        correcta: "CUNA 🛏️",
      },
      {
        tipo: "opcion_multiple",
        emoji: "🧀",
        pista: "QUESO",
        enunciado: "¿Qué palabra rima?",
        opciones: ["HUESO 🦴", "MAR 🌊", "GATO 🐱"],
        correcta: "HUESO 🦴",
      },
    ],
  },

  // Silábico — "Conteo de Sílabas y Escritura Inicial"
  4: {
    ejercicios: [
      {
        tipo: "opcion_multiple",
        emoji: "🐸",
        pista: "RA - ?",
        enunciado: "¿Qué sílaba completa la palabra?",
        opciones: ["NA", "TA", "PA"],
        correcta: "NA",
      },
      {
        tipo: "opcion_multiple",
        emoji: "🦆",
        pista: "PA - ?",
        enunciado: "¿Qué sílaba completa la palabra?",
        opciones: ["LO", "TO", "SO"],
        correcta: "TO",
      },
      {
        tipo: "opcion_multiple",
        emoji: "🥛",
        pista: "LE - ?",
        enunciado: "¿Qué sílaba completa la palabra?",
        opciones: ["CHE", "MA", "NO"],
        correcta: "CHE",
      },
      {
        tipo: "opcion_multiple",
        emoji: "⚽",
        pista: "PE - LO - TA",
        enunciado: "¿Qué vocales corresponden a cada sílaba?",
        opciones: ["E - O - A", "A - O - A", "I - O - A"],
        correcta: "E - O - A",
      },
      {
        tipo: "opcion_multiple",
        emoji: "🐱",
        pista: "GA - TO",
        enunciado: "¿Qué vocales corresponden a cada sílaba?",
        opciones: ["E - O", "A - O", "U - O"],
        correcta: "A - O",
      },
      {
        tipo: "opcion_multiple",
        emoji: "🍅",
        pista: "TO - MA - TE",
        enunciado: "¿Qué vocales corresponden a cada sílaba?",
        opciones: ["O - A - E", "A - A - E", "O - O - E"],
        correcta: "O - A - E",
      },
    ],
  },

  // Silábico — "Comprensión con Historias Breves"
  6: {
    ejercicios: [
      {
        tipo: "opcion_multiple",
        contexto: "Susi es una osa.\nSusi pasea a la mesa.\nSusi toma una sopa de tomate.",
        enunciado: "1. ¿Quién es Susi?",
        opciones: ["Una osa 🐻", "Una gata 🐱", "Una pata 🦆"],
        correcta: "Una osa 🐻",
      },
      {
        tipo: "opcion_multiple",
        contexto: "Susi es una osa.\nSusi pasea a la mesa.\nSusi toma una sopa de tomate.",
        enunciado: "2. ¿A dónde pasea Susi?",
        opciones: ["A la mesa 🪑", "Al lago 🌊", "A la casa 🏠"],
        correcta: "A la mesa 🪑",
      },
      {
        tipo: "opcion_multiple",
        contexto: "Susi es una osa.\nSusi pasea a la mesa.\nSusi toma una sopa de tomate.",
        enunciado: "3. ¿Qué toma Susi?",
        opciones: ["Sopa de tomate 🍲", "Leche fría 🥛", "Agua pura 💧"],
        correcta: "Sopa de tomate 🍲",
      },
      {
        tipo: "opcion_multiple",
        contexto: "Mimo es un gato lindo.\nMimo ve una pelota en el piso.\nEl gato Mimo salta y juega con la pelota.",
        enunciado: "1. ¿Cómo se llama el gato?",
        opciones: ["Mimo 🐱", "Tito 🐶", "Lalo 🐰"],
        correcta: "Mimo 🐱",
      },
      {
        tipo: "opcion_multiple",
        contexto: "Mimo es un gato lindo.\nMimo ve una pelota en el piso.\nEl gato Mimo salta y juega con la pelota.",
        enunciado: "2. ¿Qué ve Mimo en el piso?",
        opciones: ["Una pelota ⚽", "Un ratón 🐭", "Un plato 🍽️"],
        correcta: "Una pelota ⚽",
      },
      {
        tipo: "opcion_multiple",
        contexto: "Mimo es un gato lindo.\nMimo ve una pelota en el piso.\nEl gato Mimo salta y juega con la pelota.",
        enunciado: "3. ¿Qué hace el gato Mimo?",
        opciones: ["Salta y juega 🎾", "Duerme mucho 💤", "Comer fruta 🍎"],
        correcta: "Salta y juega 🎾",
      },
    ],
  },

  // Silábico-Alfabético — "Comprensión Lectora Intermedia"
  9: {
    ejercicios: [
      {
        tipo: "opcion_multiple",
        contexto: "Sofía fue al parque con su hermano Mateo.\nLlevaron una canasta con frutas y jugos.\nEn el parque vieron un conejo blanco saltar cerca del árbol.",
        enunciado: "1. ¿A dónde fue Sofía?",
        opciones: ["Al parque 🌳", "A la playa 🏖️", "A la escuela 🏫"],
        correcta: "Al parque 🌳",
      },
      {
        tipo: "opcion_multiple",
        contexto: "Sofía fue al parque con su hermano Mateo.\nLlevaron una canasta con frutas y jugos.\nEn el parque vieron un conejo blanco saltar cerca del árbol.",
        enunciado: "2. ¿Quién acompañó a Sofía?",
        opciones: ["Su hermano Mateo 👦", "Su mamá 👩", "Su abuela 👵"],
        correcta: "Su hermano Mateo 👦",
      },
      {
        tipo: "opcion_multiple",
        contexto: "Sofía fue al parque con su hermano Mateo.\nLlevaron una canasta con frutas y jugos.\nEn el parque vieron un conejo blanco saltar cerca del árbol.",
        enunciado: "3. ¿Qué animal vieron saltar?",
        opciones: ["Un conejo blanco 🐰", "Un perro café 🐶", "Un pájaro azul 🐦"],
        correcta: "Un conejo blanco 🐰",
      },
    ],
  },

  // Alfabético — "Comprensión Lectora de Textos Informativos"
  12: {
    ejercicios: [
      {
        tipo: "opcion_multiple",
        contexto: "Las abejas son insectos muy importantes para el planeta.\nVuelan de flor en flor recolectando néctar para fabricar miel en sus colmenas.\nAdemás, al transportar el polen ayudan a que crezcan nuevas plantas y frutos.",
        enunciado: "1. ¿Qué recolectan las abejas de las flores?",
        opciones: ["Néctar 🍯", "Agua 💧", "Hojas 🍃"],
        correcta: "Néctar 🍯",
      },
      {
        tipo: "opcion_multiple",
        contexto: "Las abejas son insectos muy importantes para el planeta.\nVuelan de flor en flor recolectando néctar para fabricar miel en sus colmenas.\nAdemás, al transportar el polen ayudan a que crezcan nuevas plantas y frutos.",
        enunciado: "2. ¿Dónde fabrican la miel?",
        opciones: ["En sus colmenas 🐝", "En la tierra 🪴", "En los árboles 🌳"],
        correcta: "En sus colmenas 🐝",
      },
      {
        tipo: "opcion_multiple",
        contexto: "Las abejas son insectos muy importantes para el planeta.\nVuelan de flor en flor recolectando néctar para fabricar miel en sus colmenas.\nAdemás, al transportar el polen ayudan a que crezcan nuevas plantas y frutos.",
        enunciado: "3. ¿En qué ayudan al transportar el polen?",
        opciones: [
          "A crecer nuevas plantas y frutos 🍎",
          "A hacer llover 🌧️",
          "A limpiar el aire 💨",
        ],
        correcta: "A crecer nuevas plantas y frutos 🍎",
      },
      {
        tipo: "opcion_multiple",
        contexto: "Hoy la maestra Laura llevó vinagre y bicarbonato a la clase.\nJunto con sus alumnos hicieron un volcán de plastilina café.\nCuando mezclaron los ingredientes, la espuma roja salió por arriba como lava de verdad. ¡Todos quedaron sorprendidos!",
        enunciado: "1. ¿Qué ingredientes llevó la maestra?",
        opciones: ["Vinagre y bicarbonato", "Agua y azúcar", "Leche y harina"],
        correcta: "Vinagre y bicarbonato",
      },
      {
        tipo: "opcion_multiple",
        contexto: "Hoy la maestra Laura llevó vinagre y bicarbonato a la clase.\nJunto con sus alumnos hicieron un volcán de plastilina café.\nCuando mezclaron los ingredientes, la espuma roja salió por arriba como lava de verdad. ¡Todos quedaron sorprendidos!",
        enunciado: "2. ¿De qué material hicieron el volcán?",
        opciones: ["Plastilina café", "Papel periódico", "Madera"],
        correcta: "Plastilina café",
      },
      {
        tipo: "opcion_multiple",
        contexto: "Hoy la maestra Laura llevó vinagre y bicarbonato a la clase.\nJunto con sus alumnos hicieron un volcán de plastilina café.\nCuando mezclaron los ingredientes, la espuma roja salió por arriba como lava de verdad. ¡Todos quedaron sorprendidos!",
        enunciado: "3. ¿Por qué se sorprendieron los alumnos?",
        opciones: [
          "Porque salió espuma roja como lava",
          "Porque el volcán se rompió",
          "Porque no pasó nada",
        ],
        correcta: "Porque salió espuma roja como lava",
      },
    ],
  },
};

export const getJuego = (actividadId) => contenido[Number(actividadId)] || null;

export const tieneJuego = (actividadId) => Boolean(contenido[Number(actividadId)]);
