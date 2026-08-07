import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { apiClient } from "@/api/apiClient";
import {
  ArrowLeft,
  BarChart3,
  MessageSquare,
  X,
  CheckCircle2,
  Clock,
  Send,
  Star,
} from "lucide-react";
import NivelCard from "@/components/NivelCard";

const NIVELES = [
  "Presilábica",
  "Silábica",
  "Silábico-Alfabética",
  "Alfabética",
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export default function SeleccionNivel() {
  const { alumnoId } = useParams();
  const navigate = useNavigate();
  const [alumno, setAlumno] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modales
  const [showReport, setShowReport] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

  // Datos simulados de reportes recientes
  const [intentos] = useState([
    {
      id: 1,
      actividad: "Identificar vocales",
      nivel: "Presilábica",
      puntaje: "90%",
      fecha: "Ayer",
      estado: "Completado",
    },
    {
      id: 2,
      actividad: "Completar sílabas",
      nivel: "Silábica",
      puntaje: "75%",
      fecha: "Hace 2 días",
      estado: "En progreso",
    },
    {
      id: 3,
      actividad: "Loto de palabras",
      nivel: "Presilábica",
      puntaje: "100%",
      fecha: "Hace 4 días",
      estado: "Completado",
    },
  ]);

  useEffect(() => {
    apiClient.entities.Alumno.get(alumnoId)
      .then(setAlumno)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [alumnoId]);

  const handleSendFeedback = (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackSent(false);
      setFeedbackText("");
      setShowFeedback(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="h-8 w-48 rounded-lg bg-card border border-border animate-pulse mb-2" />
        <div className="h-5 w-32 rounded-lg bg-card border border-border animate-pulse mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-48 rounded-2xl bg-card border border-border animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Volver */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Volver a alumnos
      </motion.button>

      {/* Encabezado e Interacciones Estratégicas */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-card border border-border p-5 rounded-3xl shadow-xs"
      >
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"></p>
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
              {alumno?.nombre_anonimizado}
            </h1>
            {alumno?.condiciones && alumno.condiciones.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {alumno.condiciones.map((c) => (
                  <span
                    key={c}
                    className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 font-medium border border-purple-500/20"
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Botones Estratégicos */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowReport(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-secondary/80 hover:bg-secondary text-foreground text-xs font-semibold transition-all border border-border shadow-xs active:scale-95"
          >
            <BarChart3 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            Reporte de Avance
          </button>

          <button
            onClick={() => setShowFeedback(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#3B0A5E] hover:bg-[#4A1D6D] text-white text-xs font-semibold transition-all shadow-xs active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            Dar Feedback
          </button>
        </div>
      </motion.div>

      {/* Título de Selección */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mb-6"
      >
        <h2 className="text-lg font-heading font-semibold text-foreground">
          Selecciona el nivel de lectura
        </h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Elige la etapa de desarrollo de la escritura y lectura del alumno
        </p>
      </motion.div>

      {/* Cuadrícula de Niveles */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {NIVELES.map((nivel) => (
          <NivelCard
            key={nivel}
            nivel={nivel}
            onClick={() =>
              navigate(`/actividades/${alumnoId}/${encodeURIComponent(nivel)}`)
            }
          />
        ))}
      </motion.div>

      {/* MODAL: REPORTE DE INTENTOS */}
      <AnimatePresence>
        {showReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card border border-border w-full max-w-lg rounded-3xl p-6 shadow-xl relative"
            >
              <button
                onClick={() => setShowReport(false)}
                className="absolute top-4 right-4 p-2 rounded-xl text-muted-foreground hover:bg-secondary"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-foreground">
                    Historial Reciente
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Últimas interacciones de {alumno?.nombre_anonimizado}
                  </p>
                </div>
              </div>

              {/* Lista de intentos */}
              <div className="space-y-3 my-4">
                {intentos.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-secondary/50 border border-border flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        {item.actividad}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {item.nivel} • {item.fecha}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                        {item.puntaje}
                      </span>
                      <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                        {item.estado}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowReport(false)}
                className="w-full py-2.5 rounded-2xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs transition-colors"
              >
                Cerrar Reporte
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: FEEDBACK */}
      <AnimatePresence>
        {showFeedback && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card border border-border w-full max-w-lg rounded-3xl p-6 shadow-xl relative"
            >
              <button
                onClick={() => setShowFeedback(false)}
                className="absolute top-4 right-4 p-2 rounded-xl text-muted-foreground hover:bg-secondary"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-foreground">
                    Retroalimentación Docente
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Añade observaciones para {alumno?.nombre_anonimizado}
                  </p>
                </div>
              </div>

              {feedbackSent ? (
                <div className="py-8 text-center space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                  <p className="font-semibold text-foreground">
                    ¡Feedback guardado con éxito!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendFeedback} className="space-y-4">
                  <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Ej. Demuestra gran soltura reconociendo vocales, pero requiere reforzar sílabas compuestas..."
                    rows={4}
                    className="w-full p-3.5 rounded-2xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#3B0A5E]"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowFeedback(false)}
                      className="px-4 py-2.5 rounded-2xl bg-secondary text-foreground text-xs font-semibold"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#3B0A5E] hover:bg-[#4A1D6D] text-white text-xs font-semibold shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Guardar Observación
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
