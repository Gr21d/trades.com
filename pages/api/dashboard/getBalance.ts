import { PrismaClient, Prisma} from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {portfolioId} = req.body;

    try {
      console.log('here1');

      const portfolio = await prisma.portfolio.findUnique({
        where: { id: portfolioId },
      });

      if (!portfolio) {
        res.status(404).json({ error: 'Portfolio not found' });
        return;
      }

      console.log('here2');
      
      const balance = await prisma.cryptoPortfolioOwned.findFirst({
        where: {
          portfolioId: portfolioId,
          cryptoId: 9,
        },
      })

      res.status(200).json({balance});
    } catch (error) {
      console.error('Error getting balance:', error);
      console.error('Error object:', error);
      res.status(500).json({ error: 'Failed to get Balance' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}