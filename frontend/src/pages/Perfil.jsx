import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Mail,
  Save,
  CheckCircle2,
  Camera,
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Lista de avatares prestablecidos estilo Booki
const AVATARES = [
  { id: "p1", emoji: "👨‍🏫", bg: "bg-[#3B0A5E]" },
  { id: "p2", emoji: "👩‍🏫", bg: "bg-purple-600" },
  { id: "p3", emoji: "🦉", bg: "bg-teal-600" },
  { id: "p4", emoji: "🦊", bg: "bg-amber-500" },
  { id: "p5", emoji: "🚀", bg: "bg-indigo-600" },
  { id: "p6", emoji: "⭐", bg: "bg-pink-500" },
];

export default function Perfil() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  // Estados del perfil
  const [nombre, setNombre] = useState("Profesor / Educador");
  const [email, setEmail] = useState("maestro@escuela.edu.mx");
  const [avatarSeleccionado, setAvatarSeleccionado] = useState(AVATARES[0]);
  const [imagenCustom, setImagenCustom] = useState(null);

  // Cargar imagen desde archivo local
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagenCustom(imageUrl);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-[#3B0A5E] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Regresar al menú
      </button>

      <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm">
        {/* ENCABEZADO CON AVATAR EN TIEMPO REAL */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-6 border-b border-border text-center sm:text-left">
          <div className="relative group">
            {imagenCustom ? (
              <img
                src={imagenCustom}
                alt="Foto de perfil"
                className="w-20 h-20 rounded-2xl object-cover border-2 border-[#3B0A5E] shadow-md"
              />
            ) : (
              <div
                className={`w-20 h-20 rounded-2xl ${avatarSeleccionado.bg} text-white flex items-center justify-center font-bold text-3xl shadow-md transition-all`}
              >
                {avatarSeleccionado.emoji}
              </div>
            )}

            {/* Botón flotante para subir foto */}
            <label className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-card border border-border shadow-md cursor-pointer hover:bg-secondary transition-colors">
              <Camera className="w-4 h-4 text-foreground" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">
              Perfil del Docente
            </h1>
            <p className="text-sm text-muted-foreground">
              Personaliza tu identidad y datos de la cuenta en Booki
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* SECCIÓN: ELECCIÓN DE AVATAR */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Selecciona un Avatar
            </label>
            <div className="flex flex-wrap gap-3">
              {AVATARES.map((av) => (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => {
                    setAvatarSeleccionado(av);
                    setImagenCustom(null); // Quita foto custom si elige avatar
                  }}
                  className={`w-12 h-12 rounded-2xl ${av.bg} text-white text-xl flex items-center justify-center transition-all ${
                    !imagenCustom && avatarSeleccionado.id === av.id
                      ? "ring-4 ring-[#3B0A5E]/40 scale-110 shadow-md"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  {av.emoji}
                </button>
              ))}
            </div>
          </div>

          {/* CAMPO: NOMBRE COMPLETO */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Nombre completo
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="pl-10 h-12 rounded-2xl border-2 border-border focus-visible:border-[#3B0A5E]"
                required
              />
            </div>
          </div>

          {/* CAMPO: CORREO ELECTRÓNICO */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 rounded-2xl border-2 border-border focus-visible:border-[#3B0A5E]"
                required
              />
            </div>
          </div>

          {/* BOTÓN DE GUARDAR */}
          <div className="pt-4 flex items-center justify-between">
            <div className="h-6">
              {saved && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-semibold"
                >
                  <CheckCircle2 className="w-4 h-4" /> Perfil actualizado
                  correctamente
                </motion.span>
              )}
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#3B0A5E] hover:bg-[#4A1D6D] text-white font-medium text-sm shadow-md active:scale-95 transition-all"
            >
              <Save className="w-4 h-4" /> Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
