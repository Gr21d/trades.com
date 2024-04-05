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
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    CONSTRAINT "Transactions_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transactions_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investors" ("investorId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transactions_cryptoId_fkey" FOREIGN KEY ("cryptoId") REFERENCES "Cryptocurrencies" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Transactions" ("amount", "cryptoId", "currentPrice", "dateTime", "id", "investorId", "portfolioId", "type") SELECT "amount", "cryptoId", "currentPrice", "dateTime", "id", "investorId", "portfolioId", "type" FROM "Transactions";
DROP TABLE "Transactions";
ALTER TABLE "new_Transactions" RENAME TO "Transactions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
