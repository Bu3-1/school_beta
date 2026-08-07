import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Pencil } from "lucide-react";
import EditarAlumnoModal from "@/components/EditarAlumnoModal";

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
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const emoji = AVATAR_EMOJIS[index % AVATAR_EMOJIS.length];

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
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="group relative text-left w-full bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
            {emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-foreground truncate group-hover:text-[#3B0A5E] dark:group-hover:text-purple-300 transition-colors">
              {alumno.nombre_anonimizado || alumno.nombre}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {alumno.edad} años · {alumno.grado ? `${alumno.grado}° · ` : ""}
              {alumno.grupo
                ? `Grupo ${alumno.grupo}`
                : alumno.grado_grupo || "Sin grupo"}
            </p>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0 mt-0.5">
            {/* Botón Editar (Lápiz) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // Evita redirigir al hacer clic en editar
                setOpenEdit(true);
              }}
              className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
              title="Editar alumno"
            >
              <Pencil className="w-4 h-4" />
            </button>

            {/* Flecha ir a actividades */}
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all ml-1" />
          </div>
        </div>

        {/* Etiquetas de condiciones / diagnósticos */}
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
    </>
  );
}
