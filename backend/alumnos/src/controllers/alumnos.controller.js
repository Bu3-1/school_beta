import prisma from "../lib/prisma.js";
import prismaReadOnly from "../lib/prismaReadOnly.js";

export const getAlumnos = async (req, res) => {
  try {
    const data = await prisma.alumnos.findMany({
      where: { id_maestro: req.maestro.id }, // usando el id del token, no de query params
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAlumnoById = async (req, res) => {
  try {
    const data = await prismaReadOnly.alumnos.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!data) return res.status(404).json({ error: "Alumno no encontrado" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createAlumno = async (req, res) => {
  try {
    const { nombre_anonimanizado, edad, grado, grupo, condicion, id_maestro } =
      req.body;
    const data = await prisma.alumnos.create({
      data: {
        nombre_anonimanizado,
        edad: Number(edad),
        grado: Number(grado),
        grupo,
        condicion,
        id_maestro: Number(id_maestro),
      },
    });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAlumno = async (req, res) => {
  try {
    const { nombre_anonimanizado, edad, grado, grupo, condicion, id_maestro } =
      req.body;
    const data = await prisma.alumnos.update({
      where: { id: Number(req.params.id) },
      data: {
        ...(nombre_anonimanizado && { nombre_anonimanizado }),
        ...(edad !== undefined && { edad: Number(edad) }),
        ...(grado !== undefined && { grado: Number(grado) }),
        ...(grupo && { grupo }),
        ...(condicion && { condicion }),
        ...(id_maestro !== undefined && { id_maestro: Number(id_maestro) }),
      },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAlumno = async (req, res) => {
  try {
    await prisma.alumnos.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getReporteAlumnos = async (req, res) => {
  try {
    const data = await prismaReadOnly.$queryRaw`
      SELECT * FROM vista_estadisticas_alumnos;
    `;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getHistorialAlumno = async (req, res) => {
  const { id_alumno } = req.params;

  try {
    const intentos = await prismaReadOnly.intentos_actividades.findMany({
      where: { id_alumno: Number(id_alumno) },
      orderBy: { fecha: "desc" },
      include: {
        actividades: {
          select: {
            titulo: true,
            nivel: true,
          },
        },
      },
    });

    const historial = intentos.map((intento) => ({
      id_intento: intento.id,
      actividad: intento.actividades?.titulo || "Actividad Desconocida",
      nivel: intento.actividades?.nivel || "N/A",
      puntaje: intento.puntaje,
      fecha: intento.fecha,
    }));

    res.json(historial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
