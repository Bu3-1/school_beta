import prisma from "../lib/prisma.js";
import prismaReadOnly from "../lib/prismaReadOnly.js";

export const getIntentos = async (req, res) => {
  try {
    const data = await prismaReadOnly.intentos_actividades.findMany({
      orderBy: { fecha: "desc" },
      include: {
        alumnos: {
          select: {
            id: true,
            nombre_anonimanizado: true,
            grado: true,
            grupo: true,
          },
        },
        actividades: {
          select: {
            id: true,
            titulo: true,
            nivel: true,
          },
        },
      },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getIntentoById = async (req, res) => {
  try {
    const data = await prismaReadOnly.intentos_actividades.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        alumnos: {
          select: {
            id: true,
            nombre_anonimanizado: true,
            grado: true,
            grupo: true,
          },
        },
        actividades: {
          select: {
            id: true,
            titulo: true,
            nivel: true,
          },
        },
      },
    });

    if (!data) return res.status(404).json({ error: "Intento no encontrado" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createIntento = async (req, res) => {
  try {
    const { id_alumno, id_actividad, puntaje } = req.body;

    if (!id_alumno || !id_actividad || puntaje === undefined) {
      return res.status(400).json({
        error: "Faltan campos requeridos: id_alumno, id_actividad o puntaje",
      });
    }

    const resultado = await prisma.$queryRaw`
      CALL sp_registrar_intento(
        ${Number(id_alumno)},
        ${Number(id_actividad)},
        ${Number(puntaje)},
        NULL
      );
    `;

    res.status(201).json({
      mensaje: "Intento registrado correctamente",
      detalles: resultado,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateIntento = async (req, res) => {
  try {
    const { id_alumno, id_actividad, puntaje } = req.body;

    const data = await prisma.intentos_actividades.update({
      where: { id: Number(req.params.id) },
      data: {
        ...(id_alumno && { id_alumno: Number(id_alumno) }),
        ...(id_actividad && { id_actividad: Number(id_actividad) }),
        ...(puntaje !== undefined && { puntaje: Number(puntaje) }),
      },
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteIntento = async (req, res) => {
  try {
    await prisma.intentos_actividades.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBitacoraIntentos = async (req, res) => {
  try {
    const data = await prismaReadOnly.bitacora_intentos.findMany({
      orderBy: { fecha_registro: "desc" },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
