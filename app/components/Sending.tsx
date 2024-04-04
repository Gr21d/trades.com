import prisma from "@/server/prisma";
function Sending(username: string, coin: string, amount: number): boolean {
  const cryptos = prisma.cryptocurrency.findMany({
    select: {
      id: true,
      name: true,
      symbol: true,
    },
  });
  const ownedCrypto = prisma.cryptoPortfolioOwned.findMany({
    select: {
      id: true,
      portfolioId: true,
      cryptoId: true,
      quantity: true,
      buyPrice: true,
    },
    where: {
      portfolioId: { equals: 2 }, // change to be dynamic
    },
  });
  return true;
}

export default Sending;
