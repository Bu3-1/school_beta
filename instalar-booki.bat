@echo off
REM ============================================================
REM  Instalar Booki (correr UNA SOLA VEZ, o cuando cambien
REM  dependencias / el schema de la base de datos).
REM
REM  Hace, en orden:
REM    1) npm install en login, alumnos, actividades y frontend
REM    2) npx prisma generate en login, alumnos, actividades
REM    3) npx prisma migrate dev (crea las tablas, una sola vez
REM       para los 3 servicios porque comparten la misma BD)
REM    4) node prisma/seed.js (carga actividades de ejemplo)
REM
REM  Requiere tener ya configurado el DATABASE_URL en los .env
REM  de login/, alumnos/ y actividades/ (ver CONEXION_BACKEND.md).
REM ============================================================

set RAIZ=%~dp0
set BACK=%RAIZ%backend

echo ============================================
echo  1/4  Instalando dependencias...
echo ============================================

echo.
echo -- login --
cd /d "%BACK%\login" && call npm install
if errorlevel 1 goto :error

echo.
echo -- alumnos --
cd /d "%BACK%\alumnos" && call npm install
if errorlevel 1 goto :error

echo.
echo -- actividades --
cd /d "%BACK%\actividades" && call npm install
if errorlevel 1 goto :error

echo.
echo -- frontend --
cd /d "%RAIZ%frontend\Booki" && call npm install
if errorlevel 1 goto :error

echo.
echo ============================================
echo  2/4  Generando clientes de Prisma...
echo ============================================

cd /d "%BACK%\login" && call npx prisma generate
if errorlevel 1 goto :error

cd /d "%BACK%\alumnos" && call npx prisma generate
if errorlevel 1 goto :error

cd /d "%BACK%\actividades" && call npx prisma generate
if errorlevel 1 goto :error

echo.
echo ============================================
echo  3/4  Creando tablas en la base de datos...
echo  (esto corre la migracion una sola vez, desde
echo   "login" - los 3 servicios comparten la BD)
echo ============================================

cd /d "%BACK%\login" && call npx prisma migrate dev --name init
if errorlevel 1 goto :error

echo.
echo ============================================
echo  4/4  Cargando actividades de ejemplo...
echo ============================================

cd /d "%BACK%\actividades" && call node prisma\seed.js
if errorlevel 1 goto :error

echo.
echo ============================================
echo  Listo. Instalacion completa.
echo  Ahora puedes usar iniciar-booki.bat para
echo  levantar los 4 servicios.
echo ============================================
pause
exit /b 0

:error
echo.
echo ============================================
echo  Algo fallo (revisa el mensaje de error arriba).
echo  Causas comunes:
echo   - DATABASE_URL mal configurado en los .env
echo   - La base de datos de Neon no acepta la conexion
echo     "-pooler" para migrar: usa la conexion directa
echo     (sin "-pooler") solo para este paso, en los 3 .env
echo   - No tienes Node.js instalado
echo ============================================
pause
exit /b 1
