import React, { useState, useEffect } from "react";
import { Bell, AlertTriangle, CheckCircle2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { apiClient } from "@/api/apiClient";
import { ACTIVIDADES_BOOKI } from "@/data/actividadesData";
import { generarAlertasEstancamiento } from "@/lib/alertasService";

export default function NotificacionesCampanita() {
  const [alertas, setAlertas] = useState([]);
  const [vistas, setVistas] = useState(false);

  useEffect(() => {
    // Cargar datos para verificar estancamientos
    Promise.all([
      apiClient.entities.Alumno.list(),
      apiClient.entities.IntentoActividad.list(),
    ])
      .then(([alumnos, intentos]) => {
        const listaAlertas = generarAlertasEstancamiento(
          alumnos,
          intentos,
          ACTIVIDADES_BOOKI,
        );
        setAlertas(listaAlertas);
      })
      .catch(() => {});
  }, []);

  return (
    <DropdownMenu onOpenChange={(open) => open && setVistas(true)}>
      <DropdownMenuTrigger className="relative p-2 rounded-2xl hover:bg-secondary transition-colors outline-none">
        <Bell className="w-5 h-5 text-foreground" />
        {/* Badge rojo si hay alertas no leídas */}
        {alertas.length > 0 && !vistas && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-background animate-pulse" />
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 sm:w-96 p-2 rounded-3xl shadow-xl border-border"
      >
        <div className="px-3 py-2 border-b border-border flex items-center justify-between">
          <span className="font-bold text-sm text-foreground">
            Alertas de Estancamiento
          </span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400">
            {alertas.length} {alertas.length === 1 ? "alerta" : "alertas"}
          </span>
        </div>

        <div className="max-h-80 overflow-y-auto py-1 space-y-1">
          {alertas.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground text-xs flex flex-col items-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              <span>¡Excelente! Ningún alumno presenta estancamiento.</span>
            </div>
          ) : (
            alertas.map((alerta) => (
              <DropdownMenuItem
                key={alerta.id}
                className="p-3 rounded-2xl cursor-pointer focus:bg-rose-500/5 flex items-start gap-3 border border-transparent hover:border-rose-200 dark:hover:border-rose-900/50 transition-all"
              >
                <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500 shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-foreground">
                      {alerta.alumnoNombre}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {alerta.nivel}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug">
                    {alerta.mensaje}
                  </p>
                  <div className="text-[10px] font-semibold text-rose-600 dark:text-rose-400">
                    Últimos puntajes: {alerta.ultimosPuntajes.join("% , ")}%
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
