import { PrismaClient, Prisma} from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let {portfolioId} = req.query;

    portfolioId = parseInt(portfolioId);

    try {
      console.log('here1');

      const portfolio = await prisma.portfolio.findUnique({
        where: { id: portfolioId },
      });

      if (!portfolio) {
        res.status(404).json({ error: 'Portfolio not found' });
        return;
      }
      
      res.status(200).json({ portfolio});
    } catch (error) {
      console.error('Error creating transaction:', error);
      console.error('Error object:', error);
      res.status(500).json({ error: 'Failed to create transaction' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}