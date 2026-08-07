// Cliente de conexión al backend real (Booki2 / school_beta).
//
// Mantiene una forma estable (apiClient.auth.*, apiClient.entities.*)
// para que ninguna página o componente del diseño tenga que cambiar:
// solo se cambia lo que hay "detrás" de estas funciones.

import {
  AUTH_API_URL,
  ALUMNOS_API_URL,
  ACTIVIDADES_API_URL,
} from "@/lib/api-config";

// ---------------------------------------------------------------------------
// Sesión (token JWT emitido por el servicio "login")
// ---------------------------------------------------------------------------

const TOKEN_KEY = "booki_token";
const MAESTRO_KEY = "booki_maestro";

const getToken = () => localStorage.getItem(TOKEN_KEY);

const getStoredMaestro = () => {
  const raw = localStorage.getItem(MAESTRO_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const setSession = (token, maestro) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(MAESTRO_KEY, JSON.stringify(maestro));
};

const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(MAESTRO_KEY);
};

// Credenciales guardadas temporalmente entre "register" y "verifyOtp": el
// backend no tiene un servicio real de envío/verificación de correo, así
// que al "verificar" el código simplemente iniciamos sesión con la cuenta
// recién creada (cualquier código de 6 dígitos válido en la UI funciona).
let pendingRegistration = null;

// ---------------------------------------------------------------------------
// Helper de peticiones HTTP
// ---------------------------------------------------------------------------

async function request(
  baseUrl,
  path,
  { method = "GET", body, auth = false } = {},
) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = getToken();
    if (!token) {
      const err = new Error("No has iniciado sesión");
      err.status = 401;
      throw err;
    }
    headers.Authorization = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${baseUrl}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (networkError) {
    const err = new Error(
      "No se pudo conectar con el servidor. Verifica que el backend esté corriendo.",
    );
    err.status = 0;
    err.cause = networkError;
    throw err;
  }

  const text = await res.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }

  if (!res.ok) {
    const err = new Error(data?.error || `Error ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

// ---------------------------------------------------------------------------
// Mapeo Alumno: el front usa "nombre_anonimizado" y "condiciones" (array);
// el backend usa "nombre_anonimanizado" y "condicion" (string única).
// ---------------------------------------------------------------------------

const backendToFrontAlumno = (row) => ({
  id: row.id,
  nombre_anonimizado: row.nombre_anonimanizado,
  edad: row.edad,
  grado: row.grado,
  grupo: row.grupo,
  condiciones: row.condicion
    ? row.condicion
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean)
    : [],
  id_maestro: row.id_maestro,
});

const frontToBackendAlumno = (data) => {
  const maestro = getStoredMaestro();
  const condiciones = Array.isArray(data.condiciones) ? data.condiciones : [];
  return {
    nombre_anonimanizado: data.nombre_anonimizado,
    edad: data.edad !== undefined ? Number(data.edad) : undefined,
    grado: data.grado !== undefined ? Number(data.grado) : undefined,
    grupo: data.grupo,
    condicion: condiciones.length > 0 ? condiciones.join(", ") : "Ninguna",
    id_maestro: data.id_maestro ?? maestro?.id,
  };
};

// ---------------------------------------------------------------------------
// Mapeo Nivel: el front usa formas femeninas y el backend masculinas.
// ---------------------------------------------------------------------------

const NIVEL_FRONT_TO_BACK = {
  Presilábica: "Presilábico",
  Silábica: "Silábico",
  "Silábico-Alfabética": "Silábico-Alfabético",
  Alfabética: "Alfabético",
};

// ---------------------------------------------------------------------------
// Mapeo IntentoActividad
// ---------------------------------------------------------------------------

const backendToFrontIntento = (row) => ({
  id: row.id,
  alumno_id: row.id_alumno,
  actividad_id: row.id_actividad,
  puntaje: row.puntaje,
  fecha: row.fecha,
});

// ---------------------------------------------------------------------------
// Orden genérico tipo "-campo" (descendente) / "campo" (ascendente)
// ---------------------------------------------------------------------------

const sortBy = (list, sortParam) => {
  if (!sortParam) return list;
  const desc = sortParam.startsWith("-");
  const field = desc ? sortParam.slice(1) : sortParam;
  // "created_date" no existe en el backend: usamos "id" como equivalente
  // (los registros más nuevos tienen id más alto).
  const key = field === "created_date" ? "id" : field;
  return [...list].sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    if (av === bv) return 0;
    const cmp = av > bv ? 1 : -1;
    return desc ? -cmp : cmp;
  });
};

// ---------------------------------------------------------------------------
// Condiciones / neurodivergencias: el backend no tiene esta entidad
// (guarda solo un texto libre en "condicion"), así que ofrecemos un
// catálogo fijo que alimenta el selector del formulario de registro.
// ---------------------------------------------------------------------------

const CONDICIONES = [
  { id: "dislexia", nombre: "Dislexia" },
  { id: "disgrafia", nombre: "Disgrafía" },
  { id: "discalculia", nombre: "Discalculia" },
  { id: "tdah", nombre: "TDAH" },
  { id: "tea", nombre: "Trastorno del Espectro Autista" },
  { id: "tps", nombre: "Trastorno del Procesamiento Sensorial" },
  { id: "ninguna", nombre: "Ninguna" },
];

// ---------------------------------------------------------------------------
// Cliente
// ---------------------------------------------------------------------------

export const apiClient = {
  auth: {
    // Devuelve el maestro autenticado. Revalida contra el backend
    // (servicio "alumnos", que expone /api/maestros/:id) para confirmar
    // que el token todavía es válido.
    me: async () => {
      const token = getToken();
      const cached = getStoredMaestro();
      if (!token || !cached) {
        const err = new Error("No autenticado");
        err.status = 401;
        throw err;
      }
      try {
        const fresh = await request(
          ALUMNOS_API_URL,
          `/api/maestros/${cached.id}`,
          {
            auth: true,
          },
        );
        const maestro = {
          id: fresh.id,
          nombre: fresh.nombre,
          correo: fresh.correo,
        };
        localStorage.setItem(MAESTRO_KEY, JSON.stringify(maestro));
        return maestro;
      } catch (err) {
        if (err.status === 401 || err.status === 403 || err.status === 404) {
          clearSession();
        }
        throw err;
      }
    },

    loginViaEmailPassword: async (email, password) => {
      const data = await request(AUTH_API_URL, "/login", {
        method: "POST",
        body: { correo: email, password },
      });
      setSession(data.token, data.maestro);
      return data.maestro;
    },

    // El backend no tiene integración con Google OAuth: se avisa en vez
    // de simular una sesión falsa.
    loginWithProvider: async () => {
      window.alert(
        "El inicio de sesión con Google no está disponible en este backend todavía. Usa tu correo y contraseña.",
      );
    },

    register: async ({ email, password }) => {
      const nombre = email.split("@")[0];
      const data = await request(AUTH_API_URL, "/register", {
        method: "POST",
        body: { nombre, correo: email, password },
      });
      pendingRegistration = { correo: email, password };
      return data;
    },

    // El backend no valida un código real: como ya creamos la cuenta en
    // "register", aquí solo iniciamos sesión con esas credenciales.
    verifyOtp: async ({ email, otpCode }) => {
      if (!otpCode || otpCode.length < 6) {
        throw new Error("Código de verificación inválido");
      }
      const creds =
        pendingRegistration?.correo === email ? pendingRegistration : null;
      if (!creds) {
        throw new Error("La sesión de registro expiró, vuelve a intentarlo.");
      }
      const data = await request(AUTH_API_URL, "/login", {
        method: "POST",
        body: { correo: creds.correo, password: creds.password },
      });
      setSession(data.token, data.maestro);
      pendingRegistration = null;
      return { access_token: data.token };
    },

    // No hay servicio de correo real: no falla, solo no reenvía nada.
    resendOtp: async () => true,

    setToken: (token) => {
      localStorage.setItem(TOKEN_KEY, token);
    },

    // No hay endpoint de recuperación de contraseña en el backend.
    resetPasswordRequest: async () => true,
    resetPassword: async () => {
      throw new Error(
        "El restablecimiento de contraseña aún no está disponible en este backend.",
      );
    },

    redirectToLogin: () => {
      window.location.href = "/login";
    },

    logout: async () => {
      clearSession();
      window.location.href = "/login";
    },
  },

  entities: {
    Alumno: {
      list: async (sort) => {
        const rows = await request(ALUMNOS_API_URL, "/api/alumnos", {
          auth: true,
        });
        return sortBy(rows.map(backendToFrontAlumno), sort);
      },
      filter: async (filters = {}, sort) => {
        const rows = await request(ALUMNOS_API_URL, "/api/alumnos", {
          auth: true,
        });
        let list = rows.map(backendToFrontAlumno);
        if (filters.id_maestro !== undefined) {
          list = list.filter(
            (a) => String(a.id_maestro) === String(filters.id_maestro),
          );
        }
        return sortBy(list, sort);
      },
      get: async (id) => {
        const row = await request(ALUMNOS_API_URL, `/api/alumnos/${id}`, {
          auth: true,
        });
        return backendToFrontAlumno(row);
      },
      create: async (data) => {
        const row = await request(ALUMNOS_API_URL, "/api/alumnos", {
          method: "POST",
          auth: true,
          body: frontToBackendAlumno(data),
        });
        return backendToFrontAlumno(row);
      },
      update: async (id, data) => {
        const row = await request(ALUMNOS_API_URL, `/api/alumnos/${id}`, {
          method: "PUT",
          auth: true,
          body: frontToBackendAlumno(data),
        });
        return backendToFrontAlumno(row);
      },
      delete: async (id) => {
        await request(ALUMNOS_API_URL, `/api/alumnos/${id}`, {
          method: "DELETE",
          auth: true,
        });
        return true;
      },
    },

    Actividad: {
      list: async () => request(ACTIVIDADES_API_URL, "/api/actividades"),
      filter: async (filters = {}) => {
        const rows = await request(ACTIVIDADES_API_URL, "/api/actividades");
        if (!filters.nivel) return rows;
        const backendNivel =
          NIVEL_FRONT_TO_BACK[filters.nivel] || filters.nivel;
        return rows.filter((a) => a.nivel === backendNivel);
      },
      get: async (id) => request(ACTIVIDADES_API_URL, `/api/actividades/${id}`),
      create: async (data) => {
        const backendNivel = NIVEL_FRONT_TO_BACK[data.nivel] || data.nivel;
        return request(ACTIVIDADES_API_URL, "/api/actividades", {
          method: "POST",
          auth: true,
          body: {
            titulo: data.titulo,
            nivel: backendNivel,
            subseccion: data.subseccion,
            instrucciones: data.instrucciones,
            ejercicios: data.ejercicios,
          },
        });
      },
    },

    IntentoActividad: {
      filter: async (filters = {}, sort) => {
        const rows = await request(
          ACTIVIDADES_API_URL,
          "/api/intentos-actividades",
        );
        let list = rows.map(backendToFrontIntento);
        if (filters.alumno_id !== undefined) {
          list = list.filter(
            (i) => String(i.alumno_id) === String(filters.alumno_id),
          );
        }
        if (filters.actividad_id !== undefined) {
          list = list.filter(
            (i) => String(i.actividad_id) === String(filters.actividad_id),
          );
        }
        return sortBy(list, sort || "-fecha");
      },
      create: async (data) => {
        const row = await request(
          ACTIVIDADES_API_URL,
          "/api/intentos-actividades",
          {
            method: "POST",
            body: {
              id_alumno: Number(data.alumno_id),
              id_actividad: Number(data.actividad_id),
              puntaje: Number(data.puntaje),
            },
          },
        );
        return backendToFrontIntento(row);
      },
    },

    Condicion: {
      list: async () => CONDICIONES,
    },
  },

  analytics: {
    track: () => {},
  },
};

export const createClient = () => apiClient;
