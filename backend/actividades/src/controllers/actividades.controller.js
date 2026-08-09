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
    if (preguntas[0]?.historia) actividad.historia = preguntas[0].historia;

    res.json(actividad);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createActividad = async (req, res) => {
  try {
    const { titulo, nivel, subseccion, instrucciones, preguntas } = req.body;
    const actividad = await prisma.$transaction(async (tx) => {
      const nueva = await tx.actividades.create({
        data: { titulo, nivel, subseccion, instrucciones },
      });
      if (preguntas?.length) {
        await tx.preguntas.createMany({
          data: preguntas.map((p, i) => ({
            id_actividad: nueva.id,
            num_pregunta: i + 1,
            enunciado: p.q,
            respuesta_correcta: p.correcta,
            opciones: p.opciones,
            historia: p.historia ?? null,
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
    const { titulo, nivel, subseccion, instrucciones } = req.body;
    const data = await prisma.actividades.update({
      where: { id: Number(req.params.id) },
      data: {
        ...(titulo && { titulo }),
        ...(nivel && { nivel }),
        ...(subseccion !== undefined && { subseccion }),
        ...(instrucciones !== undefined && { instrucciones }),
      },
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
