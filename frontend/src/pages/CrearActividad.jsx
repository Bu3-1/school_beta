import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "@/api/apiClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, Plus, Trash2, Check, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { EmojiInput } from "@/components/ui/emojiPicker";

const NIVELES = [
  "Presilábica",
  "Silábica",
  "Silábico-Alfabética",
  "Alfabética",
];

const ejercicioVacioOpcionMultiple = () => ({
  tipo: "opcion_multiple",
  emoji: "",
  pista: "",
  contexto: "",
  enunciado: "",
  opciones: ["", "", ""],
  correcta: "",
});

// "letras" ya no se escribe a mano: se arma automáticamente a partir de
// palabraCorrecta + distractoras al momento de guardar (ver finalizarEjercicios).
const ejercicioVacioConstruirPalabra = () => ({
  tipo: "construir_palabra",
  emoji: "",
  palabraCorrecta: "",
  distractoras: [],
});

const preguntaVacia = () => ({
  enunciado: "",
  opciones: ["", "", ""],
  correcta: "",
});

const ejercicioVacioLecturaPreguntas = () => ({
  tipo: "lectura_preguntas",
  emoji: "",
  titulo: "",
  texto: "",
  preguntas: [preguntaVacia()],
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
  lectura_preguntas: "Lectura con preguntas",
};

export default function CrearActividad() {
  const navigate = useNavigate();
  const { alumnoId } = useParams();

  const [form, setForm] = useState({
    titulo: "",
    nivel: NIVELES[0],
    subseccion: "",
    instrucciones: "",
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
        : tipo === "construir_palabra"
          ? ejercicioVacioConstruirPalabra()
          : ejercicioVacioLecturaPreguntas(),
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

  // --- Construir palabra: solo se manejan letras "extra" (distractoras) ---
  // Las letras correctas se derivan solas de palabraCorrecta y se muestran de referencia.
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

  // --- Lectura con preguntas ---
  const actualizarPregunta = (ejIndex, pregIndex, campo, valor) => {
    setEjercicios((prev) =>
      prev.map((ej, i) => {
        if (i !== ejIndex) return ej;
        const nuevasPreguntas = ej.preguntas.map((p, pi) =>
          pi === pregIndex ? { ...p, [campo]: valor } : p,
        );
        return { ...ej, preguntas: nuevasPreguntas };
      }),
    );
  };

  const agregarPregunta = (ejIndex) => {
    setEjercicios((prev) =>
      prev.map((ej, i) =>
        i === ejIndex
          ? { ...ej, preguntas: [...ej.preguntas, preguntaVacia()] }
          : ej,
      ),
    );
  };

  const quitarPregunta = (ejIndex, pregIndex) => {
    setEjercicios((prev) =>
      prev.map((ej, i) =>
        i === ejIndex
          ? {
              ...ej,
              preguntas: ej.preguntas.filter((_, pi) => pi !== pregIndex),
            }
          : ej,
      ),
    );
  };

  const actualizarOpcionPregunta = (ejIndex, pregIndex, opIndex, valor) => {
    setEjercicios((prev) =>
      prev.map((ej, i) => {
        if (i !== ejIndex) return ej;
        const nuevasPreguntas = ej.preguntas.map((p, pi) => {
          if (pi !== pregIndex) return p;
          const nuevasOpciones = [...p.opciones];
          nuevasOpciones[opIndex] = valor;
          return { ...p, opciones: nuevasOpciones };
        });
        return { ...ej, preguntas: nuevasPreguntas };
      }),
    );
  };

  const agregarOpcionPregunta = (ejIndex, pregIndex) => {
    setEjercicios((prev) =>
      prev.map((ej, i) => {
        if (i !== ejIndex) return ej;
        const nuevasPreguntas = ej.preguntas.map((p, pi) =>
          pi === pregIndex ? { ...p, opciones: [...p.opciones, ""] } : p,
        );
        return { ...ej, preguntas: nuevasPreguntas };
      }),
    );
  };

  const quitarOpcionPregunta = (ejIndex, pregIndex, opIndex) => {
    setEjercicios((prev) =>
      prev.map((ej, i) => {
        if (i !== ejIndex) return ej;
        const nuevasPreguntas = ej.preguntas.map((p, pi) =>
          pi === pregIndex
            ? { ...p, opciones: p.opciones.filter((_, oi) => oi !== opIndex) }
            : p,
        );
        return { ...ej, preguntas: nuevasPreguntas };
      }),
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
      } else if (ej.tipo === "lectura_preguntas") {
        if (!ej.texto.trim())
          return "Falta el texto de lectura en un ejercicio de lectura con preguntas";
        if (ej.preguntas.length === 0)
          return "Agrega al menos una pregunta a la lectura";
        for (const p of ej.preguntas) {
          if (!p.enunciado.trim())
            return "Falta el enunciado de una pregunta en la lectura";
          if (p.opciones.some((o) => !o.trim()))
            return "Hay opciones vacías en una pregunta de la lectura";
          if (!p.correcta.trim() || !p.opciones.includes(p.correcta))
            return "Selecciona cuál opción es la correcta en cada pregunta de la lectura";
        }
      }
    }
    return null;
  };

  // Convierte los ejercicios del formulario al formato final que se guarda:
  // en "construir_palabra" arma y mezcla el arreglo "letras" a partir de
  // palabraCorrecta + distractoras, y descarta el campo auxiliar "distractoras".
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

              <div className="space-y-2">
                <Label className="pr-4">Emoji (opcional)</Label>
                <EmojiInput
                  value={ej.emoji}
                  onChange={(emoji) =>
                    actualizarEjercicio(ejIndex, "emoji", emoji)
                  }
                />
              </div>

              {ej.tipo === "opcion_multiple" && (
                <>
                  <div className="space-y-2">
                    <Label>Contexto (opcional, para lecturas)</Label>
                    <textarea
                      value={ej.contexto}
                      onChange={(e) =>
                        actualizarEjercicio(ejIndex, "contexto", e.target.value)
                      }
                      rows={2}
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Pista (opcional)</Label>
                    <Input
                      value={ej.pista}
                      onChange={(e) =>
                        actualizarEjercicio(ejIndex, "pista", e.target.value)
                      }
                      placeholder="?ATO"
                      className="h-11"
                    />
                  </div>

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

                  {/* Letras correctas: se muestran solas, no se editan aquí */}
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

                  {/* Distractoras: solo las letras "extra" para hacerlo más difícil */}
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

              {ej.tipo === "lectura_preguntas" && (
                <>
                  <div className="space-y-2">
                    <Label>Título de la lectura (opcional)</Label>
                    <Input
                      value={ej.titulo}
                      onChange={(e) =>
                        actualizarEjercicio(ejIndex, "titulo", e.target.value)
                      }
                      placeholder="Ej. El gato y el ratón"
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Texto de lectura</Label>
                    <textarea
                      value={ej.texto}
                      onChange={(e) =>
                        actualizarEjercicio(ejIndex, "texto", e.target.value)
                      }
                      placeholder="Escribe aquí el texto que el niño va a leer..."
                      rows={4}
                      className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Preguntas sobre la lectura</Label>
                    {ej.preguntas.map((preg, pregIndex) => (
                      <div
                        key={pregIndex}
                        className="rounded-xl border border-border p-4 space-y-3 bg-background/50"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-muted-foreground">
                            Pregunta {pregIndex + 1}
                          </span>
                          {ej.preguntas.length > 1 && (
                            <button
                              type="button"
                              onClick={() => quitarPregunta(ejIndex, pregIndex)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        <Input
                          value={preg.enunciado}
                          onChange={(e) =>
                            actualizarPregunta(
                              ejIndex,
                              pregIndex,
                              "enunciado",
                              e.target.value,
                            )
                          }
                          placeholder="¿Qué hizo el gato?"
                          className="h-11"
                          required
                        />

                        <div className="space-y-2">
                          {preg.opciones.map((op, opIndex) => (
                            <div
                              key={opIndex}
                              className="flex items-center gap-2"
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  actualizarPregunta(
                                    ejIndex,
                                    pregIndex,
                                    "correcta",
                                    op,
                                  )
                                }
                                className={`w-9 h-9 flex-shrink-0 rounded-lg border-2 flex items-center justify-center transition-colors ${
                                  preg.correcta === op && op
                                    ? "bg-accent/10 border-accent text-accent"
                                    : "border-border text-muted-foreground"
                                }`}
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <Input
                                value={op}
                                onChange={(e) =>
                                  actualizarOpcionPregunta(
                                    ejIndex,
                                    pregIndex,
                                    opIndex,
                                    e.target.value,
                                  )
                                }
                                placeholder={`Opción ${opIndex + 1}`}
                                className="h-11"
                              />
                              {preg.opciones.length > 2 && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    quitarOpcionPregunta(
                                      ejIndex,
                                      pregIndex,
                                      opIndex,
                                    )
                                  }
                                  className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() =>
                              agregarOpcionPregunta(ejIndex, pregIndex)
                            }
                            className="text-sm text-primary font-medium flex items-center gap-1 mt-1"
                          >
                            <Plus className="w-3.5 h-3.5" /> Agregar opción
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => agregarPregunta(ejIndex)}
                      className="text-sm text-primary font-medium flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Agregar pregunta
                    </button>
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
            <button
              type="button"
              onClick={() => agregarEjercicio("lectura_preguntas")}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" /> Lectura con preguntas
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
