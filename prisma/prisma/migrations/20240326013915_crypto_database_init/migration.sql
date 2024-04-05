/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userType" TEXT NOT NULL,
    "investorId" INTEGER,
    "adminId" INTEGER,
    "dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Admins" (
    "adminId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "adminType" TEXT NOT NULL,
    CONSTRAINT "Admins_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Investors" (
    "investorId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "portfolioId" INTEGER NOT NULL,
    CONSTRAINT "Investors_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Investors_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Portfolios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "balance" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "CryptoPortfoliosOwned" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "portfolioId" INTEGER NOT NULL,
    "cryptoId" INTEGER NOT NULL,
    "quantity" REAL NOT NULL,
    CONSTRAINT "CryptoPortfoliosOwned_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CryptoPortfoliosOwned_cryptoId_fkey" FOREIGN KEY ("cryptoId") REFERENCES "Cryptocurrencies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cryptocurrencies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "currentPrice" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "dateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "investorId" INTEGER NOT NULL,
    "cryptoId" INTEGER,
    "portfolioId" INTEGER NOT NULL,
    CONSTRAINT "Transactions_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transactions_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investors" ("investorId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transactions_cryptoId_fkey" FOREIGN KEY ("cryptoId") REFERENCES "Cryptocurrencies" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Blogs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "datePosted" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Blogs_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Investors" ("investorId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "datePosted" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blogId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Comments_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blogs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tutorials" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adminId" INTEGER NOT NULL,
    CONSTRAINT "Tutorials_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admins" ("adminId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SupportQueries" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "investorId" INTEGER NOT NULL,
    "adminId" INTEGER,
    CONSTRAINT "SupportQueries_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investors" ("investorId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SupportQueries_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admins" ("adminId") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ChatbotConversations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "investorId" INTEGER NOT NULL,
    "startDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" DATETIME,
    CONSTRAINT "ChatbotConversations_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investors" ("investorId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ChatbotMessages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "conversationId" INTEGER NOT NULL,
    "sender" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "dateTimeSent" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ChatbotMessages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "ChatbotConversations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Investors_portfolioId_key" ON "Investors"("portfolioId");
