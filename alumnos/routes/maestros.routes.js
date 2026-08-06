import { Router } from "express";
import {
  getMaestros,
  getMaestroById,
  updateMaestro,
  deleteMaestro,
} from "../src/controllers/maestros.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", requireAuth, getMaestros);
router.get("/:id", requireAuth, getMaestroById);
router.put("/:id", requireAuth, updateMaestro);
router.delete("/:id", requireAuth, deleteMaestro);

export default router;
