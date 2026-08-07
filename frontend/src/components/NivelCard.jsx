import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const NIVEL_STYLES = {
  Presilábica: {
    bg: "bg-[#E8F0E5] dark:bg-emerald-950/30",
    border: "border-[#C5DBC0] dark:border-emerald-800/40",
    title: "text-[#4A6B45] dark:text-emerald-300",
    desc: "text-[#6A8E5A] dark:text-emerald-400/80",
    hoverBorder: "hover:border-[#9AC48E] dark:hover:border-emerald-500/60",
  },
  Silábica: {
    bg: "bg-[#EDE8F2] dark:bg-purple-950/30",
    border: "border-[#D0C5E0] dark:border-purple-800/40",
    title: "text-[#5A4D78] dark:text-purple-300",
    desc: "text-[#7A6B98] dark:text-purple-400/80",
    hoverBorder: "hover:border-[#B5A3D0] dark:hover:border-purple-500/60",
  },
  "Silábico-Alfabética": {
    bg: "bg-[#F2E8E8] dark:bg-rose-950/30",
    border: "border-[#E0C5C5] dark:border-rose-800/40",
    title: "text-[#785050] dark:text-rose-300",
    desc: "text-[#987070] dark:text-rose-400/80",
    hoverBorder: "hover:border-[#D0A0A0] dark:hover:border-rose-500/60",
  },
  Alfabética: {
    bg: "bg-[#E8F0F0] dark:bg-cyan-950/30",
    border: "border-[#C5DBDB] dark:border-cyan-800/40",
    title: "text-[#4A6B6B] dark:text-cyan-300",
    desc: "text-[#6A8E8E] dark:text-cyan-400/80",
    hoverBorder: "hover:border-[#9AC4C4] dark:hover:border-cyan-500/60",
  },
};

const NIVEL_INFO = {
  Presilábica: {
    emoji: "✏️",
    descripcion:
      "Reconoce letras pero no asocia sonidos. Garabatea y copia signos.",
  },
  Silábica: {
    emoji: "🔤",
    descripcion:
      "Cada letra representa una sílaba. Empieza a relacionar sonidos con grafías.",
  },
  "Silábico-Alfabética": {
    emoji: "📖",
    descripcion:
      "Etapa de transición. Combina hipótesis silábica y alfabética.",
  },
  Alfabética: {
    emoji: "🎯",
    descripcion:
      "Comprende que cada letra tiene un sonido. Lee palabras completas.",
  },
};

export default function NivelCard({ nivel, onClick }) {
  const style = NIVEL_STYLES[nivel] || NIVEL_STYLES.Presilábica;
  const info = NIVEL_INFO[nivel] || {};

  return (
    <motion.button
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 260, damping: 22 },
        },
      }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative text-left p-6 rounded-2xl border-2 ${style.bg} ${style.border} ${style.hoverBorder} transition-all overflow-hidden cursor-pointer`}
    >
      <div className="text-4xl mb-3">{info.emoji}</div>
      <h3 className={`font-heading font-semibold text-lg ${style.title}`}>
        {nivel}
      </h3>
      <p className={`text-sm mt-1.5 leading-relaxed ${style.desc}`}>
        {info.descripcion}
      </p>
      <div
        className={`mt-4 flex items-center gap-1.5 text-sm font-medium ${style.title}`}
      >
        Ver actividades
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.button>
  );
}
