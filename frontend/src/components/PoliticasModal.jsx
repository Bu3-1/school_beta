import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Lock } from "lucide-react";

export default function PoliticasModal({
  isOpen,
  onClose,
  tipo = "privacidad",
}) {
  if (!isOpen) return null;

  const esPrivacidad = tipo === "privacidad";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-card border border-border w-full max-w-lg rounded-3xl p-6 shadow-2xl relative max-h-[85vh] flex flex-col"
        >
          {/* Cabecera */}
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-purple-500/10 text-[#3B0A5E] dark:text-purple-300">
                {esPrivacidad ? (
                  <Lock className="w-5 h-5" />
                ) : (
                  <ShieldCheck className="w-5 h-5" />
                )}
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground">
                {esPrivacidad
                  ? "Política de Privacidad"
                  : "Términos de Servicio"}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-muted-foreground hover:bg-secondary transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cuerpos del Texto Legal */}
          <div className="py-4 space-y-4 overflow-y-auto text-xs text-muted-foreground leading-relaxed pr-1 flex-1">
            {esPrivacidad ? (
              <>
                <p>
                  En <strong>Bookie</strong> nos tomamos muy en serio la
                  seguridad y protección de la información de los estudiantes y
                  docentes.
                </p>
                <h4 className="font-bold text-foreground text-sm">
                  1. Protección de Datos de Menores
                </h4>
                <p>
                  Los perfiles de estudiantes utilizan nombres anonimizados o
                  seudónimos para garantizar la confidencialidad y la protección
                  de su identidad en entornos escolares.
                </p>
                <h4 className="font-bold text-foreground text-sm">
                  2. Uso de la Información
                </h4>
                <p>
                  Los registros de aciertos, intentos y avance de lectoescritura
                  recopilados en esta plataforma se utilizan únicamente con
                  fines pedagógicos y para el seguimiento por parte del docente
                  a cargo.
                </p>
                <h4 className="font-bold text-foreground text-sm">
                  3. Almacenamiento Seguro
                </h4>
                <p>
                  Ningún dato personal o diagnóstico de aprendizaje será
                  compartido con terceros ni comercializado bajo ninguna
                  circunstancia.
                </p>
              </>
            ) : (
              <>
                <p>
                  Bienvenido a <strong>Bookie</strong>, la plataforma de apoyo
                  interactivo para el desarrollo de la lectoescritura infantil.
                </p>
                <h4 className="font-bold text-foreground text-sm">
                  1. Uso Aceptable
                </h4>
                <p>
                  Esta plataforma está diseñada para ser utilizada por docentes,
                  educadores y tutores autorizados dentro del aula escolar o
                  entorno de apoyo pedagógico.
                </p>
                <h4 className="font-bold text-foreground text-sm">
                  2. Responsabilidad del Usuario
                </h4>
                <p>
                  El usuario es responsable de mantener la confidencialidad de
                  sus credenciales de acceso y de supervisar el uso adecuado de
                  las actividades por parte de los alumnos.
                </p>
                <h4 className="font-bold text-foreground text-sm">
                  3. Disponibilidad del Servicio
                </h4>
                <p>
                  Nos esforzamos por mantener la aplicación disponible y
                  optimizada continuamente para facilitar las sesiones de
                  lectura diaria.
                </p>
              </>
            )}
          </div>

          {/* Botón de cierre */}
          <div className="pt-3 border-t border-border text-right">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl bg-[#3B0A5E] hover:bg-[#4A1D6D] text-white font-semibold text-xs transition-all shadow-xs cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
