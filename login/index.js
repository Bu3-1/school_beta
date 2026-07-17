import "dotenv/config";
import express from "express";
import cors from "cors";
import { login, registrarMaestro } from "./controllers/auth.controller.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/login", login);
app.post("/register", registrarMaestro);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Servicio de login corriendo en puerto ${PORT}`),
);
