/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Cryptocurrencies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Cryptocurrencies_name_key" ON "Cryptocurrencies"("name");
