/*
  Warnings:

  - You are about to drop the column `currentPrice` on the `Cryptocurrencies` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cryptocurrencies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL
);
INSERT INTO "new_Cryptocurrencies" ("id", "name", "symbol") SELECT "id", "name", "symbol" FROM "Cryptocurrencies";
DROP TABLE "Cryptocurrencies";
ALTER TABLE "new_Cryptocurrencies" RENAME TO "Cryptocurrencies";
CREATE UNIQUE INDEX "Cryptocurrencies_name_key" ON "Cryptocurrencies"("name");
CREATE UNIQUE INDEX "Cryptocurrencies_symbol_key" ON "Cryptocurrencies"("symbol");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
