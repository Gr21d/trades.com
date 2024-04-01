// pages/api/dashboard/transactions.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { type, amount, investorId, cryptoSymbol, portfolioId } = req.body;

    try {
      const transaction = await prisma.transaction.create({
        data: {
          type,
          amount,
          investorId,
          cryptocurrency: {
            connect: { symbol: cryptoSymbol },
          },
          portfolioId,
        },
      });

      res.status(200).json(transaction);
    } catch (error) {
      console.error('Error creating transaction:', error);
      res.status(500).json({ error: 'Failed to create transaction' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}