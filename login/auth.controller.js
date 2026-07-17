import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import { signToken } from "../lib/jwt.js";

export const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res
        .status(400)
        .json({ error: "Correo y password son requeridos" });
    }

    const maestro = await prisma.maestros.findUnique({ where: { correo } });

    if (!maestro) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const passwordValido = await bcrypt.compare(password, maestro.password);

    if (!passwordValido) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = signToken({ id: maestro.id, correo: maestro.correo });

    res.json({
      token,
      maestro: {
        id: maestro.id,
        nombre: maestro.nombre,
        correo: maestro.correo,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const registrarMaestro = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;

    if (!nombre || !correo || !password) {
      return res
        .status(400)
        .json({ error: "Nombre, correo y password son requeridos" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const maestro = await prisma.maestros.create({
      data: { nombre, correo, password: hashedPassword },
    });

    res
      .status(201)
      .json({ id: maestro.id, nombre: maestro.nombre, correo: maestro.correo });
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(409).json({ error: "El correo ya está registrado" });
    }
    res.status(500).json({ error: err.message });
  }
};
