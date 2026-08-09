import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Star,
  Clock,
  Trash2,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import moment from "moment";
import { apiClient } from "@/api/apiClient";
import { toast } from "@/components/ui/use-toast";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
};

export default function ActividadCard({
  actividad,
  intentos = [],
  onIniciar,
  onActividadEliminada,
}) {
  const ultimoIntento = intentos[0];
  const [openDelete, setOpenDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      await apiClient.entities.Actividad.delete(actividad.id);
      toast({
        title: "Actividad eliminada",
        description: `"${actividad.titulo}" se eliminó correctamente`,
      });
      setOpenDelete(false);
      onActividadEliminada?.(actividad.id);
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "No se pudo eliminar la actividad",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -4 }}
        className="bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col"
      >
        <div className="flex items-start gap-4 flex-1">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
            {actividad.icono || "📚"}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-foreground">
              {actividad.titulo}
            </h3>
            {actividad.descripcion && (
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                {actividad.descripcion}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenDelete(true);
            }}
            className="flex-shrink-0 p-1.5 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            title="Eliminar actividad"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {ultimoIntento && (
          <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-[#C4A570]" />
              Último puntaje: {ultimoIntento.puntaje}/100
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {moment(ultimoIntento.fecha).fromNow()}
            </span>
          </div>
        )}

        <button
          onClick={onIniciar}
          className="mt-4 w-full py-2.5 rounded-xl bg-primary/10 text-primary font-medium text-sm hover:bg-primary/15 transition-colors flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4" />
          Iniciar actividad
        </button>
      </motion.div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {openDelete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
                onClick={() => !deleting && setOpenDelete(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-sm bg-card border border-border rounded-2xl p-6 shadow-2xl"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">
                        ¿Eliminar "{actividad.titulo}"?
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Esta acción no se puede deshacer.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setOpenDelete(false)}
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
                        <Loader2 className="w-4 h-4 animate-spin" />
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
