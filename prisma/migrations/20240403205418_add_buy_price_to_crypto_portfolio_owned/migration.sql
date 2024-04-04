/*
  Warnings:

  - Added the required column `buyPrice` to the `CryptoPortfoliosOwned` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CryptoPortfoliosOwned" (
    "id" INTEGER NOT NULL,
    "portfolioId" INTEGER NOT NULL,
    "cryptoId" INTEGER NOT NULL,
    "quantity" REAL NOT NULL,
    "buyPrice" REAL NOT NULL,

    PRIMARY KEY ("portfolioId", "cryptoId"),
    CONSTRAINT "CryptoPortfoliosOwned_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CryptoPortfoliosOwned_cryptoId_fkey" FOREIGN KEY ("cryptoId") REFERENCES "Cryptocurrencies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CryptoPortfoliosOwned" ("cryptoId", "id", "portfolioId", "quantity") SELECT "cryptoId", "id", "portfolioId", "quantity" FROM "CryptoPortfoliosOwned";
DROP TABLE "CryptoPortfoliosOwned";
ALTER TABLE "new_CryptoPortfoliosOwned" RENAME TO "CryptoPortfoliosOwned";
CREATE UNIQUE INDEX "CryptoPortfoliosOwned_id_key" ON "CryptoPortfoliosOwned"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
