const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Insert a User
  const user = await prisma.user.create({
    data: {
      username: 'omar_eltantawy',
      email: 'omar.com',
      password: 'securePassword',
      userType: 'investor',
    },
  });

  // Insert a Portfolio without an investor
  const portfolio = await prisma.portfolio.create({
    data: {
      balance: 1000.0,
    },
  });

  // Insert an Investor without a portfolio
  const investor = await prisma.investor.create({
    data: {
      userId: user.id,
      portfolio: {
        create: { balance: 1000.0 },
      },
    },
  });

  await prisma.portfolio.update({
    where: { id: portfolio.id },
    data: { investorId: investor.id },
  });

  await prisma.investor.update({
    where: { id: investor.id },
    data: { portfolioId: portfolio.id },
  });

  const cryptocurrency = await prisma.cryptocurrency.create({
    data: {
      name: 'Bitcoin',
      symbol: 'BTC',
      currentPrice: 50000.0,
    },
  });

  const transaction = await prisma.transaction.create({
    data: {
      type: 'buy',
      amount: 0.02,
      investorId: investor.id,
      cryptoId: cryptocurrency.id,
      portfolioId: portfolio.id,
    },
  });

  console.log({ user, portfolio, investor, cryptocurrency, transaction });
}

main()
  .catch(e => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
