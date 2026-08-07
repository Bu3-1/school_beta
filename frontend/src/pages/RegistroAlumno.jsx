import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/api/apiClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const GRADOS = [1, 2, 3, 4, 5, 6];
const GRUPOS = ["A", "B", "C", "D"];

export default function RegistroAlumno() {
  const [condiciones, setCondiciones] = useState([]);
  const [selected, setSelected] = useState([]);
  const [form, setForm] = useState({
    nombre_anonimizado: "",
    edad: "",
    grado: 1,
    grupo: "A",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.entities.Condicion.list()
      .then(setCondiciones)
      .catch(() => {});
  }, []);

  const toggleCondicion = (nombre) => {
    if (nombre === "Ninguna") {
      setSelected(["Ninguna"]);
    } else {
      setSelected((prev) => {
        const withoutNinguna = prev.filter((c) => c !== "Ninguna");
        return prev.includes(nombre)
          ? withoutNinguna.filter((c) => c !== nombre)
          : [...withoutNinguna, nombre];
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiClient.entities.Alumno.create({
        nombre_anonimizado: form.nombre_anonimizado,
        edad: parseInt(form.edad),
        grado: parseInt(form.grado),
        grupo: form.grupo,
        condiciones: selected,
      });
      toast({
        title: "Alumno registrado",
        description: `${form.nombre_anonimizado} se ha agregado correctamente.`,
      });
      navigate("/");
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "No se pudo registrar el alumno",
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
          Nuevo alumno
        </h1>
        <p className="text-muted-foreground mt-1">
          Registra un alumno con un nombre anónimo para proteger sus datos
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        onSubmit={handleSubmit}
        className="space-y-6 bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm"
      >
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre anónimo</Label>
          <Input
            id="nombre"
            type="text"
            value={form.nombre_anonimizado}
            onChange={(e) =>
              setForm({ ...form, nombre_anonimizado: e.target.value })
            }
            placeholder="Ej. Estrellita, Rayito, Corazoncito..."
            className="h-12"
            required
            autoFocus
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="edad">Edad</Label>
            <Input
              id="edad"
              type="number"
              min="3"
              max="15"
              value={form.edad}
              onChange={(e) => setForm({ ...form, edad: e.target.value })}
              placeholder="Ej. 7"
              className="h-12"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Grado</Label>
            <div className="flex flex-wrap gap-1.5">
              {GRADOS.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setForm({ ...form, grado: g })}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                    form.grado === g
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-muted"
                  }`}
                >
                  {g}°
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Grupo</Label>
          <div className="flex gap-2">
            {GRUPOS.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setForm({ ...form, grupo: g })}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
                  form.grupo === g
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Condiciones / Neurodivergencias</Label>
          <p className="text-xs text-muted-foreground -mt-1">
            Selecciona las que apliquen al alumno
          </p>
          <div className="flex flex-wrap gap-2">
            {condiciones.map((c) => {
              const active = selected.includes(c.nombre);
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => toggleCondicion(c.nombre)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium border transition-all flex items-center gap-1.5 ${
                    active
                      ? "bg-primary/15 text-primary border-primary/30"
                      : "bg-secondary text-secondary-foreground border-transparent hover:bg-muted"
                  }`}
                >
                  {active && <Check className="w-3.5 h-3.5" />}
                  {c.nombre}
                </button>
              );
            })}
          </div>
        </div>

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
            disabled={loading || !form.nombre_anonimizado || !form.edad}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Guardando...
              </>
            ) : (
              "Guardar alumno"
            )}
          </Button>
        </div>
      </motion.form>
    </div>
  );
}
