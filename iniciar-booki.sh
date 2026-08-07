#!/usr/bin/env bash
# ============================================================
# Iniciar Booki completo (login + alumnos + actividades + front)
# Ejecuta este archivo para levantar los 4 servicios a la vez.
# Ctrl+C en esta terminal apaga los 4.
# ============================================================

RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACK="$RAIZ/backend"
LOGS="$RAIZ/.booki-logs"
mkdir -p "$LOGS"

PIDS=()

cleanup() {
  echo
  echo "Apagando los 4 servicios..."
  for pid in "${PIDS[@]}"; do
    kill "$pid" 2>/dev/null
  done
  exit 0
}
trap cleanup INT TERM

start_service() {
  local name="$1" dir="$2"
  echo "Levantando $name..."
  (cd "$dir" && npm run dev > "$LOGS/$name.log" 2>&1) &
  PIDS+=($!)
}

start_service "login" "$BACK/login"
sleep 1
start_service "alumnos" "$BACK/alumnos"
sleep 1
start_service "actividades" "$BACK/actividades"
sleep 1
start_service "frontend" "$RAIZ/frontend/Booki"

echo
echo "Los 4 servicios estan corriendo en segundo plano."
echo "Logs en: $LOGS/"
echo "Abriendo el navegador en unos segundos..."
sleep 6

URL="http://localhost:5173"
if command -v open >/dev/null 2>&1; then
  open "$URL"        # macOS
elif command -v xdg-open >/dev/null 2>&1; then
  xdg-open "$URL"     # Linux
else
  echo "Abre manualmente: $URL"
fi

echo
echo "Presiona Ctrl+C aqui para apagar los 4 servicios."
wait
