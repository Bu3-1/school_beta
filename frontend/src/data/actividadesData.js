// src/data/actividadesData.js

export const ACTIVIDADES_BOOKI = [
  // ==========================================
  // NIVEL 1: PRESILÁBICA (6 Actividades)
  // ==========================================
  {
    id: "pre-1",
    nivel: "Presilábica",
    subseccion: "Identificación de Vocales",
    titulo: "El laberinto de las vocales",
    instrucciones: "Selecciona la imagen que empieza con la vocal indicada.",
    preguntas: [
      {
        q: "¿Qué imagen empieza con la letra A?",
        opciones: [
          { e: "🐝", l: "Abeja" },
          { e: "🐶", l: "Perro" },
          { e: "🐱", l: "Gato" },
          { e: "🐸", l: "Rana" },
        ],
        correcta: "Abeja",
      },
      {
        q: "¿Qué imagen empieza con la letra O?",
        opciones: [
          { e: "🐻", l: "Oso" },
          { e: "🐟", l: "Pez" },
          { e: "🦋", l: "Mariposa" },
          { e: "🐘", l: "Elefante" },
        ],
        correcta: "Oso",
      },
      {
        q: "¿Qué imagen empieza con la letra I?",
        opciones: [
          { e: "🧲", l: "Imán" },
          { e: "🌞", l: "Sol" },
          { e: "🍎", l: "Manzana" },
          { e: "🚗", l: "Coche" },
        ],
        correcta: "Imán",
      },
    ],
  },
  {
    id: "pre-2",
    nivel: "Presilábica",
    subseccion: "Identificación de Vocales",
    titulo: "Sonidos vocálicos ocultos",
    instrucciones: "Encuentra el objeto que termina con la vocal indicada.",
    preguntas: [
      {
        q: "¿Qué palabra termina con la letra O?",
        opciones: [
          { e: "🐱", l: "Gato" },
          { e: "🍉", l: "Sandía" },
          { e: "🌳", l: "Árbol" },
          { e: "🌻", l: "Flor" },
        ],
        correcta: "Gato",
      },
      {
        q: "¿Qué palabra termina con la letra A?",
        opciones: [
          { e: "🏠", l: "Casa" },
          { e: "🚗", l: "Coche" },
          { e: "🦁", l: "León" },
          { e: "🐒", l: "Mono" },
        ],
        correcta: "Casa",
      },
    ],
  },
  {
    id: "pre-3",
    nivel: "Presilábica",
    subseccion: "Garabateo y Trazos Iniciales",
    titulo: "Asociación de formas",
    instrucciones: "Selecciona la figura que se parece al objeto.",
    preguntas: [
      {
        q: "¿Qué figura se parece al Sol? 🌞",
        opciones: [
          { e: "⭕", l: "Círculo" },
          { e: "⬛", l: "Cuadrado" },
          { e: "🔺", l: "Triángulo" },
          { e: "⭐", l: "Estrella" },
        ],
        correcta: "Círculo",
      },
      {
        q: "¿Qué figura se parece a una rebanada de pizza? 🍕",
        opciones: [
          { e: "🔺", l: "Triángulo" },
          { e: "⭕", l: "Círculo" },
          { e: "⬛", l: "Cuadrado" },
          { e: "❤️", l: "Corazón" },
        ],
        correcta: "Triángulo",
      },
    ],
  },
  {
    id: "pre-4",
    nivel: "Presilábica",
    subseccion: "Garabateo y Trazos Iniciales",
    titulo: "Completando el dibujo",
    instrucciones: "¿Qué parte le falta a este objeto?",
    preguntas: [
      {
        q: "A la cara le falta...",
        opciones: [
          { e: "👃", l: "Nariz" },
          { e: "👞", l: "Zapato" },
          { e: "🧤", l: "Guante" },
          { e: "🧢", l: "Gorra" },
        ],
        correcta: "Nariz",
      },
      {
        q: "Al coche le falta...",
        opciones: [
          { e: "🛞", l: "Rueda" },
          { e: "🚪", l: "Puerta de casa" },
          { e: "🪟", l: "Ventana de casa" },
          { e: "🪑", l: "Silla" },
        ],
        correcta: "Rueda",
      },
    ],
  },
  {
    id: "pre-5",
    nivel: "Presilábica",
    subseccion: "Lectura de Longitud",
    titulo: "Palabras cortas vs largas",
    instrucciones: "Observa y selecciona la respuesta correcta.",
    preguntas: [
      {
        q: "¿Cuál de estas palabras es más LARGA al escribirla?",
        opciones: [
          { e: "🦋", l: "Mariposa" },
          { e: "🌞", l: "Sol" },
          { e: "🍞", l: "Pan" },
          { e: "🌊", l: "Mar" },
        ],
        correcta: "Mariposa",
      },
      {
        q: "¿Cuál de estas palabras es más CORTA?",
        opciones: [
          { e: "🚂", l: "Tren" },
          { e: "🐘", l: "Elefante" },
          { e: "🐊", l: "Cocodrilo" },
          { e: "🚁", l: "Helicóptero" },
        ],
        correcta: "Tren",
      },
    ],
  },
  {
    id: "pre-6",
    nivel: "Presilábica",
    subseccion: "Lectura de Longitud",
    titulo: "Comparación visual",
    instrucciones: "Compara el tamaño de los nombres.",
    preguntas: [
      {
        q: "Entre 'Gato' y 'Rinoceronte', ¿Cuál es más larga?",
        opciones: [
          { e: "🦏", l: "Rinoceronte" },
          { e: "🐱", l: "Gato" },
        ],
        correcta: "Rinoceronte",
      },
      {
        q: "Entre 'Flor' y 'Margarita', ¿Cuál es más corta?",
        opciones: [
          { e: "🌸", l: "Flor" },
          { e: "🌼", l: "Margarita" },
        ],
        correcta: "Flor",
      },
    ],
  },

  // ==========================================
  // NIVEL 2: SILÁBICA (6 Actividades)
  // ==========================================
  {
    id: "sil-1",
    nivel: "Silábica",
    subseccion: "Conteo de Sílabas",
    titulo: "El Aplausómetro",
    instrucciones: "¿Cuántos aplausos (sílabas) tiene la palabra?",
    preguntas: [
      {
        q: "MAN - ZA - NA 🍎",
        opciones: [
          { e: "👏", l: "3 aplausos" },
          { e: "👏", l: "2 aplausos" },
          { e: "👏", l: "4 aplausos" },
          { e: "👏", l: "1 aplauso" },
        ],
        correcta: "3 aplausos",
      },
      {
        q: "SOL 🌞",
        opciones: [
          { e: "👏", l: "1 aplauso" },
          { e: "👏", l: "2 aplausos" },
          { e: "👏", l: "3 aplausos" },
          { e: "👏", l: "Ninguno" },
        ],
        correcta: "1 aplauso",
      },
    ],
  },
  {
    id: "sil-2",
    nivel: "Silábica",
    subseccion: "Conteo de Sílabas",
    titulo: "La oruga silábica",
    instrucciones:
      "Cuenta los círculos de la oruga para las siguientes palabras.",
    preguntas: [
      {
        q: "CO - CO - DRI - LO 🐊",
        opciones: [
          { e: "🐛", l: "4 sílabas" },
          { e: "🐛", l: "2 sílabas" },
          { e: "🐛", l: "3 sílabas" },
          { e: "🐛", l: "5 sílabas" },
        ],
        correcta: "4 sílabas",
      },
      {
        q: "PE - RRO 🐶",
        opciones: [
          { e: "🐛", l: "2 sílabas" },
          { e: "🐛", l: "1 sílaba" },
          { e: "🐛", l: "3 sílabas" },
          { e: "🐛", l: "4 sílabas" },
        ],
        correcta: "2 sílabas",
      },
    ],
  },
  {
    id: "sil-3",
    nivel: "Silábica",
    subseccion: "Asociación Sílaba-Imagen",
    titulo: "Uniendo sílabas con dibujos",
    instrucciones: "¿Con qué sílaba empieza el dibujo?",
    preguntas: [
      {
        q: "Pelota ⚽",
        opciones: [
          { e: "PE", l: "PE" },
          { e: "PA", l: "PA" },
          { e: "PO", l: "PO" },
          { e: "PU", l: "PU" },
        ],
        correcta: "PE",
      },
      {
        q: "Limón 🍋",
        opciones: [
          { e: "LI", l: "LI" },
          { e: "LA", l: "LA" },
          { e: "LO", l: "LO" },
          { e: "LU", l: "LU" },
        ],
        correcta: "LI",
      },
    ],
  },
  {
    id: "sil-4",
    nivel: "Silábica",
    subseccion: "Asociación Sílaba-Imagen",
    titulo: "Rompecabezas silábico",
    instrucciones: "Encuentra la sílaba final de la palabra.",
    preguntas: [
      {
        q: "CA - ___ 🏠",
        opciones: [
          { e: "SA", l: "SA" },
          { e: "MA", l: "MA" },
          { e: "PA", l: "PA" },
          { e: "TA", l: "TA" },
        ],
        correcta: "SA",
      },
      {
        q: "GA - ___ 🐱",
        opciones: [
          { e: "TO", l: "TO" },
          { e: "LO", l: "LO" },
          { e: "RO", l: "RO" },
          { e: "MO", l: "MO" },
        ],
        correcta: "TO",
      },
    ],
  },
  {
    id: "sil-5",
    nivel: "Silábica",
    subseccion: "Comprensión con Historias Breves",
    titulo: "El gato Mimo",
    instrucciones: "Lee el cuento y selecciona la respuesta correcta.",
    historia:
      "Mi-mo es un ga-to ne-gro. Vi-ve en u-na ca-sa ro-ja. To-das las no-ches, can-ta a la lu-na.",
    preguntas: [
      {
        q: "¿De qué color es Mimo?",
        opciones: [
          { e: "⬛", l: "Negro" },
          { e: "⬜", l: "Blanco" },
          { e: "🟤", l: "Café" },
          { e: "🟠", l: "Naranja" },
        ],
        correcta: "Negro",
      },
      {
        q: "¿A quién le canta Mimo?",
        opciones: [
          { e: "🌙", l: "A la luna" },
          { e: "🌞", l: "Al sol" },
          { e: "⭐", l: "A las estrellas" },
          { e: "☁️", l: "A las nubes" },
        ],
        correcta: "A la luna",
      },
    ],
  },
  {
    id: "sil-6",
    nivel: "Silábica",
    subseccion: "Comprensión con Historias Breves",
    titulo: "¿Quién es el personaje?",
    instrucciones: "Lee la pista y descubre al animal.",
    preguntas: [
      {
        q: "Es ver-de, sal-ta mu-cho y vi-ve en el a-gua.",
        opciones: [
          { e: "🐸", l: "Rana" },
          { e: "🐊", l: "Cocodrilo" },
          { e: "🐢", l: "Tortuga" },
          { e: "🐍", l: "Serpiente" },
        ],
        correcta: "Rana",
      },
      {
        q: "Tie-ne a-las, vi-ve en un ni-do y can-ta.",
        opciones: [
          { e: "🐦", l: "Pájaro" },
          { e: "🦇", l: "Murciélago" },
          { e: "🦋", l: "Mariposa" },
          { e: "🐝", l: "Abeja" },
        ],
        correcta: "Pájaro",
      },
    ],
  },

  // ==========================================
  // NIVEL 3: SILÁBICO-ALFABÉTICA (8 Actividades)
  // ==========================================
  {
    id: "sil-alf-1",
    nivel: "Silábico-Alfabética",
    subseccion: "Completar Fonemas",
    titulo: "La letra que falta",
    instrucciones: "Completa la palabra con la letra faltante.",
    preguntas: [
      {
        q: "M A _ Z A N A 🍎",
        opciones: [
          { e: "N", l: "N" },
          { e: "M", l: "M" },
          { e: "S", l: "S" },
          { e: "P", l: "P" },
        ],
        correcta: "N",
      },
      {
        q: "P E _ R O 🐶",
        opciones: [
          { e: "R", l: "R" },
          { e: "L", l: "L" },
          { e: "T", l: "T" },
          { e: "D", l: "D" },
        ],
        correcta: "R",
      },
    ],
  },
  {
    id: "sil-alf-2",
    nivel: "Silábico-Alfabética",
    subseccion: "Completar Fonemas",
    titulo: "Sopa de consonantes",
    instrucciones: "¿Qué letra cambia el significado?",
    preguntas: [
      {
        q: "¿Pato o Gato? _ A T O 🦆",
        opciones: [
          { e: "P", l: "P" },
          { e: "G", l: "G" },
          { e: "M", l: "M" },
          { e: "R", l: "R" },
        ],
        correcta: "P",
      },
      {
        q: "¿Cama o Rama? _ A M A 🛏️",
        opciones: [
          { e: "C", l: "C" },
          { e: "R", l: "R" },
          { e: "L", l: "L" },
          { e: "M", l: "M" },
        ],
        correcta: "C",
      },
    ],
  },
  {
    id: "sil-alf-3",
    nivel: "Silábico-Alfabética",
    subseccion: "Corrección Ortográfica",
    titulo: "Cazador de errores",
    instrucciones: "Selecciona la palabra que está escrita correctamente.",
    preguntas: [
      {
        q: "¿Cómo se escribe? 🏠",
        opciones: [
          { e: "C", l: "Casa" },
          { e: "K", l: "Kasa" },
          { e: "Z", l: "Zasa" },
          { e: "S", l: "Saca" },
        ],
        correcta: "Casa",
      },
      {
        q: "¿Cómo se escribe? 🧀",
        opciones: [
          { e: "Q", l: "Queso" },
          { e: "K", l: "Keso" },
          { e: "C", l: "Cueso" },
          { e: "Z", l: "Zeso" },
        ],
        correcta: "Queso",
      },
    ],
  },
  {
    id: "sil-alf-4",
    nivel: "Silábico-Alfabética",
    subseccion: "Corrección Ortográfica",
    titulo: "Detector de mayúsculas",
    instrucciones: "¿Cuál palabra debe ir con mayúscula?",
    preguntas: [
      {
        q: "Identifica el nombre propio:",
        opciones: [
          { e: "👦", l: "juanito" },
          { e: "🐕", l: "perro" },
          { e: "🌳", l: "árbol" },
          { e: "🚗", l: "coche" },
        ],
        correcta: "juanito",
      },
      {
        q: "Identifica la ciudad:",
        opciones: [
          { e: "🏙️", l: "durango" },
          { e: "🏞️", l: "río" },
          { e: "⛰️", l: "montaña" },
          { e: "🛤️", l: "calle" },
        ],
        correcta: "durango",
      },
    ],
  },
  {
    id: "sil-alf-5",
    nivel: "Silábico-Alfabética",
    subseccion: "Sílabas Compuestas",
    titulo: "Construyendo con trabadas",
    instrucciones: "Completa la palabra con la sílaba trabada correcta.",
    preguntas: [
      {
        q: "___ - GO 🌾",
        opciones: [
          { e: "TRI", l: "TRI" },
          { e: "TI", l: "TI" },
          { e: "TIR", l: "TIR" },
          { e: "PRI", l: "PRI" },
        ],
        correcta: "TRI",
      },
      {
        q: "___ - CO 🐊",
        opciones: [
          { e: "TRON", l: "TRON" },
          { e: "TON", l: "TON" },
          { e: "TOL", l: "TOL" },
          { e: "PLON", l: "PLON" },
        ],
        correcta: "TRON",
      },
    ],
  },
  {
    id: "sil-alf-6",
    nivel: "Silábico-Alfabética",
    subseccion: "Sílabas Compuestas",
    titulo: "La rueda de las sílabas",
    instrucciones: "Selecciona la sílaba compuesta adecuada.",
    preguntas: [
      {
        q: "___ - CO 👻",
        opciones: [
          { e: "BLAN", l: "BLAN" },
          { e: "BAN", l: "BAN" },
          { e: "BAL", l: "BAL" },
          { e: "BRAN", l: "BRAN" },
        ],
        correcta: "BLAN",
      },
      {
        q: "___ - MIO 🏆",
        opciones: [
          { e: "PRE", l: "PRE" },
          { e: "PE", l: "PE" },
          { e: "PER", l: "PER" },
          { e: "PLE", l: "PLE" },
        ],
        correcta: "PRE",
      },
    ],
  },
  {
    id: "sil-alf-7",
    nivel: "Silábico-Alfabética",
    subseccion: "Orden de Oraciones",
    titulo: "El tren de palabras",
    instrucciones: "¿Cuál es el orden correcto de la oración?",
    preguntas: [
      {
        q: "perro / El / ladra",
        opciones: [
          { e: "1️⃣", l: "El perro ladra" },
          { e: "2️⃣", l: "ladra El perro" },
          { e: "3️⃣", l: "perro El ladra" },
          { e: "4️⃣", l: "El ladra perro" },
        ],
        correcta: "El perro ladra",
      },
      {
        q: "come / niña / La",
        opciones: [
          { e: "1️⃣", l: "La niña come" },
          { e: "2️⃣", l: "niña La come" },
          { e: "3️⃣", l: "come La niña" },
          { e: "4️⃣", l: "La come niña" },
        ],
        correcta: "La niña come",
      },
    ],
  },
  {
    id: "sil-alf-8",
    nivel: "Silábico-Alfabética",
    subseccion: "Orden de Oraciones",
    titulo: "¿Qué hace el sujeto?",
    instrucciones: "Encuentra el final lógico de la oración.",
    preguntas: [
      {
        q: "El pájaro azul...",
        opciones: [
          { e: "🐦", l: "vuela en el cielo." },
          { e: "🐟", l: "nada en el mar." },
          { e: "🚗", l: "corre en la calle." },
          { e: "📖", l: "lee un libro." },
        ],
        correcta: "vuela en el cielo.",
      },
      {
        q: "El pez naranja...",
        opciones: [
          { e: "🐟", l: "nada en el agua." },
          { e: "🐦", l: "vuela en el cielo." },
          { e: "🐒", l: "salta en el árbol." },
          { e: "🚗", l: "toca el claxon." },
        ],
        correcta: "nada en el agua.",
      },
    ],
  },

  // ==========================================
  // NIVEL 4: ALFABÉTICA (8 Actividades)
  // ==========================================
  {
    id: "alf-1",
    nivel: "Alfabética",
    subseccion: "Ortografía Práctica",
    titulo: "El dilema B / V",
    instrucciones: "Completa la palabra con la letra correcta.",
    preguntas: [
      {
        q: "La _aca come pasto 🐄",
        opciones: [
          { e: "V", l: "V" },
          { e: "B", l: "B" },
        ],
        correcta: "V",
      },
      {
        q: "El _arco navega 🚢",
        opciones: [
          { e: "B", l: "B" },
          { e: "V", l: "V" },
        ],
        correcta: "B",
      },
    ],
  },
  {
    id: "alf-2",
    nivel: "Alfabética",
    subseccion: "Ortografía Práctica",
    titulo: "Uso de C, S y Z",
    instrucciones: "Selecciona la letra correcta para completar.",
    preguntas: [
      {
        q: "Zapa_o 👞",
        opciones: [
          { e: "T", l: "t" },
          { e: "C", l: "c" },
          { e: "S", l: "s" },
          { e: "Z", l: "z" },
        ],
        correcta: "t",
      }, // Tricky one for alphabet stage
      {
        q: "Cora_ón ❤️",
        opciones: [
          { e: "Z", l: "z" },
          { e: "S", l: "s" },
          { e: "C", l: "c" },
          { e: "X", l: "x" },
        ],
        correcta: "z",
      },
    ],
  },
  {
    id: "alf-3",
    nivel: "Alfabética",
    subseccion: "Anagramas",
    titulo: "Desorden de letras",
    instrucciones: "Descubre la palabra oculta.",
    preguntas: [
      {
        q: "R O P E R",
        opciones: [
          { e: "🐶", l: "PERRO" },
          { e: "🍐", l: "PERAL" },
          { e: "💇", l: "PELO" },
          { e: "🚪", l: "PUERTA" },
        ],
        correcta: "PERRO",
      },
      {
        q: "T O G A",
        opciones: [
          { e: "🐱", l: "GATO" },
          { e: "💧", l: "GOTA" },
          { e: "🦆", l: "PATO" },
          { e: "🐭", l: "RATA" },
        ],
        correcta: "GATO",
      },
    ],
  },
  {
    id: "alf-4",
    nivel: "Alfabética",
    subseccion: "Anagramas",
    titulo: "Palabras cruzadas rápidas",
    instrucciones: "Ordena mentalmente las letras y elige la respuesta.",
    preguntas: [
      {
        q: "O S O (al revés dice...)",
        opciones: [
          { e: "🐻", l: "OSO" },
          { e: "☀️", l: "SOL" },
          { e: "🧂", l: "SAL" },
          { e: "👁️", l: "OJO" },
        ],
        correcta: "OSO",
      },
      {
        q: "R A M A (al revés dice...)",
        opciones: [
          { e: "❤️", l: "AMAR" },
          { e: "🌊", l: "MAR" },
          { e: "🦆", l: "PATA" },
          { e: "🐸", l: "RANA" },
        ],
        correcta: "AMAR",
      },
    ],
  },
  {
    id: "alf-5",
    nivel: "Alfabética",
    subseccion: "Definiciones y Sinónimos",
    titulo: "El diccionario interactivo",
    instrucciones: "Elige la palabra que coincide con la definición.",
    preguntas: [
      {
        q: "Mueble que se usa para dormir.",
        opciones: [
          { e: "🛏️", l: "Cama" },
          { e: "🪑", l: "Silla" },
          { e: "🚪", l: "Puerta" },
          { e: "🪟", l: "Ventana" },
        ],
        correcta: "Cama",
      },
      {
        q: "Vehículo de cuatro ruedas.",
        opciones: [
          { e: "🚗", l: "Coche" },
          { e: "🚲", l: "Bicicleta" },
          { e: "✈️", l: "Avión" },
          { e: "🚢", l: "Barco" },
        ],
        correcta: "Coche",
      },
    ],
  },
  {
    id: "alf-6",
    nivel: "Alfabética",
    subseccion: "Definiciones y Sinónimos",
    titulo: "Emparejando sinónimos",
    instrucciones: "¿Qué palabra significa lo mismo?",
    preguntas: [
      {
        q: "Sinónimo de ALEGRE 😄",
        opciones: [
          { e: "😁", l: "Contento" },
          { e: "😢", l: "Triste" },
          { e: "😡", l: "Enojado" },
          { e: "😴", l: "Cansado" },
        ],
        correcta: "Contento",
      },
      {
        q: "Sinónimo de RÁPIDO 🏃",
        opciones: [
          { e: "⚡", l: "Veloz" },
          { e: "🐢", l: "Lento" },
          { e: "🚶", l: "Despacio" },
          { e: "🛑", l: "Quieto" },
        ],
        correcta: "Veloz",
      },
    ],
  },
  {
    id: "alf-7",
    nivel: "Alfabética",
    subseccion: "Textos Informativos",
    titulo: "Preguntas de lectura",
    instrucciones:
      "Lee y responde: 'El león es el rey de la selva. Come carne y duerme mucho.'",
    preguntas: [
      {
        q: "¿Qué come el león?",
        opciones: [
          { e: "🥩", l: "Carne" },
          { e: "🥬", l: "Hojas" },
          { e: "🍎", l: "Frutas" },
          { e: "🐟", l: "Pescado" },
        ],
        correcta: "Carne",
      },
      {
        q: "¿Dónde vive el león?",
        opciones: [
          { e: "🌳", l: "En la selva" },
          { e: "🌊", l: "En el mar" },
          { e: "🏙️", l: "En la ciudad" },
          { e: "🏔️", l: "En la nieve" },
        ],
        correcta: "En la selva",
      },
    ],
  },
  {
    id: "alf-8",
    nivel: "Alfabética",
    subseccion: "Textos Informativos",
    titulo: "Idea principal",
    instrucciones: "Selecciona el mejor título para el texto.",
    preguntas: [
      {
        q: "'Las abejas hacen miel y viven en panales.'",
        opciones: [
          { e: "🐝", l: "La vida de las abejas" },
          { e: "🐻", l: "Los osos comen miel" },
          { e: "🌸", l: "Las flores del jardín" },
          { e: "🐜", l: "Las hormigas trabajadoras" },
        ],
        correcta: "La vida de las abejas",
      },
      {
        q: "'El agua es vida. Debemos cuidarla y no desperdiciarla.'",
        opciones: [
          { e: "💧", l: "Cuidemos el agua" },
          { e: "🔥", l: "El fuego quema" },
          { e: "💨", l: "El viento fuerte" },
          { e: "🌍", l: "La tierra gira" },
        ],
        correcta: "Cuidemos el agua",
      },
    ],
  },
];
