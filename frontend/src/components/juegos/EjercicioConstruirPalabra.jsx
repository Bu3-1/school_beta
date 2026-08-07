import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Delete, Check } from "lucide-react";

export default function EjercicioConstruirPalabra({ ejercicio, onResolver }) {
  const [escrito, setEscrito] = useState("");
  const [resuelto, setResuelto] = useState(false);

  useEffect(() => {
    setEscrito("");
    setResuelto(false);
  }, [ejercicio]);

  const agregarLetra = (letra) => {
    if (resuelto) return;
    if (escrito.length >= ejercicio.palabraCorrecta.length) return;
    setEscrito((prev) => prev + letra);
  };

  const borrarLetra = () => {
    if (resuelto) return;
    setEscrito((prev) => prev.slice(0, -1));
  };

  const comprobar = () => {
    if (resuelto || !escrito) return;
    setResuelto(true);
    const correcto = escrito === ejercicio.palabraCorrecta;
    setTimeout(() => onResolver(correcto), 900);
  };

  const correcto = resuelto && escrito === ejercicio.palabraCorrecta;

  return (
    <div>
      <div className="text-6xl mb-3">{ejercicio.emoji}</div>
      <p className="font-heading font-semibold text-lg text-foreground mb-5">
        Escribe la palabra que corresponde a la imagen
      </p>

      <div
        className={`font-heading text-3xl font-semibold tracking-[0.3em] rounded-xl py-4 mb-2 border-2 transition-colors
          ${
            resuelto
              ? correcto
                ? "bg-accent/10 border-accent text-foreground"
                : "bg-destructive/10 border-destructive text-foreground"
              : "bg-secondary border-border text-foreground"
          }`}
      >
        {escrito || "_"}
      </div>

      {resuelto && !correcto && (
        <p className="text-sm text-muted-foreground mb-4">
          La palabra correcta era:{" "}
          <span className="font-semibold text-foreground">
            {ejercicio.palabraCorrecta}
          </span>
        </p>
      )}

      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {ejercicio.letras.map((letra, i) => (
          <motion.button
            key={`${letra}-${i}`}
            whileTap={{ scale: 0.9 }}
            disabled={resuelto}
            onClick={() => agregarLetra(letra)}
            className="w-12 h-12 rounded-xl border-2 border-primary/40 bg-card text-foreground font-heading font-semibold text-lg hover:bg-primary/10 disabled:opacity-50 transition-colors"
          >
            {letra}
          </motion.button>
        ))}
      </div>

      <div className="flex gap-3 mt-6 justify-center">
        <button
          onClick={borrarLetra}
          disabled={resuelto || !escrito}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary text-foreground text-sm font-medium disabled:opacity-50"
        >
          <Delete className="w-4 h-4" /> Borrar
        </button>
        <button
          onClick={comprobar}
          disabled={resuelto || !escrito}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50"
        >
          <Check className="w-4 h-4" /> Listo
        </button>
      </div>
    </div>
  );
}
