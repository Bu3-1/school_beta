import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { login, registrarMaestro, googleLogin } from "./auth.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname));

app.post("/login", login);
app.post("/register", registrarMaestro);
app.post("/google-login", googleLogin);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servicio de login corriendo en puerto ${PORT}`);
});
