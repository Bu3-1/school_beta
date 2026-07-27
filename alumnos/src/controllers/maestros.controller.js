import prisma from "../lib/prisma";

export const getMaestros = async (req, res) => {
  try {
    const data = await prisma.maestros.findMany({
      select: { id: true, nombre: true, correo: true },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMaestroById = async (req, res) => {
  try {
    const data = await prisma.maestros.findUnique({
      where: { id: Number(req.params.id) },
      select: { id: true, nombre: true, correo: true },
    });
    if (!data) return res.status(404).json({ error: "No encontrado" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMaestro = async (req, res) => {
  try {
    const { nombre, correo } = req.body;
    const data = await prisma.maestros.update({
      where: { id: Number(req.params.id) },
      data: { nombre, correo },
    });
    res.json({ id: data.id, nombre: data.nombre, correo: data.correo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteMaestro = async (req, res) => {
  try {
    await prisma.maestros.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
