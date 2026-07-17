import prisma from "../lib/prisma.js";

export const getIntentos = async (req, res) => {
  try {
    const data = await prisma.intentos_actividades.findMany();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getIntentoById = async (req, res) => {
  try {
    const data = await prisma.intentos_actividades.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!data) return res.status(404).json({ error: "No encontrado" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createIntento = async (req, res) => {
  try {
    const { id_alumno, id_actividad, puntaje } = req.body;
    const data = await prisma.intentos_actividades.create({
      data: { id_alumno, id_actividad, puntaje },
    });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateIntento = async (req, res) => {
  try {
    const { id_alumno, id_actividad, puntaje } = req.body;
    const data = await prisma.intentos_actividades.update({
      where: { id: Number(req.params.id) },
      data: { id_alumno, id_actividad, puntaje },
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
