import { Router } from "express";
import {
  getIntentos,
  getIntentoById,
  createIntento,
  updateIntento,
  deleteIntento,
} from "../controllers/intentosActividades.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", requireAuth, getIntentos);
router.get("/:id", requireAuth, getIntentoById);
router.post("/", requireAuth, createIntento);
router.put("/:id", requireAuth, updateIntento);
router.delete("/:id", requireAuth, deleteIntento);

export default router;
