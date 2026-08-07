# Cómo levantar el backend de Booki y conectarlo con el frontend

## Opción rápida: scripts automáticos

En la raíz del proyecto (`BOOKIE/`) hay 4 scripts que hacen todo el trabajo
manual descrito más abajo:

| Script | Cuándo usarlo | Qué hace |
|---|---|---|
| `instalar-booki.bat` (Windows) / `instalar-booki.sh` (Mac/Linux) | Una sola vez (o si cambian dependencias / el schema) | `npm install` en los 4 proyectos, `prisma generate` x3, `prisma migrate dev` una vez, y carga el seed de actividades |
| `iniciar-booki.bat` (Windows) / `iniciar-booki.sh` (Mac/Linux) | Cada vez que quieras trabajar | Levanta los 4 servicios a la vez y abre el navegador en `http://localhost:5173` |

Requisito antes de correr `instalar-booki`: tener `DATABASE_URL` ya
configurado en los `.env` de `login/`, `alumnos/` y `actividades/` (ver
sección "2. Configurar cada servicio" más abajo). En Mac/Linux, si es la
primera vez, dale permiso de ejecución con `chmod +x instalar-booki.sh
iniciar-booki.sh` (ya vienen así en este zip, pero por si el sistema los
resetea al descomprimir).

Si prefieres hacerlo paso a paso a mano (o algo falla y quieres ver dónde),
sigue la guía completa de abajo.

---

## Guía manual paso a paso

Este backend está formado por **3 microservicios independientes** (cada uno
con su propio `package.json` y su propio `prisma/schema.prisma`, pero todos
apuntan a la **misma base de datos** PostgreSQL):

| Servicio      | Carpeta         | Puerto por defecto | Qué hace                                   |
|---------------|-----------------|---------------------|---------------------------------------------|
| `login`       | `login/`        | `4000`              | `POST /login`, `POST /register` (JWT)       |
| `alumnos`     | `alumnos/`      | `3001`              | CRUD de `/api/alumnos` y `/api/maestros`    |
| `actividades` | `actividades/`  | `3002`              | `/api/actividades`, `/api/intentos-actividades`, reportes |

El frontend (`Booki/`) ya está configurado para hablar con esos 3 puertos
por defecto (ver `Booki/.env.example`).

## 1. Crear la base de datos

Necesitas PostgreSQL corriendo localmente (o accesible por red) y una base
de datos vacía, por ejemplo `Bookie`:

```sql
CREATE DATABASE "Bookie";
```

## 2. Configurar cada servicio

En **cada una** de las 3 carpetas (`login/`, `alumnos/`, `actividades/`)
copia el archivo `.env.example` a `.env` y ajusta `DATABASE_URL`:

```bash
cd login && cp .env.example .env && cd ..
cd alumnos && cp .env.example .env && cd ..
cd actividades && cp .env.example .env && cd ..
```

**Importante:** `JWT_SECRET` debe ser exactamente el mismo valor en los 3
archivos `.env` (el servicio `login` firma el token y los otros dos lo
verifican).

## 3. Instalar dependencias y generar Prisma

Repite esto en cada una de las 3 carpetas:

```bash
npm install
npx prisma generate
```

## 4. Crear las tablas

Como los 3 `schema.prisma` describen el mismo esquema, basta con correr la
migración **una sola vez**, desde cualquiera de los servicios (por ejemplo
`login`):

```bash
cd login
npx prisma migrate dev --name init
cd ..
```

Esto crea las tablas `maestros`, `alumnos`, `actividades` e
`intentos_actividades` en la base de datos compartida.

### (Opcional) Cargar actividades de ejemplo

El servicio `actividades` incluye un seed con actividades de muestra para
cada nivel de lectura:

```bash
cd actividades
npm run prisma
node prisma/seed.js
cd ..
```

## 5. Levantar los 3 servicios

En 3 terminales distintas:

```bash
cd login && npm run dev
```
```bash
cd alumnos && npm run dev
```
```bash
cd actividades && npm run dev
```

Deberías ver:
```
Servicio de login corriendo en puerto 4000
Servidor backend corriendo en puerto 3001
Servidor backend corriendo en puerto 3002
```

## 6. Levantar el frontend

En la carpeta `Booki/` (el proyecto de React/Vite con el diseño):

```bash
npm install
npm run dev
```

Por defecto el frontend ya apunta a `http://localhost:4000`,
`http://localhost:3001` y `http://localhost:3002`. Si tus servicios corren
en otras direcciones, copia `Booki/.env.example` a `Booki/.env` y ajusta las
3 variables `VITE_AUTH_API_URL`, `VITE_ALUMNOS_API_URL` y
`VITE_ACTIVIDADES_API_URL`.

## Qué quedó conectado

- **Login / Registro**: `Login.jsx` y `Register.jsx` llaman al servicio
  `login` real (`/login`, `/register`) y guardan el JWT devuelto.
  - El paso de "código OTP" en el registro se mantiene visualmente igual,
    pero como el backend no tiene envío de correos, al introducir el
    código se inicia sesión directamente con la cuenta recién creada.
  - El botón "Continuar con Google" avisa que no está disponible en este
    backend (no hay OAuth de Google implementado).
  - "Olvidé mi contraseña" / restablecer contraseña: el backend tampoco
    tiene estos endpoints, así que esas pantallas quedan visualmente
    intactas pero sin efecto real.
- **Alumnos**: `Home.jsx`, `RegistroAlumno.jsx` y `SeleccionNivel.jsx`
  usan el servicio `alumnos` real (requiere estar autenticado).
- **Actividades y niveles**: `SeleccionNivel.jsx` y
  `ActividadesPorNivel.jsx` usan el servicio `actividades` real,
  incluyendo el registro de intentos/puntajes.
- **Condiciones/neurodivergencias** en el formulario de alta de alumno: el
  backend no tiene esa entidad (solo guarda un texto libre por alumno), así
  que el frontend usa un catálogo fijo y guarda las condiciones
  seleccionadas unidas en un solo texto.

## Cambios que se hicieron en este backend

- Se corrigió un bug en `actividades/src/lib/jwt.js` (usaba `jwt.verify`
  sin importar la librería `jsonwebtoken`).
- Se separaron los puertos por defecto de `alumnos` (3001) y `actividades`
  (3002), que antes ambos caían en `3000` por defecto y no podían correr
  al mismo tiempo.
- Se agregaron los archivos `.env.example` en los 3 servicios.

No se modificó el diseño del frontend: solo se reemplazó
`Booki/src/api/base44Client.js` (el "mock" con datos falsos) por un
cliente real que llama a estos 3 servicios — hoy vive renombrado en
`Booki/src/api/apiClient.js` — y se simplificó
`Booki/src/lib/AuthContext.jsx`, que antes dependía de un SDK de una
plataforma SaaS externa ("base44") que no aplica a este proyecto.
