-- CreateTable
CREATE TABLE "ElectricCompany" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElectricBill" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "companyId" INTEGER NOT NULL,
    "usage" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ElectricBill" ADD FOREIGN KEY ("companyId") REFERENCES "ElectricCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;
