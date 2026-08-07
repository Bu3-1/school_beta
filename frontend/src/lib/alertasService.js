// src/lib/alertasService.js

/**
 * Revisa el historial de intentos de todos los alumnos y genera alertas de estancamiento.
 */
export function generarAlertasEstancamiento(alumnos = [], intentos = [], actividades = []) {
  const alertas = [];

  alumnos.forEach((alumno) => {
    // Filtrar los intentos de este alumno
    const intentosAlumno = intentos.filter((i) => String(i.alumno_id) === String(alumno.id));

    // Agrupar intentos por actividad
    const intentosPorActividad = {};
    intentosAlumno.forEach((intento) => {
      if (!intentosPorActividad[intento.actividad_id]) {
        intentosPorActividad[intento.actividad_id] = [];
      }
      intentosPorActividad[intento.actividad_id].push(intento);
    });

    // Analizar el historial de cada actividad
    Object.keys(intentosPorActividad).forEach((actividadId) => {
      // Ordenar de más reciente a más antiguo
      const historial = intentosPorActividad[actividadId].sort(
        (a, b) => new Date(b.fecha) - new Date(a.fecha)
      );

      // Si los últimos 3 intentos consecutivos tienen un puntaje menor a 60
      if (historial.length >= 3) {
        const ultimosTres = historial.slice(0, 3);
        const estanEstancados = ultimosTres.every((i) => Number(i.puntaje) < 60);

        if (estanEstancados) {
          const actividadInfo = actividades.find((a) => String(a.id) === String(actividadId));
          alertas.push({
            id: `alerta-${alumno.id}-${actividadId}`,
            alumnoId: alumno.id,
            alumnoNombre: alumno.nombre_anonimizado || alumno.nombre || "Alumno",
            actividadId,
            actividadTitulo: actividadInfo?.titulo || "Actividad",
            nivel: actividadInfo?.nivel || "General",
            ultimosPuntajes: ultimosTres.map((i) => i.puntaje),
            fecha: ultimosTres[0].fecha,
            mensaje: `Ha fallado 3 veces consecutivas en "${actividadInfo?.titulo || 'una actividad'}". Se sugiere intervención docente.`,
          });
        }
      }
    });
  });

  return alertas;
}