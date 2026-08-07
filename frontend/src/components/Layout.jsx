import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link, Outlet } from "react-router-dom";
import {
  Settings,
  LogOut,
  User,
  Bell,
  ChevronDown,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import Logo from "@/assets/Logo.png";
import { apiClient } from "@/api/apiClient";
import { ACTIVIDADES_BOOKI } from "@/data/actividadesData";
import { generarAlertasEstancamiento } from "@/lib/alertasService";

// Letras con tonos claros pastel para resaltar sobre fondo morado oscuro
const BOOKI_LETTERS = [
  { char: "B", color: "text-[#E9D5FF]" }, // Púrpura claro / lavanda
  { char: "o", color: "text-[#99F6E4]" }, // Menta pastel
  { char: "o", color: "text-[#FDE68A]" }, // Amarillo pastel
  { char: "k", color: "text-[#FBCFE8]" }, // Rosa pastel
  { char: "i", color: "text-[#A7F3D0]" }, // Verde pastel
  { char: "e", color: "text-[#FECACA]" }, // Rojo pastel
];

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [alertas, setAlertas] = useState([]);
  const [vistas, setVistas] = useState(false);
  const navigate = useNavigate();

  // Cargar datos y calcular alertas de estancamiento
  useEffect(() => {
    Promise.all([
      apiClient.entities.Alumno.filter({}),
      apiClient.entities.IntentoActividad.filter({}),
    ])
      .then(([alumnos, intentos]) => {
        const listaAlertas = generarAlertasEstancamiento(
          alumnos || [],
          intentos || [],
          ACTIVIDADES_BOOKI,
        );
        setAlertas(listaAlertas);
      })
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Barra superior con fondo morado profundo (#3B0A5E) */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-[#2A0845] via-[#4A1D6D] to-[#9E2A2B] border-b border-white/20 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo e Identidad (Redirige a Home al hacer clic) */}
          <Link
            to="/"
            className="flex items-center gap-3.5 group focus:outline-none"
          >
            <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/10 p-1 group-hover:scale-105 transition-transform">
              <img
                src={Logo}
                alt="Booki"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span
                style={{ fontFamily: "'Fredoka', cursive, sans-serif" }}
                className="font-black text-3xl sm:text-4xl tracking-wide leading-none flex items-center gap-0.5"
              >
                <style>
                  {`@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@700&display=swap');`}
                </style>

                {BOOKI_LETTERS.map((item, idx) => (
                  <span key={idx} className={item.color}>
                    {item.char}
                  </span>
                ))}
              </span>
            </div>
          </Link>

          {/* Menú de Notificaciones y Ajustes */}
          <div className="flex items-center gap-2 sm:gap-3 relative">
            {/* 👇 DESPLEGABLE DE CAMPANITA / ALERTAS DE ESTANCAMIENTO 👇 */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setBellOpen(!bellOpen);
                  setVistas(true);
                  if (menuOpen) setMenuOpen(false);
                }}
                className="p-2.5 rounded-xl text-purple-200 hover:text-white hover:bg-white/10 transition-colors relative focus:outline-none"
              >
                <Bell className="w-5 h-5" />
                {alertas.length > 0 && !vistas && (
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-[#3B0A5E] animate-pulse" />
                )}
              </button>

              <AnimatePresence>
                {bellOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setBellOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-card border border-border shadow-2xl p-2 z-50 overflow-hidden"
                    >
                      <div className="px-3 py-2 border-b border-border/60 flex items-center justify-between">
                        <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                          Alertas de Estancamiento
                        </span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400">
                          {alertas.length}{" "}
                          {alertas.length === 1 ? "alerta" : "alertas"}
                        </span>
                      </div>

                      <div className="max-h-80 overflow-y-auto py-1 space-y-1">
                        {alertas.length === 0 ? (
                          <div className="p-6 text-center text-muted-foreground text-xs flex flex-col items-center gap-2">
                            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                            <span>
                              ¡Excelente! Ningún alumno presenta estancamiento.
                            </span>
                          </div>
                        ) : (
                          alertas.map((alerta) => (
                            <div
                              key={alerta.id}
                              onClick={() => {
                                setBellOpen(false);
                                navigate(
                                  `/actividades/${alerta.alumnoId}/${alerta.nivel}`,
                                );
                              }}
                              className="p-3 rounded-xl cursor-pointer hover:bg-rose-500/5 flex items-start gap-3 border border-transparent hover:border-rose-200 dark:hover:border-rose-900/40 transition-all"
                            >
                              <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500 shrink-0 mt-0.5">
                                <AlertTriangle className="w-4 h-4" />
                              </div>
                              <div className="space-y-0.5">
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-xs text-foreground">
                                    {alerta.alumnoNombre}
                                  </span>
                                  <span className="text-[10px] text-muted-foreground font-medium">
                                    {alerta.nivel}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground leading-snug">
                                  {alerta.mensaje}
                                </p>
                                <div className="text-[10px] font-semibold text-rose-600 dark:text-rose-400 pt-1">
                                  Últimos puntajes:{" "}
                                  {alerta.ultimosPuntajes.join("% , ")}%
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Desplegable de Ajustes */}
            <div className="relative">
              <button
                onClick={() => {
                  setMenuOpen(!menuOpen);
                  if (bellOpen) setBellOpen(false);
                }}
                className={`flex items-center gap-2 p-1.5 pl-3 pr-2.5 rounded-xl border transition-all text-purple-100 ${
                  menuOpen
                    ? "border-purple-300 bg-white/20 ring-2 ring-purple-300/30"
                    : "border-purple-400/30 hover:border-purple-300 bg-white/10 hover:bg-white/15"
                }`}
              >
                <Settings className="w-4 h-4 text-purple-200" />
                <span className="text-sm font-medium hidden sm:inline">
                  Ajustes
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-purple-200 transition-transform duration-200 ${
                    menuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setMenuOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-56 rounded-2xl bg-card border border-border shadow-xl p-2 z-50 overflow-hidden"
                    >
                      <div className="px-3 py-2 border-b border-border/60 mb-1">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Opciones
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          navigate("/perfil");
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                      >
                        <User className="w-4 h-4 text-muted-foreground" />
                        Mi Perfil
                      </button>

                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          navigate("/configuracion");
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                      >
                        <Settings className="w-4 h-4 text-muted-foreground" />
                        Configuración
                      </button>

                      <div className="my-1 border-t border-border/60" />

                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Cerrar sesión
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido dinámico */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
