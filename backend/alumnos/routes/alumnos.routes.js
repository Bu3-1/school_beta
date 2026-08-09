import { Router } from "express";
import {
  getAlumnos,
  getAlumnoById,
  createAlumno,
  updateAlumno,
  deleteAlumno,
  getReporteAlumnos,
  getHistorialAlumno,
} from "../controllers/alumnos.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.use(requireAuth);

router.get("/reporte", getReporteAlumnos);
router.get("/:id_alumno/historial", getHistorialAlumno);

router.get("/", getAlumnos);
router.get("/:id", getAlumnoById);
router.post("/", createAlumno);
router.put("/:id", updateAlumno);
router.delete("/:id", deleteAlumno);

export default router;
