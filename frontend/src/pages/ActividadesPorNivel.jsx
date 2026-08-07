import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { apiClient } from "@/api/apiClient";
import { ArrowLeft, Plus } from "lucide-react";
import ActividadCard from "@/components/ActividadCard";
import { ACTIVIDADES_BOOKI } from "@/data/actividadesData"; // 👈 Cargar banco local si falta en API

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

export default function ActividadesPorNivel() {
  const { alumnoId, nivel } = useParams();
  const navigate = useNavigate();
  const decodedNivel = decodeURIComponent(nivel);

  const [alumno, setAlumno] = useState(null);
  const [actividades, setActividades] = useState([]);
  const [intentos, setIntentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiClient.entities.Alumno.get(alumnoId),
      apiClient.entities.Actividad.filter({ nivel: decodedNivel }),
      apiClient.entities.IntentoActividad.filter(
        { alumno_id: alumnoId },
        "-fecha",
      ),
    ])
      .then(([a, acts, ints]) => {
        setAlumno(a);
        setIntentos(ints || []);

        if (acts && acts.length > 0) {
          setActividades(acts);
        } else {
          const locales = ACTIVIDADES_BOOKI.filter(
            (item) => item.nivel.toLowerCase() === decodedNivel.toLowerCase(),
          );
          setActividades(locales);
        }
      })
      .catch(() => {
        const locales = ACTIVIDADES_BOOKI.filter(
          (item) => item.nivel.toLowerCase() === decodedNivel.toLowerCase(),
        );
        setActividades(locales);
      })
      .finally(() => setLoading(false));
  }, [alumnoId, decodedNivel]);

  const getIntentosForActividad = (actividadId) =>
    intentos.filter((i) => i.actividad_id === actividadId);

  const handleIniciar = (actividadId) => {
    navigate(`/jugar/${alumnoId}/${actividadId}`);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="h-8 w-64 rounded-lg bg-card border border-border animate-pulse mb-2" />
        <div className="h-5 w-40 rounded-lg bg-card border border-border animate-pulse mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3].map((i) => (
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
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(`/seleccion-nivel/${alumnoId}`)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Volver a niveles
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 flex items-start justify-between gap-4 flex-wrap"
      >
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{alumno?.nombre_anonimizado}</span>
            <span className="text-border">·</span>
            <span className="font-medium text-primary">{decodedNivel}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mt-1">
            Actividades disponibles
          </h1>
          <p className="text-muted-foreground mt-1">
            Selecciona una actividad para trabajar con el alumno
          </p>
        </div>

        <button
          onClick={() => navigate(`/crear-actividad/${alumnoId}`)}
          className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Nueva actividad
        </button>
      </motion.div>

      {actividades.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="text-5xl mb-4">📚</div>
          <h2 className="text-lg font-heading font-semibold text-foreground">
            No hay actividades para este nivel
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Pronto agregaremos más actividades
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {actividades.map((act) => (
            <ActividadCard
              key={act.id}
              actividad={act}
              intentos={getIntentosForActividad(act.id)}
              onIniciar={() => handleIniciar(act.id)}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
