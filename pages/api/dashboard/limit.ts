import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { orderId, currentPrice } = req.body;

    try {
      const buyOrder = await prisma.transaction.findUnique({
        where: { id: orderId },
        include: {
          portfolio: true,
          cryptocurrency: true,
        },
      });

      if (!buyOrder) {
        return res.status(404).json({ error: 'Buy order not found' });
      }

      if (buyOrder.status !== 'ACTIVE') {
        return res.status(400).json({ error: 'Buy order cannot be canceled' });
      }

      const buyPrice = buyOrder.currentPrice;
      const amount = buyOrder.amount;
      const potentialProfitOrLoss = (currentPrice - buyPrice) * amount;

      const updatedBuyOrder = await prisma.transaction.update({
        where: { id: orderId },
        data: { status: 'CANCELED' },
      });

      const updatedPortfolio = await prisma.portfolio.update({
        where: { id: buyOrder.portfolioId },
        data: { balance: { increment: potentialProfitOrLoss } },
      });

      return res.status(200).json({
        message: 'Buy order canceled successfully',
        updatedBuyOrder,
        updatedPortfolio,
      });
    } catch (error) {
      console.error('Error canceling buy order:', error);
      return res.status(500).json({ error: 'Failed to cancel buy order' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}