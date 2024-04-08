import { PrismaClient, Prisma} from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { type, amount, investorId, portfolioId, currentPrice,priceBought, cryptoSymbol } = req.body;
    console.log('Request body:', req.body);

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

      let cryptocurrency = await prisma.cryptocurrency.findUnique({
        where: { name: cryptoSymbol },
      });
      
      console.log('here3');
      
      if (!cryptocurrency) {
        cryptocurrency = await prisma.cryptocurrency.create({
          data: {
            name: cryptoSymbol,
            symbol: cryptoSymbol,
            currentPrice: currentPrice,
          },
        });
        console.log('New cryptocurrency created:', cryptocurrency);
      }

      console.log('here3.5');

      const totalCost = amount * currentPrice;

      if (portfolio.balance < totalCost) {
        console.log('here4');
        res.status(400).json({ error: 'Insufficient balance' });
        return;
      }


      console.log('here 5')
      const transaction = await prisma.transaction.create({
        data: {
          type,
          amount,
          currentPrice,
          investor: { connect: { investorId } },
          portfolio: { connect: { id: portfolioId } },
        } as Prisma.TransactionCreateInput,
      });

      const transactionId = transaction.id;

      const updatedPortfolio = await prisma.portfolio.update({
        where: { id: portfolioId },
        data: { balance: { decrement: totalCost } },
      });

      console.log('here7');

      const generateUniqueId = async () => {
        const lastRecord = await prisma.cryptoPortfolioOwned.findFirst({
          orderBy: { id: 'desc' },
        });

        const lastId = lastRecord ? lastRecord.id : 0;
        console.log('Last ID:', lastId);
        return lastId + 1;
      };

      const cryptoPortfolioOwned = await prisma.cryptoPortfolioOwned.upsert({
        where: {
          portfolioId_cryptoId: {
            portfolioId: portfolioId,
            cryptoId: cryptocurrency.id,
          },
        },
        update: {
          quantity: { increment: amount },
        },
        create: {
          portfolioId: portfolioId,
          cryptoId: cryptocurrency.id,
          quantity: amount,
          priceBought: priceBought,
        },
      });
    

      res.status(200).json({ transaction, cryptoPortfolioOwned, updatedPortfolio, transactionId });
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