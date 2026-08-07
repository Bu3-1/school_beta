import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, UserCheck } from "lucide-react";
import { apiClient } from "@/api/apiClient";

const CONDICIONES_OPCIONES = [
  "Ninguna",
  "Disgrafía",
  "TDAH",
  "Trastorno del Espectro Autista",
  "Dislexia",
];

export default function EditarAlumnoModal({
  isOpen,
  onClose,
  alumno,
  onAlumnoActualizado,
}) {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [gradoGrupo, setGradoGrupo] = useState("");
  const [condicion, setCondicion] = useState("Ninguna");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (alumno) {
      setNombre(alumno.nombre_anonimizado || alumno.nombre || "");
      setEdad(alumno.edad || "");
      setGradoGrupo(alumno.grado_grupo || "");
      const condActual = Array.isArray(alumno.condiciones)
        ? alumno.condiciones[0]
        : alumno.condicion || "Ninguna";
      setCondicion(condActual);
    }
  }, [alumno]);

  if (!isOpen || !alumno) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const datosActualizados = {
        nombre_anonimizado: nombre,
        edad: Number(edad),
        grado_grupo: gradoGrupo,
        condiciones: [condicion],
      };

      await apiClient.entities.Alumno.update(alumno.id, datosActualizados);

      if (onAlumnoActualizado) {
        onAlumnoActualizado({ ...alumno, ...datosActualizados });
      }
      onClose();
    } catch (err) {
      console.error("Error al actualizar alumno:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-card border border-border w-full max-w-md rounded-3xl p-6 shadow-xl relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-muted-foreground hover:bg-secondary cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-purple-500/10 text-[#3B0A5E] dark:text-purple-300">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-foreground">
                Editar Alumno
              </h3>
              <p className="text-xs text-muted-foreground">
                Actualiza los datos de{" "}
                {alumno.nombre_anonimizado || alumno.nombre}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                Nombre / Seudónimo
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="w-full p-3 rounded-2xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#3B0A5E]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                  Edad
                </label>
                <input
                  type="number"
                  value={edad}
                  onChange={(e) => setEdad(e.target.value)}
                  required
                  min="3"
                  max="15"
                  className="w-full p-3 rounded-2xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#3B0A5E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                  Grado y Grupo
                </label>
                <input
                  type="text"
                  placeholder="Ej. 3° Grupo A"
                  value={gradoGrupo}
                  onChange={(e) => setGradoGrupo(e.target.value)}
                  required
                  className="w-full p-3 rounded-2xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#3B0A5E]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                Condición / Diagnóstico
              </label>
              <select
                value={condicion}
                onChange={(e) => setCondicion(e.target.value)}
                className="w-full p-3 rounded-2xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#3B0A5E]"
              >
                {CONDICIONES_OPCIONES.map((opcion) => (
                  <option key={opcion} value={opcion}>
                    {opcion}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-2xl bg-secondary text-foreground text-xs font-semibold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#3B0A5E] hover:bg-[#4A1D6D] text-white text-xs font-semibold shadow-xs cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Guardar Cambios"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
