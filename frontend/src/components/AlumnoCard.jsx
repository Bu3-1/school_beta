import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Pencil,
  Trash2,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import EditarAlumnoModal from "@/components/EditarAlumnoModal";
import { apiClient } from "@/api/apiClient";
import { toast } from "@/components/ui/use-toast";

const AVATAR_EMOJIS = [
  "🐱",
  "🌟",
  "🦊",
  "🌈",
  "🦉",
  "🐰",
  "🦁",
  "🦋",
  "🐼",
  "🐨",
  "🌷",
  "⚡",
  "🍀",
  "👾",
];

export default function AlumnoCard({
  alumno,
  index,
  onClick,
  onAlumnoActualizado,
  onAlumnoEliminado,
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const emoji = AVATAR_EMOJIS[index % AVATAR_EMOJIS.length];

  const nombreMostrado =
    alumno.nombre_anonimizado || alumno.nombre_anonimanizado || alumno.nombre;

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenEdit(true);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDelete(true);
  };

  const handleConfirmDelete = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setDeleting(true);
    try {
      await apiClient.entities.Alumno.delete(alumno.id);
      toast({
        title: "Alumno eliminado",
        description: `"${nombreMostrado}" se eliminó correctamente`,
      });
      setOpenDelete(false);
      onAlumnoEliminado?.(alumno.id);
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "No se pudo eliminar al alumno",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 260, damping: 22 },
          },
        }}
        whileHover={{ y: -4 }}
        onClick={onClick}
        className="group relative text-left w-full bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
            {emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-foreground truncate group-hover:text-[#3B0A5E] dark:group-hover:text-purple-300 transition-colors">
              {nombreMostrado}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {alumno.edad} años · {alumno.grado ? `${alumno.grado}° · ` : ""}
              {alumno.grupo
                ? `Grupo ${alumno.grupo}`
                : alumno.grado_grupo || "Sin grupo"}
            </p>
          </div>

          <div
            className="flex items-center gap-1 flex-shrink-0 mt-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón Editar */}
            <button
              type="button"
              onClick={handleEditClick}
              className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
              title="Editar alumno"
            >
              <Pencil className="w-4 h-4" />
            </button>

            {/* Botón Eliminar */}
            <button
              type="button"
              onClick={handleDeleteClick}
              className="p-1.5 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
              title="Eliminar alumno"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {/* Flecha ir a actividades */}
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all ml-1" />
          </div>
        </div>

        {/* Etiquetas de condiciones */}
        {((alumno.condiciones && alumno.condiciones.length > 0) ||
          alumno.condicion) && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {(alumno.condiciones || [alumno.condicion]).map((c) => (
              <span
                key={c}
                className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
              >
                {c}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      {/* Modal de edición */}
      <EditarAlumnoModal
        isOpen={openEdit}
        onClose={() => setOpenEdit(false)}
        alumno={alumno}
        onAlumnoActualizado={onAlumnoActualizado}
      />

      {/* Modal de confirmación enviado directamente al document.body */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {openDelete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!deleting) setOpenDelete(false);
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-sm bg-card border border-border rounded-2xl p-6 shadow-2xl relative z-[10000]"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold text-foreground">
                        ¿Eliminar a {nombreMostrado}?
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Esta acción no se puede deshacer. Se eliminará al alumno
                        junto con sus datos registrados.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDelete(false);
                      }}
                      disabled={deleting}
                      className="flex-1 h-11 rounded-xl border border-border text-foreground font-medium hover:bg-secondary transition-colors disabled:opacity-50"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmDelete}
                      disabled={deleting}
                      className="flex-1 h-11 rounded-xl bg-destructive text-destructive-foreground font-medium hover:bg-destructive/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {deleting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Eliminando...
                        </>
                      ) : (
                        "Eliminar"
                      )}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
