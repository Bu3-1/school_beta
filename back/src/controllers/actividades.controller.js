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
    const { titulo, nivel } = req.body;
    const data = await prisma.actividades.create({ data: { titulo, nivel } });
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
