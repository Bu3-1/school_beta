import prisma from "../lib/prisma.js";
import prismaReadOnly from "../lib/prismaReadOnly.js";

export const getActividades = async (req, res) => {
  try {
    const data = await prismaReadOnly.actividades.findMany({
      select: {
        id: true,
        titulo: true,
        nivel: true,
        subseccion: true,
        instrucciones: true,
      },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getActividadById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const actividad = await prismaReadOnly.actividades.findUnique({
      where: { id },
      select: {
        id: true,
        titulo: true,
        nivel: true,
        subseccion: true,
        instrucciones: true,
        historia: true,
      },
    });
    if (!actividad)
      return res.status(404).json({ error: "Actividad no encontrada" });

    const preguntas = await prismaReadOnly.preguntas.findMany({
      where: { id_actividad: id },
      orderBy: { num_pregunta: "asc" },
    });

    actividad.preguntas = preguntas.map((p) => ({
      q: p.enunciado,
      correcta: p.respuesta_correcta,
      opciones: p.opciones,
    }));

    res.json(actividad);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createActividad = async (req, res) => {
  try {
    const { titulo, nivel, subseccion, instrucciones, historia, preguntas } =
      req.body;
    const actividad = await prisma.$transaction(async (tx) => {
      const nueva = await tx.actividades.create({
        data: {
          titulo,
          nivel,
          subseccion,
          instrucciones,
          historia: historia ?? null,
        },
      });
      if (preguntas?.length) {
        await tx.preguntas.createMany({
          data: preguntas.map((p, i) => ({
            id_actividad: nueva.id,
            num_pregunta: i + 1,
            enunciado: p.q,
            respuesta_correcta: p.correcta,
            opciones: p.opciones,
          })),
        });
      }
      return nueva;
    });
    res.status(201).json(actividad);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateActividad = async (req, res) => {
  try {
    const { titulo, nivel, subseccion, instrucciones, historia } = req.body;
    const data = await prisma.actividades.update({
      where: { id: Number(req.params.id) },
      data: {
        ...(titulo && { titulo }),
        ...(nivel && { nivel }),
        ...(subseccion !== undefined && { subseccion }),
        ...(instrucciones !== undefined && { instrucciones }),
        ...(historia !== undefined && { historia }),
      },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteActividad = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const tieneIntentos = await prisma.intentos_actividades.count({
      where: { id_actividad: id },
    });
    if (tieneIntentos > 0) {
      return res.status(409).json({
        error: "No se puede eliminar: la actividad tiene intentos registrados",
      });
    }
    await prisma.actividades.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//reportes

export const getReporteActividades = async (req, res) => {
  try {
    const data =
      await prismaReadOnly.$queryRaw`SELECT * FROM vista_estadisticas_actividades;`;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
