-- CreateTable
CREATE TABLE "Restaurants" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "propietario" TEXT NOT NULL,
    "direccion" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Restaurants_pkey" PRIMARY KEY ("id")
);
