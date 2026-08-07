#!/usr/bin/env bash
# ============================================================
# Instalar Booki (correr UNA SOLA VEZ, o cuando cambien
# dependencias / el schema de la base de datos).
#
# Hace, en orden:
#   1) npm install en login, alumnos, actividades y frontend
#   2) npx prisma generate en login, alumnos, actividades
#   3) npx prisma migrate dev (crea las tablas, una sola vez
#      para los 3 servicios porque comparten la misma BD)
#   4) node prisma/seed.js (carga actividades de ejemplo)
#
# Requiere tener ya configurado el DATABASE_URL en los .env
# de login/, alumnos/ y actividades/ (ver CONEXION_BACKEND.md).
# ============================================================

set -e

RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACK="$RAIZ/backend"

echo "============================================"
echo " 1/4  Instalando dependencias..."
echo "============================================"

echo; echo "-- login --"
(cd "$BACK/login" && npm install)

echo; echo "-- alumnos --"
(cd "$BACK/alumnos" && npm install)

echo; echo "-- actividades --"
(cd "$BACK/actividades" && npm install)

echo; echo "-- frontend --"
(cd "$RAIZ/frontend/Booki" && npm install)

echo
echo "============================================"
echo " 2/4  Generando clientes de Prisma..."
echo "============================================"

(cd "$BACK/login" && npx prisma generate)
(cd "$BACK/alumnos" && npx prisma generate)
(cd "$BACK/actividades" && npx prisma generate)

echo
echo "============================================"
echo " 3/4  Creando tablas en la base de datos..."
echo " (esto corre la migracion una sola vez, desde"
echo "  'login' - los 3 servicios comparten la BD)"
echo "============================================"

(cd "$BACK/login" && npx prisma migrate dev --name init)

echo
echo "============================================"
echo " 4/4  Cargando actividades de ejemplo..."
echo "============================================"

(cd "$BACK/actividades" && node prisma/seed.js)

echo
echo "============================================"
echo " Listo. Instalacion completa."
echo " Ahora puedes usar ./iniciar-booki.sh para"
echo " levantar los 4 servicios."
echo "============================================"
