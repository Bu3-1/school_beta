import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy, Loader2 } from "lucide-react";
import { apiClient } from "@/api/apiClient";
import { getJuego } from "@/lib/actividadesContenido";
import EjercicioOpcionMultiple from "@/components/juegos/EjercicioOpcionMultiple";
import EjercicioConstruirPalabra from "@/components/juegos/EjercicioConstruirPalabra";
import { toast } from "@/components/ui/use-toast";

export default function ActividadJuego() {
  const { alumnoId, actividadId } = useParams();
  const navigate = useNavigate();

  const [alumno, setAlumno] = useState(null);
  const [actividad, setActividad] = useState(null);
  const [loading, setLoading] = useState(true);

  const [indice, setIndice] = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const [terminado, setTerminado] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const juego = actividad?.ejercicios?.ejercicios
    ? { ejercicios: actividad.ejercicios.ejercicios }
    : getJuego(actividadId);

  useEffect(() => {
    Promise.all([
      apiClient.entities.Alumno.get(alumnoId),
      apiClient.entities.Actividad.get(actividadId),
    ])
      .then(([a, act]) => {
        setAlumno(a);
        setActividad(act);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [alumnoId, actividadId]);

  const volverAActividades = () => {
    if (actividad?.nivel) {
      navigate(
        `/actividades/${alumnoId}/${encodeURIComponent(actividad.nivel)}`,
      );
    } else {
      navigate(`/seleccion-nivel/${alumnoId}`);
    }
  };

  const handleResolver = async (correcto) => {
    const nuevosAciertos = correcto ? aciertos + 1 : aciertos;
    setAciertos(nuevosAciertos);

    if (indice + 1 >= juego.ejercicios.length) {
      setTerminado(true);
      const puntaje = Math.round(
        (nuevosAciertos / juego.ejercicios.length) * 100,
      );
      setGuardando(true);
      try {
        await apiClient.entities.IntentoActividad.create({
          alumno_id: alumnoId,
          actividad_id: Number(actividadId),
          puntaje,
          fecha: new Date().toISOString(),
        });
        toast({
          title: "Actividad registrada",
          description: `Puntaje: ${puntaje}/100 para ${actividad?.titulo || "la actividad"}`,
        });
      } catch (err) {
        toast({
          title: "No se pudo guardar el resultado",
          description: err?.message || "Intenta de nuevo",
          variant: "destructive",
        });
      } finally {
        setGuardando(false);
      }
    } else {
      setIndice((i) => i + 1);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <div className="h-8 w-64 rounded-lg bg-card border border-border animate-pulse mb-8" />
        <div className="h-64 rounded-2xl bg-card border border-border animate-pulse" />
      </div>
    );
  }

  if (!juego) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="text-5xl mb-4">🚧</div>
        <h2 className="text-lg font-heading font-semibold text-foreground">
          Esta actividad todavía no tiene una versión interactiva
        </h2>
        <p className="text-sm text-muted-foreground mt-1 mb-6">
          Regresa y captura el puntaje manualmente por ahora.
        </p>
        <button
          onClick={volverAActividades}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a actividades
        </button>
      </div>
    );
  }

  const totalEjercicios = juego.ejercicios.length;
  const ejercicioActual = juego.ejercicios[indice];
  const puntajeFinal = Math.round((aciertos / totalEjercicios) * 100);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <button
        onClick={volverAActividades}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Volver a actividades
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{alumno?.nombre_anonimizado}</span>
            <span className="text-border">·</span>
            <span className="font-medium text-primary">{actividad?.nivel}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-foreground mt-1">
            {actividad?.titulo}
          </h1>
        </div>
        {!terminado && (
          <div className="flex-shrink-0 text-sm font-medium text-muted-foreground bg-card border border-border rounded-full px-3 py-1">
            {indice + 1} / {totalEjercicios}
          </div>
        )}
      </div>

      {!terminado && (
        <div className="w-full h-2 rounded-full bg-secondary mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(indice / totalEjercicios) * 100}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          />
        </div>
      )}

      <div className="bg-card rounded-2xl border border-border shadow-sm p-6 sm:p-8 text-center">
        <AnimatePresence mode="wait">
          {terminado ? (
            <motion.div
              key="resultado"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-4"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                <Trophy className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-xl font-heading font-bold text-foreground">
                ¡Actividad completada!
              </h2>
              <p className="text-3xl font-heading font-bold text-primary mt-3">
                {puntajeFinal}%
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {aciertos} de {totalEjercicios} correctas
              </p>

              {guardando ? (
                <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-6">
                  <Loader2 className="w-4 h-4 animate-spin" /> Guardando
                  resultado...
                </p>
              ) : (
                <button
                  onClick={volverAActividades}
                  className="mt-6 w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
                >
                  Volver a actividades
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={indice}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {ejercicioActual.tipo === "construir_palabra" ? (
                <EjercicioConstruirPalabra
                  ejercicio={ejercicioActual}
                  onResolver={handleResolver}
                />
              ) : (
                <EjercicioOpcionMultiple
                  ejercicio={ejercicioActual}
                  onResolver={handleResolver}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
