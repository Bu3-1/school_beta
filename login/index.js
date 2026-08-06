import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path"; // 👈 1. Importas path
import { fileURLToPath } from "url";
import { login, registrarMaestro } from "./auth.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// 👈 2. Le dices a Express que sirva el index.html
app.use(express.static(__dirname));

app.post("/login", login);
app.post("/register", registrarMaestro);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servicio de login corriendo en puerto ${PORT}`);
});
