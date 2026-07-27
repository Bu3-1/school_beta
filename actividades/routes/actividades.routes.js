import { Router } from "express";
import {
  getActividades,
  getActividadById,
  createActividad,
  updateActividad,
  deleteActividad,
} from "../controllers/actividades.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", requireAuth, getActividades);
router.get("/:id", requireAuth, getActividadById);
router.post("/", requireAuth, createActividad);
router.put("/:id", requireAuth, updateActividad);
router.delete("/:id", requireAuth, deleteActividad);

export default router;
