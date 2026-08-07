@echo off
REM ============================================================
REM  Iniciar Booki completo (login + alumnos + actividades + front)
REM  Doble clic en este archivo para levantar los 4 servicios.
REM
REM  IMPORTANTE: si es la primera vez, corre antes
REM  "instalar-booki.bat" (instala dependencias, genera Prisma,
REM  crea las tablas y carga las actividades de ejemplo).
REM ============================================================

set RAIZ=%~dp0

if not exist "%RAIZ%backend\login\node_modules" (
  echo No parece que hayas corrido la instalacion todavia.
  echo Corre primero "instalar-booki.bat" y vuelve a intentar.
  pause
  exit /b 1
)

echo Levantando servicio de LOGIN (puerto 4000)...
start "Booki - login" cmd /k "cd /d %RAIZ%backend\login && npm run dev"

timeout /t 2 /nobreak >nul

echo Levantando servicio de ALUMNOS (puerto 3001)...
start "Booki - alumnos" cmd /k "cd /d %RAIZ%backend\alumnos && npm run dev"

timeout /t 2 /nobreak >nul

echo Levantando servicio de ACTIVIDADES (puerto 3002)...
start "Booki - actividades" cmd /k "cd /d %RAIZ%backend\actividades && npm run dev"

timeout /t 2 /nobreak >nul

echo Levantando FRONTEND (puerto 5173)...
start "Booki - frontend" cmd /k "cd /d %RAIZ%frontend && npm run dev"

echo.
echo Se abrieron 4 ventanas, una por cada servicio. Dejalas abiertas.
echo Abriendo el navegador en unos segundos...

timeout /t 6 /nobreak >nul
start http://localhost:5173

echo.
echo Listo. Puedes cerrar esta ventana (las otras 4 deben seguir abiertas).
pause