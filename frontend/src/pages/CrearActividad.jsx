import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "@/api/apiClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, Plus, Trash2, Check, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const NIVELES = [
  "Presilábica",
  "Silábica",
  "Silábico-Alfabética",
  "Alfabética",
];

const ejercicioVacioOpcionMultiple = () => ({
  tipo: "opcion_multiple",
  enunciado: "",
  opciones: ["", "", ""],
  correcta: "",
});

const ejercicioVacioConstruirPalabra = () => ({
  tipo: "construir_palabra",
  palabraCorrecta: "",
  distractoras: [],
});

const shuffleArray = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const ETIQUETAS_TIPO = {
  opcion_multiple: "Opción múltiple",
  construir_palabra: "Construir palabra",
};

export default function CrearActividad() {
  const navigate = useNavigate();
  const { alumnoId } = useParams();

  const [form, setForm] = useState({
    titulo: "",
    nivel: NIVELES[0],
    subseccion: "",
    instrucciones: "",
    historia: "",
  });
  const [ejercicios, setEjercicios] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- Manejo del formulario general ---
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // --- Agregar / quitar ejercicios ---
  const agregarEjercicio = (tipo) => {
    setEjercicios((prev) => [
      ...prev,
      tipo === "opcion_multiple"
        ? ejercicioVacioOpcionMultiple()
        : ejercicioVacioConstruirPalabra(),
    ]);
  };

  const quitarEjercicio = (index) => {
    setEjercicios((prev) => prev.filter((_, i) => i !== index));
  };

  const actualizarEjercicio = (index, campo, valor) => {
    setEjercicios((prev) =>
      prev.map((ej, i) => (i === index ? { ...ej, [campo]: valor } : ej)),
    );
  };

  // --- Opción múltiple ---
  const actualizarOpcion = (ejIndex, opIndex, valor) => {
    setEjercicios((prev) =>
      prev.map((ej, i) => {
        if (i !== ejIndex) return ej;
        const nuevasOpciones = [...ej.opciones];
        nuevasOpciones[opIndex] = valor;
        return { ...ej, opciones: nuevasOpciones };
      }),
    );
  };

  const agregarOpcion = (ejIndex) => {
    setEjercicios((prev) =>
      prev.map((ej, i) =>
        i === ejIndex ? { ...ej, opciones: [...ej.opciones, ""] } : ej,
      ),
    );
  };

  const quitarOpcion = (ejIndex, opIndex) => {
    setEjercicios((prev) =>
      prev.map((ej, i) =>
        i === ejIndex
          ? { ...ej, opciones: ej.opciones.filter((_, oi) => oi !== opIndex) }
          : ej,
      ),
    );
  };

  const actualizarDistractora = (ejIndex, letraIndex, valor) => {
    setEjercicios((prev) =>
      prev.map((ej, i) => {
        if (i !== ejIndex) return ej;
        const nuevas = [...ej.distractoras];
        nuevas[letraIndex] = valor.slice(0, 1).toUpperCase();
        return { ...ej, distractoras: nuevas };
      }),
    );
  };

  const agregarDistractora = (ejIndex) => {
    setEjercicios((prev) =>
      prev.map((ej, i) =>
        i === ejIndex ? { ...ej, distractoras: [...ej.distractoras, ""] } : ej,
      ),
    );
  };

  const quitarDistractora = (ejIndex, letraIndex) => {
    setEjercicios((prev) =>
      prev.map((ej, i) =>
        i === ejIndex
          ? {
              ...ej,
              distractoras: ej.distractoras.filter(
                (_, li) => li !== letraIndex,
              ),
            }
          : ej,
      ),
    );
  };

  // --- Validación simple antes de enviar ---
  const validarEjercicios = () => {
    for (const ej of ejercicios) {
      if (ej.tipo === "opcion_multiple") {
        if (!ej.enunciado.trim())
          return "Falta el enunciado en un ejercicio de opción múltiple";
        if (ej.opciones.some((o) => !o.trim()))
          return "Hay opciones vacías en un ejercicio de opción múltiple";
        if (!ej.correcta.trim() || !ej.opciones.includes(ej.correcta))
          return "Selecciona cuál opción es la correcta en cada ejercicio";
      } else if (ej.tipo === "construir_palabra") {
        if (!ej.palabraCorrecta.trim())
          return "Falta la palabra correcta en un ejercicio de construir palabra";
        if (ej.distractoras.some((l) => !l.trim()))
          return "Hay letras extra vacías en un ejercicio de construir palabra";
      }
    }
    return null;
  };

  const finalizarEjercicios = () =>
    ejercicios.map((ej) => {
      if (ej.tipo !== "construir_palabra") return ej;
      const letrasPalabra = ej.palabraCorrecta.split("");
      const letras = shuffleArray([...letrasPalabra, ...ej.distractoras]);
      const { distractoras, ...resto } = ej;
      return { ...resto, letras };
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.titulo.trim()) {
      toast({
        title: "Falta el título",
        description: "Escribe un título para la actividad",
        variant: "destructive",
      });
      return;
    }

    const errorEjercicios = validarEjercicios();
    if (errorEjercicios) {
      toast({
        title: "Revisa los ejercicios",
        description: errorEjercicios,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const ejerciciosFinales = finalizarEjercicios();
      const nueva = await apiClient.entities.Actividad.create({
        ...form,
        ejercicios:
          ejerciciosFinales.length > 0
            ? { ejercicios: ejerciciosFinales }
            : undefined,
      });
      toast({
        title: "Actividad creada",
        description: `"${nueva.titulo}" se agregó correctamente`,
      });
      if (alumnoId) {
        navigate(`/actividades/${alumnoId}/${encodeURIComponent(form.nivel)}`);
      } else {
        navigate(-1);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "No se pudo crear la actividad",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Volver
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
          Nueva actividad
        </h1>
        <p className="text-muted-foreground mt-1">
          Crea una actividad y sus ejercicios interactivos
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* --- Datos generales --- */}
        <div className="space-y-6 bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="space-y-2">
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              type="text"
              value={form.titulo}
              onChange={(e) => handleChange("titulo", e.target.value)}
              placeholder="Ej. Identificar Vocales y Garabateo"
              className="h-12"
              required
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label>Nivel</Label>
            <div className="flex flex-wrap gap-1.5">
              {NIVELES.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => handleChange("nivel", n)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                    form.nivel === n
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-muted"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subseccion">Subsección</Label>
            <Input
              id="subseccion"
              type="text"
              value={form.subseccion}
              onChange={(e) => handleChange("subseccion", e.target.value)}
              placeholder="Ej. Conteo de sílabas"
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instrucciones">Instrucciones</Label>
            <textarea
              id="instrucciones"
              value={form.instrucciones}
              onChange={(e) => handleChange("instrucciones", e.target.value)}
              placeholder="Explica brevemente en qué consiste la actividad..."
              rows={3}
              className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="historia">Historia / cuento (opcional)</Label>
            <textarea
              id="historia"
              value={form.historia}
              onChange={(e) => handleChange("historia", e.target.value)}
              placeholder="Ej. Mi-mo es un ga-to ne-gro. Vi-ve en u-na ca-sa ro-ja..."
              rows={4}
              className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Si la actividad se basa en un cuento breve, escríbelo aquí. Se
              mostrará al alumno antes de empezar los ejercicios.
            </p>
          </div>
        </div>

        {/* --- Ejercicios --- */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Ejercicios ({ejercicios.length})</Label>
          </div>

          {ejercicios.map((ej, ejIndex) => (
            <motion.div
              key={ejIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-2xl p-5 space-y-4 relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {ETIQUETAS_TIPO[ej.tipo]} · #{ejIndex + 1}
                </span>
                <button
                  type="button"
                  onClick={() => quitarEjercicio(ejIndex)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {ej.tipo === "opcion_multiple" && (
                <>
                  <div className="space-y-2">
                    <Label>Enunciado</Label>
                    <Input
                      value={ej.enunciado}
                      onChange={(e) =>
                        actualizarEjercicio(
                          ejIndex,
                          "enunciado",
                          e.target.value,
                        )
                      }
                      placeholder="¿Qué letra completa la palabra?"
                      className="h-11"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Opciones (marca cuál es la correcta)</Label>
                    {ej.opciones.map((op, opIndex) => (
                      <div key={opIndex} className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            actualizarEjercicio(ejIndex, "correcta", op)
                          }
                          className={`w-9 h-9 flex-shrink-0 rounded-lg border-2 flex items-center justify-center transition-colors ${
                            ej.correcta === op && op
                              ? "bg-accent/10 border-accent text-accent"
                              : "border-border text-muted-foreground"
                          }`}
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <Input
                          value={op}
                          onChange={(e) =>
                            actualizarOpcion(ejIndex, opIndex, e.target.value)
                          }
                          placeholder={`Opción ${opIndex + 1}`}
                          className="h-11"
                        />
                        {ej.opciones.length > 2 && (
                          <button
                            type="button"
                            onClick={() => quitarOpcion(ejIndex, opIndex)}
                            className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => agregarOpcion(ejIndex)}
                      className="text-sm text-primary font-medium flex items-center gap-1 mt-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Agregar opción
                    </button>
                  </div>
                </>
              )}

              {ej.tipo === "construir_palabra" && (
                <>
                  <div className="space-y-2">
                    <Label>Palabra correcta</Label>
                    <Input
                      value={ej.palabraCorrecta}
                      onChange={(e) =>
                        actualizarEjercicio(
                          ejIndex,
                          "palabraCorrecta",
                          e.target.value.toUpperCase(),
                        )
                      }
                      placeholder="GATO"
                      className="h-11 font-heading tracking-widest"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      El niño arrastrará estas letras para formar la palabra.
                    </p>
                  </div>

                  {ej.palabraCorrecta && (
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">
                        Letras de la palabra (automáticas)
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {ej.palabraCorrecta.split("").map((letra, li) => (
                          <div
                            key={li}
                            className="h-11 w-11 rounded-xl bg-accent/10 border-2 border-accent/30 text-accent flex items-center justify-center font-heading font-semibold"
                          >
                            {letra}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Letras extra (opcional, para distraer)</Label>
                    <p className="text-xs text-muted-foreground -mt-1 mb-1">
                      Agrega letras de más que NO son parte de la palabra.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ej.distractoras.map((letra, letraIndex) => (
                        <div key={letraIndex} className="relative">
                          <Input
                            value={letra}
                            onChange={(e) =>
                              actualizarDistractora(
                                ejIndex,
                                letraIndex,
                                e.target.value,
                              )
                            }
                            className="h-11 w-11 text-center font-heading font-semibold"
                            maxLength={1}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              quitarDistractora(ejIndex, letraIndex)
                            }
                            className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-destructive text-white flex items-center justify-center text-[10px]"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => agregarDistractora(ejIndex)}
                        className="h-11 w-11 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => agregarEjercicio("opcion_multiple")}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" /> Opción múltiple
            </button>
            <button
              type="button"
              onClick={() => agregarEjercicio("construir_palabra")}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" /> Construir palabra
            </button>
          </div>
        </div>

        {/* --- Acciones --- */}
        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1 h-12"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="flex-1 h-12"
            disabled={loading || !form.titulo}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Guardando...
              </>
            ) : (
              "Crear actividad"
            )}
          </Button>
        </div>
      </motion.form>
    </div>
  );
}
