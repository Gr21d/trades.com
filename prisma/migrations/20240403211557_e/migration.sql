/*
  Warnings:

  - The primary key for the `CryptoPortfoliosOwned` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CryptoPortfoliosOwned" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "portfolioId" INTEGER NOT NULL,
    "cryptoId" INTEGER NOT NULL,
    "quantity" REAL NOT NULL,
    CONSTRAINT "CryptoPortfoliosOwned_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CryptoPortfoliosOwned_cryptoId_fkey" FOREIGN KEY ("cryptoId") REFERENCES "Cryptocurrencies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CryptoPortfoliosOwned" ("cryptoId", "id", "portfolioId", "quantity") SELECT "cryptoId", "id", "portfolioId", "quantity" FROM "CryptoPortfoliosOwned";
DROP TABLE "CryptoPortfoliosOwned";
ALTER TABLE "new_CryptoPortfoliosOwned" RENAME TO "CryptoPortfoliosOwned";
CREATE UNIQUE INDEX "CryptoPortfoliosOwned_portfolioId_cryptoId_key" ON "CryptoPortfoliosOwned"("portfolioId", "cryptoId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
