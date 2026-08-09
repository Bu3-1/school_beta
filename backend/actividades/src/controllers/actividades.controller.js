import prisma from "../lib/prisma.js";
import prismaReadOnly from "../lib/prismaReadOnly.js";

export const getActividades = async (req, res) => {
  try {
    const data = await prismaReadOnly.actividades.findMany();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getActividadById = async (req, res) => {
  try {
    const data = await prismaReadOnly.actividades.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!data)
      return res.status(404).json({ error: "Actividad no encontrada" });
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
    const { titulo, nivel, subseccion, instrucciones, ejercicios } = req.body;
    const data = await prisma.actividades.update({
      where: { id: Number(req.params.id) },
      data: {
        ...(titulo && { titulo }),
        ...(nivel && { nivel }),
        ...(subseccion !== undefined && { subseccion }),
        ...(instrucciones !== undefined && { instrucciones }),
        ...(ejercicios !== undefined && { ejercicios }),
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
    const data = await prismaReadOnly.$queryRaw`
      SELECT * FROM vista_estadisticas_actividades;
    `;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
