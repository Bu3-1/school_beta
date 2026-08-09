import { Router } from "express";
import {
  getActividades,
  getActividadById,
  createActividad,
  updateActividad,
  deleteActividad,
  getReporteActividades,
} from "../src/controllers/actividades.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

// Rutas de reporte para el maestro
router.get("/reporte", getReporteActividades);
// router.get("/reportes/alumnos", getReporteAlumnos);
// router.get("/reportes/alumno/:id_alumno", getHistorialAlumno);

// Rutas del CRUD de actividades
router.get("/", getActividades);
router.get("/:id", getActividadById);
router.post("/", requireAuth, createActividad);
router.put("/:id", requireAuth, updateActividad);
router.delete("/:id", requireAuth, deleteActividad);

export default router;
