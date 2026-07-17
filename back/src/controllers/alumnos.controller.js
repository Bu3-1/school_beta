import prisma from "../lib/prisma.js";

export const getAlumnos = async (req, res) => {
  try {
    const data = await prisma.alumnos.findMany();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAlumnoById = async (req, res) => {
  try {
    const data = await prisma.alumnos.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!data) return res.status(404).json({ error: "No encontrado" });
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
      data: { nombre_anonimanizado, edad, grado, grupo, condicion, id_maestro },
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
      data: { nombre_anonimanizado, edad, grado, grupo, condicion, id_maestro },
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
