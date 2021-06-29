-- CreateTable
CREATE TABLE "Glucose" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "level" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);
