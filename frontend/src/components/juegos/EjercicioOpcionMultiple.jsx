import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export default function EjercicioOpcionMultiple({ ejercicio, onResolver }) {
  const [elegida, setElegida] = useState(null);

  const handleClick = (opcion) => {
    if (elegida) return;
    setElegida(opcion);
    const correcto = opcion === ejercicio.correcta;
    setTimeout(() => onResolver(correcto), 700);
  };

  return (
    <div>
      {ejercicio.contexto && (
        <div className="bg-secondary border border-border rounded-2xl p-5 mb-6 text-left">
          <p className="text-foreground leading-relaxed whitespace-pre-line">
            {ejercicio.contexto}
          </p>
        </div>
      )}

      {ejercicio.emoji && (
        <div className="text-6xl mb-3">{ejercicio.emoji}</div>
      )}

      {ejercicio.pista && (
        <div className="inline-block bg-accent/10 border border-accent/30 rounded-xl px-5 py-2 mb-4 font-heading text-2xl font-semibold tracking-widest text-foreground">
          {ejercicio.pista}
        </div>
      )}

      <p className="font-heading font-semibold text-lg text-foreground mb-5">
        {ejercicio.enunciado}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ejercicio.opciones.map((opcion) => {
          const esElegida = elegida === opcion;
          const esCorrecta = opcion === ejercicio.correcta;
          const mostrarEstado = elegida && (esElegida || esCorrecta);

          return (
            <motion.button
              key={opcion}
              whileTap={{ scale: 0.97 }}
              disabled={Boolean(elegida)}
              onClick={() => handleClick(opcion)}
              className={`flex items-center justify-center gap-2 py-4 px-4 rounded-xl border-2 font-medium text-base transition-colors text-foreground
                ${
                  mostrarEstado
                    ? esCorrecta
                      ? "bg-accent/10 border-accent"
                      : "bg-destructive/10 border-destructive"
                    : "bg-card border-border hover:border-primary/50"
                }
                ${!elegida ? "cursor-pointer" : "cursor-default"}
              `}
            >
              {mostrarEstado && esCorrecta && (
                <Check className="w-4 h-4 text-accent" />
              )}
              {mostrarEstado && esElegida && !esCorrecta && (
                <X className="w-4 h-4 text-destructive" />
              )}
              {opcion}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
