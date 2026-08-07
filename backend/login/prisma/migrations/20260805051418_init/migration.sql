-- CreateTable
CREATE TABLE "actividades" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(100) NOT NULL,
    "nivel" VARCHAR(100) NOT NULL,

    CONSTRAINT "actividades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alumnos" (
    "id" SERIAL NOT NULL,
    "nombre_anonimanizado" VARCHAR(50) NOT NULL,
    "edad" INTEGER NOT NULL,
    "grado" INTEGER NOT NULL,
    "grupo" TEXT NOT NULL,
    "condicion" VARCHAR(50) NOT NULL,
    "id_maestro" INTEGER NOT NULL,

    CONSTRAINT "alumnos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "intentos_actividades" (
    "id" SERIAL NOT NULL,
    "id_alumno" INTEGER NOT NULL,
    "id_actividad" INTEGER NOT NULL,
    "puntaje" INTEGER NOT NULL,
    "fecha" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "intentos_actividades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maestros" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "correo" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "maestros_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "correo" ON "maestros"("correo");
