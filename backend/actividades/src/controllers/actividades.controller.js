import prisma from "../lib/prisma.js";

export const getActividades = async (req, res) => {
  try {
    const data = await prisma.actividades.findMany();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getActividadById = async (req, res) => {
  try {
    const data = await prisma.actividades.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!data) return res.status(404).json({ error: "No encontrado" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createActividad = async (req, res) => {
  try {
    const { titulo, nivel, subseccion, instrucciones, ejercicios } = req.body;
    const data = await prisma.actividades.create({
      data: { titulo, nivel, subseccion, instrucciones, ejercicios },
    });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateActividad = async (req, res) => {
  try {
    const { titulo, nivel } = req.body;
    const data = await prisma.actividades.update({
      where: { id: Number(req.params.id) },
      data: { titulo, nivel },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteActividad = async (req, res) => {
  try {
    await prisma.actividades.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- REPORTES PARA EL MAESTRO ---

export const getReporteAlumnos = async (req, res) => {
  try {
    const alumnos = await prisma.alumnos.findMany();

    const reporte = await Promise.all(
      alumnos.map(async (alumno) => {
        const intentos = await prisma.intentos_actividades.findMany({
          where: { id_alumno: alumno.id },
          orderBy: { fecha: "desc" },
        });

        const totalIntentos = intentos.length;
        const sumaPuntajes = intentos.reduce(
          (acc, curr) => acc + curr.puntaje,
          0,
        );
        const promedioGeneral =
          totalIntentos > 0 ? Math.round(sumaPuntajes / totalIntentos) : 0;

        return {
          id_alumno: alumno.id,
          nombre_anonimanizado: alumno.nombre_anonimanizado,
          grado: alumno.grado,
          grupo: alumno.grupo,
          condicion: alumno.condicion,
          total_intentos: totalIntentos,
          promedio_general: promedioGeneral,
          ultima_actividad: totalIntentos > 0 ? intentos[0].fecha : null,
        };
      }),
    );

    res.json(reporte);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getHistorialAlumno = async (req, res) => {
  const { id_alumno } = req.params;

  try {
    const intentos = await prisma.intentos_actividades.findMany({
      where: { id_alumno: Number(id_alumno) },
      orderBy: { fecha: "desc" },
    });

    const historial = await Promise.all(
      intentos.map(async (intento) => {
        const actividad = await prisma.actividades.findUnique({
          where: { id: intento.id_actividad },
        });

        return {
          id_intento: intento.id,
          actividad: actividad ? actividad.titulo : "Actividad Desconocida",
          nivel: actividad ? actividad.nivel : "N/A",
          puntaje: intento.puntaje,
          fecha: intento.fecha,
        };
      }),
    );

    res.json(historial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
