import { Router } from "express";
import {
  getIntentos,
  getIntentoById,
  createIntento,
  updateIntento,
  deleteIntento,
  getBitacoraIntentos,
} from "../src/controllers/intentosActividades.controller.js";

const router = Router();

router.get("/bitacora", getBitacoraIntentos);
router.get("/", getIntentos);
router.get("/:id", getIntentoById);
router.post("/", createIntento);
router.put("/:id", updateIntento);
router.delete("/:id", deleteIntento);

export default router;
