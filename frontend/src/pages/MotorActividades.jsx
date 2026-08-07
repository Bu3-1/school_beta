import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ACTIVIDADES_BOOKI } from "@/data/actividadesData";

export default function MotorActividades() {
  const { actividadId } = useParams(); // Lee la ID desde la URL (/jugar/:alumnoId/:actividadId)
  const navigate = useNavigate();

  // 🔍 Búsqueda flexible de la actividad (soporta IDs como "pre-1" y numéricas como "7")
  const actividad =
    ACTIVIDADES_BOOKI.find((a) => String(a.id) === String(actividadId)) ||
    ACTIVIDADES_BOOKI[
      (parseInt(actividadId, 10) - 1) % ACTIVIDADES_BOOKI.length
    ] ||
    ACTIVIDADES_BOOKI[0];

  const [preguntaIndex, setPreguntaIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [mostrarScore, setMostrarScore] = useState(false);
  const [opcionesMezcladas, setOpcionesMezcladas] = useState([]);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

  const preguntaActual = actividad?.preguntas?.[preguntaIndex];

  // 🎲 Lógica de Aleatoriedad: Mezclar opciones cada vez que cambia la pregunta
  useEffect(() => {
    if (preguntaActual?.opciones) {
      const mezcladas = [...preguntaActual.opciones].sort(
        () => Math.random() - 0.5,
      );
      setOpcionesMezcladas(mezcladas);
      setOpcionSeleccionada(null);
    }
  }, [preguntaIndex, preguntaActual]);

  if (!actividad || !preguntaActual) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 text-center bg-card border border-border rounded-3xl">
        <p className="text-muted-foreground mb-4">
          No se pudo cargar la actividad seleccionada.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-xl bg-[#3B0A5E] text-white text-sm font-medium"
        >
          Volver a actividades
        </button>
      </div>
    );
  }

  const handleSeleccion = (opcion) => {
    if (opcionSeleccionada) return;
    setOpcionSeleccionada(opcion);

    if (opcion.l === preguntaActual.correcta) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (preguntaIndex + 1 < actividad.preguntas.length) {
        setPreguntaIndex((prev) => prev + 1);
      } else {
        setMostrarScore(true);
      }
    }, 1500);
  };

  const reiniciarActividad = () => {
    setPreguntaIndex(0);
    setScore(0);
    setMostrarScore(false);
  };

  const progresoWidth = `${((preguntaIndex + 1) / actividad.preguntas.length) * 100}%`;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#3B0A5E] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Volver a actividades
      </button>

      <div className="mb-2">
        <h1 className="text-2xl font-bold text-foreground">
          📚 {actividad.titulo}
        </h1>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        {actividad.instrucciones}
      </p>

      <div className="inline-block bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs font-semibold px-3 py-1 rounded-lg mb-6 border border-amber-200 dark:border-amber-800/40">
        📌 Nivel: {actividad.nivel} - {actividad.subseccion}
      </div>

      {!mostrarScore ? (
        <>
          {/* Barra de progreso */}
          <div className="bg-secondary rounded-full h-2.5 mb-6 overflow-hidden border border-border">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: progresoWidth }}
            />
          </div>

          {/* Tarjeta de pregunta */}
          <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
            <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
              Pregunta {preguntaIndex + 1} de {actividad.preguntas.length}
            </div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-6">
              {preguntaActual.q}
            </h2>

            {/* Opciones con aleatoriedad */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {opcionesMezcladas.map((op, idx) => {
                const esCorrecta = op.l === preguntaActual.correcta;
                const estaSeleccionada = opcionSeleccionada === op;

                let btnClass =
                  "bg-background hover:bg-secondary border-2 border-border rounded-2xl p-4 flex items-center gap-3 text-left transition-all active:scale-95";

                if (opcionSeleccionada) {
                  if (esCorrecta) {
                    btnClass =
                      "bg-emerald-500/10 border-2 border-emerald-500 text-emerald-700 dark:text-emerald-300 rounded-2xl p-4 flex items-center gap-3 text-left pointer-events-none";
                  } else if (estaSeleccionada && !esCorrecta) {
                    btnClass =
                      "bg-rose-500/10 border-2 border-rose-500 text-rose-700 dark:text-rose-300 rounded-2xl p-4 flex items-center gap-3 text-left pointer-events-none";
                  } else {
                    btnClass =
                      "opacity-40 border-2 border-border rounded-2xl p-4 flex items-center gap-3 text-left pointer-events-none";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSeleccion(op)}
                    disabled={opcionSeleccionada !== null}
                    className={btnClass}
                  >
                    <span className="text-3xl">{op.e}</span>
                    <span className="font-semibold text-sm">{op.l}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        /* Pantalla final de resultados */
        <div className="bg-card border-2 border-emerald-500 rounded-3xl p-8 text-center mt-6 shadow-lg">
          <div className="text-5xl font-bold text-emerald-500 mb-2">
            {score} / {actividad.preguntas.length}
          </div>
          <p className="text-base text-muted-foreground mb-6">
            {score === actividad.preguntas.length
              ? "¡Excelente trabajo! Has completado la actividad correctamente 🎉"
              : "¡Buen intento! Puedes volver a jugarlo para mejorar tu puntuación 💪"}
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 rounded-2xl bg-secondary text-foreground font-medium text-sm hover:bg-secondary/80 transition-colors"
            >
              Volver
            </button>
            <button
              onClick={reiniciarActividad}
              className="px-6 py-2.5 rounded-2xl bg-[#3B0A5E] hover:bg-[#4A1D6D] text-white font-medium text-sm transition-colors shadow-md"
            >
              🔄 Intentar de nuevo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
