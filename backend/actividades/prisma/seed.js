import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  const actividades = [
    // Presilábico
    { id: 1, titulo: "Identificar Vocales y Garabateo", nivel: "Presilábico" },
    {
      id: 2,
      titulo: "Lectura de Longitud y Palabras Cortas/Largas",
      nivel: "Presilábico",
    },
    {
      id: 3,
      titulo: "Comprensión de Cuentos Ilustrados",
      nivel: "Presilábico",
    },
    // Silábico
    {
      id: 4,
      titulo: "Conteo de Sílabas y Escritura Inicial",
      nivel: "Silábico",
    },
    { id: 5, titulo: "Asociación Sílaba-Imagen", nivel: "Silábico" },
    { id: 6, titulo: "Comprensión con Historias Breves", nivel: "Silábico" },
    // Silábico-Alfabético
    {
      id: 7,
      titulo: "Completar Fonemas y Corrección Ortográfica",
      nivel: "Silábico-Alfabético",
    },
    {
      id: 8,
      titulo: "Lectura de Sílabas Compuestas y Orden de Oraciones",
      nivel: "Silábico-Alfabético",
    },
    {
      id: 9,
      titulo: "Comprensión Lectora Intermedia",
      nivel: "Silábico-Alfabético",
    },
    // Alfabético
    { id: 10, titulo: "Ortografía y Anagramas", nivel: "Alfabético" },
    {
      id: 11,
      titulo: "Lectura de Definiciones y Sinónimos",
      nivel: "Alfabético",
    },
    {
      id: 12,
      titulo: "Comprensión Lectora de Textos Informativos",
      nivel: "Alfabético",
    },
  ];

  for (const act of actividades) {
    const query = `
      INSERT INTO actividades (id, titulo, nivel)
      VALUES ($1, $2, $3)
      ON CONFLICT (id) DO UPDATE SET titulo = EXCLUDED.titulo, nivel = EXCLUDED.nivel;
    `;
    await pool.query(query, [act.id, act.titulo, act.nivel]);
  }

  console.log("✅ ¡ACTIVIDADES INSERTADAS CON ÉXITO EN POSTGRESQL!");
}

main()
  .catch((e) => console.error("Error al insertar:", e))
  .finally(() => pool.end());
