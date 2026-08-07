import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  User,
  Palette,
  Eye,
  ShieldCheck,
  Sun,
  Moon,
  Monitor,
  Type,
  Contrast,
  Save,
  CheckCircle2,
  ArrowLeft,
  RotateCcw,
} from "lucide-react"; // 👈 Se agregó RotateCcw
import { Input } from "@/components/ui/input";

export default function Configuracion() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("accesibilidad");
  const [savedMessage, setSavedMessage] = useState(false);
  const [resetMessage, setResetMessage] = useState(false);

  // ESTADOS
  const [theme, setTheme] = useState(
    () => localStorage.getItem("app_theme") || "claro",
  );
  const [fontSize, setFontSize] = useState(
    () => localStorage.getItem("app_fontsize") || "normal",
  );
  const [highContrast, setHighContrast] = useState(
    () => localStorage.getItem("app_highcontrast") === "true",
  );
  const [dyslexicFont, setDyslexicFont] = useState(
    () => localStorage.getItem("app_dyslexic") === "true",
  );

  // EFECTO DE CAMBIOS EN TIEMPO REAL
  useEffect(() => {
    const html = document.documentElement;

    // TEMA
    if (
      theme === "oscuro" ||
      (theme === "sistema" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    // TAMAÑO DE LETRA
    html.classList.remove("text-grande", "text-gigante");
    if (fontSize === "grande") html.classList.add("text-grande");
    if (fontSize === "gigante") html.classList.add("text-gigante");

    // ALTO CONTRASTE
    if (highContrast) {
      html.classList.add("high-contrast");
    } else {
      html.classList.remove("high-contrast");
    }

    // DISLEXIA
    if (dyslexicFont) {
      html.classList.add("font-dyslexic");
    } else {
      html.classList.remove("font-dyslexic");
    }
  }, [theme, fontSize, highContrast, dyslexicFont]);

  // GUARDAR CAMBIOS
  const handleSave = () => {
    localStorage.setItem("app_theme", theme);
    localStorage.setItem("app_fontsize", fontSize);
    localStorage.setItem("app_highcontrast", highContrast.toString());
    localStorage.setItem("app_dyslexic", dyslexicFont.toString());

    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  // RESTABLECER VALORES PREDETERMINADOS
  const handleResetDefaults = () => {
    // 1. Restaurar estados visuales
    setTheme("claro");
    setFontSize("normal");
    setHighContrast(false);
    setDyslexicFont(false);

    // 2. Limpiar en localStorage
    localStorage.setItem("app_theme", "claro");
    localStorage.setItem("app_fontsize", "normal");
    localStorage.setItem("app_highcontrast", "false");
    localStorage.setItem("app_dyslexic", "false");

    // 3. Mostrar confirmación
    setResetMessage(true);
    setTimeout(() => setResetMessage(false), 3000);
  };

  const tabs = [
    { id: "perfil", label: "Perfil", icon: User },
    { id: "apariencia", label: "Tema y Apariencia", icon: Palette },
    { id: "accesibilidad", label: "Visión y Accesibilidad", icon: Eye },
    { id: "seguridad", label: "Seguridad y Cuenta", icon: ShieldCheck },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* BOTÓN DE REGRESAR */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-[#3B0A5E] transition-colors mb-6 w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        Regresar al menú
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-foreground">
          Ajustes del sistema
        </h1>
        <p className="text-muted-foreground mt-1">
          Personaliza tu experiencia, tema y opciones de accesibilidad en Booki.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-sm transition-all ${
                  isActive
                    ? "bg-[#3B0A5E] text-white shadow-md"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </aside>

        {/* Contenido */}
        <main className="flex-1 bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm transition-colors duration-300">
          <AnimatePresence mode="wait">
            {/* PESTAÑA: APARIENCIA */}
            {activeTab === "apariencia" && (
              <motion.div
                key="apariencia"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-heading font-bold text-foreground">
                    Tema del sistema
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Selecciona cómo quieres que se vea la interfaz.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div
                    onClick={() => setTheme("claro")}
                    className={`cursor-pointer border-2 rounded-2xl p-4 flex flex-col items-center gap-3 transition-all ${theme === "claro" ? "border-[#3B0A5E] bg-purple-500/10 ring-2 ring-[#3B0A5E]/20" : "border-border"}`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                      <Sun className="w-6 h-6" />
                    </div>
                    <span className="font-semibold text-sm">Modo Claro</span>
                  </div>
                  <div
                    onClick={() => setTheme("oscuro")}
                    className={`cursor-pointer border-2 rounded-2xl p-4 flex flex-col items-center gap-3 transition-all ${theme === "oscuro" ? "border-[#3B0A5E] bg-purple-500/10 ring-2 ring-[#3B0A5E]/20" : "border-border"}`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-purple-900 text-purple-200 flex items-center justify-center">
                      <Moon className="w-6 h-6" />
                    </div>
                    <span className="font-semibold text-sm">Modo Oscuro</span>
                  </div>
                  <div
                    onClick={() => setTheme("sistema")}
                    className={`cursor-pointer border-2 rounded-2xl p-4 flex flex-col items-center gap-3 transition-all ${theme === "sistema" ? "border-[#3B0A5E] bg-purple-500/10 ring-2 ring-[#3B0A5E]/20" : "border-border"}`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-secondary text-foreground flex items-center justify-center">
                      <Monitor className="w-6 h-6" />
                    </div>
                    <span className="font-semibold text-sm">Sistema</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PESTAÑA: ACCESIBILIDAD */}
            {activeTab === "accesibilidad" && (
              <motion.div
                key="accesibilidad"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-heading font-bold text-foreground">
                    Opciones de Visión y Accesibilidad
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Herramientas diseñadas para mejorar la legibilidad.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="border border-border rounded-2xl p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <Type className="w-5 h-5 text-purple-600" />
                      <div>
                        <h3 className="font-semibold text-sm">
                          Tamaño de letra
                        </h3>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      {["normal", "grande", "gigante"].map((size) => (
                        <button
                          key={size}
                          onClick={() => setFontSize(size)}
                          className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize border transition-all ${fontSize === size ? "bg-[#3B0A5E] text-white border-[#3B0A5E]" : "border-border hover:bg-secondary"}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="border border-border rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Contrast className="w-5 h-5 text-amber-500" />
                      <div>
                        <h3 className="font-semibold text-sm">
                          Modo Alto Contraste
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Aumenta la diferencia entre texto y fondo.
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={highContrast}
                      onChange={(e) => setHighContrast(e.target.checked)}
                      className="w-5 h-5 accent-[#3B0A5E] rounded cursor-pointer"
                    />
                  </div>
                  <div className="border border-border rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Type className="w-5 h-5 text-teal-500" />
                      <div>
                        <h3 className="font-semibold text-sm">
                          Fuente especial para Dislexia
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Aplica una tipografía optimizada (OpenDyslexic).
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={dyslexicFont}
                      onChange={(e) => setDyslexicFont(e.target.checked)}
                      className="w-5 h-5 accent-[#3B0A5E] rounded cursor-pointer"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* SEGURIDAD Y CUENTA */}
            {activeTab === "seguridad" && (
              <motion.div
                key="seguridad"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-heading font-bold text-foreground">
                    Seguridad
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground">
                      Contraseña actual
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="h-11 rounded-xl"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* PERFIL */}
            {activeTab === "perfil" && (
              <motion.div
                key="perfil"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-heading font-bold text-foreground">
                    Perfil del Docente
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground">
                      Nombre completo
                    </label>
                    <Input
                      type="text"
                      defaultValue="Profesor / Educador"
                      className="h-11 rounded-xl"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
            {/* Mensajes de feedback */}
            <div className="h-6">
              {savedMessage && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium"
                >
                  <CheckCircle2 className="w-4 h-4" /> Ajustes guardados
                </motion.div>
              )}
              {resetMessage && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-sm font-medium"
                >
                  <RotateCcw className="w-4 h-4" /> Valores restablecidos
                </motion.div>
              )}
            </div>

            {/* Botones de acción */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleResetDefaults}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-secondary/80 hover:bg-secondary text-foreground font-medium text-sm transition-all shadow-sm active:scale-95 border border-border"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Restablecer</span>
              </button>

              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-[#3B0A5E] hover:bg-[#4A1D6D] text-white font-medium text-sm transition-all shadow-md active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">Guardar cambios</span>
                <span className="sm:hidden">Guardar</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
