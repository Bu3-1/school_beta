import React from "react";
import { motion } from "framer-motion";
import { Play, Star, Clock } from "lucide-react";
import moment from "moment";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
};

export default function ActividadCard({ actividad, intentos = [], onIniciar }) {
  const ultimoIntento = intentos[0];

  return (
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
  );
}
