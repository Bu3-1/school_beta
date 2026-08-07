// Direcciones base de los 3 microservicios del backend (Booki2 / school_beta).
// Se pueden sobreescribir con variables de entorno de Vite en un archivo
// ".env" o ".env.local" (ver ".env.example" en la raíz del proyecto).

export const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL || "http://localhost:4000";

export const ALUMNOS_API_URL =
  import.meta.env.VITE_ALUMNOS_API_URL || "http://localhost:3001";

export const ACTIVIDADES_API_URL =
  import.meta.env.VITE_ACTIVIDADES_API_URL || "http://localhost:3002";
