import { Router } from "express";
import {
  getAlumnos,
  getAlumnoById,
  createAlumno,
  updateAlumno,
  deleteAlumno,
} from "../controllers/alumnos.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", requireAuth, getAlumnos);
router.get("/:id", requireAuth, getAlumnoById);
router.post("/", requireAuth, createAlumno);
router.put("/:id", requireAuth, updateAlumno);
router.delete("/:id", requireAuth, deleteAlumno);

export default router;
