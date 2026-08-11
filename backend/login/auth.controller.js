import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
import prisma from "./src/lib/prisma.js";
import { signToken } from "./src/lib/jwt.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "El token de Google es requerido" });
    }

    // 1. Verificar el token con Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email: correo, name: nombre } = payload;

    // 2. Buscar si el maestro ya existe
    let maestro = await prisma.maestros.findUnique({ where: { correo } });

    // 3. Si no existe, crearlo (Registro automático)
    if (!maestro) {
      maestro = await prisma.maestros.create({
        data: {
          nombre: nombre || "Maestro Google",
          correo,
          password: "", // Los usuarios autenticados con OAuth no requieren contraseña local
        },
      });
    }

    // 4. Generar el JWT propio de la app
    const jwtToken = signToken({ id: maestro.id, correo: maestro.correo });

    res.json({
      token: jwtToken,
      maestro: {
        id: maestro.id,
        nombre: maestro.nombre,
        correo: maestro.correo,
      },
    });
  } catch (err) {
    res.status(401).json({ error: "Token de Google inválido o expirado" });
  }
};
