/*
  Warnings:

  - The primary key for the `CryptoPortfoliosOwned` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[symbol]` on the table `Cryptocurrencies` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "currentPrice" REAL NOT NULL DEFAULT 0.0,
    "dateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "investorId" INTEGER NOT NULL,
    "cryptoId" INTEGER,
    "portfolioId" INTEGER NOT NULL,
    CONSTRAINT "Transactions_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transactions_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investors" ("investorId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transactions_cryptoId_fkey" FOREIGN KEY ("cryptoId") REFERENCES "Cryptocurrencies" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Transactions" ("amount", "cryptoId", "dateTime", "id", "investorId", "portfolioId", "type") SELECT "amount", "cryptoId", "dateTime", "id", "investorId", "portfolioId", "type" FROM "Transactions";
DROP TABLE "Transactions";
ALTER TABLE "new_Transactions" RENAME TO "Transactions";
CREATE TABLE "new_CryptoPortfoliosOwned" (
    "id" INTEGER NOT NULL,
    "portfolioId" INTEGER NOT NULL,
    "cryptoId" INTEGER NOT NULL,
    "quantity" REAL NOT NULL,

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

-- CreateIndex
CREATE UNIQUE INDEX "Cryptocurrencies_symbol_key" ON "Cryptocurrencies"("symbol");
