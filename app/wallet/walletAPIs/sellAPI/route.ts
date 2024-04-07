import prisma from "@/server/prisma";
import { error } from "console";
import { prototype } from "events";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
  try {
    const { symbol, amount, token, price } = await req.json();
    const idOfCrypto = await prisma.cryptocurrency.findMany({
      select: { id: true },
      where: { symbol: { equals: symbol } },
    });
    const idOfUSD = await prisma.cryptocurrency.findMany({
      select: {
        id: true,
      },
      where: {
        name: { equals: "USD" },
      },
    });
    const portfolio = await prisma.cryptoPortfolioOwned.findMany({
      select: {
        cryptoId: true,
        quantity: true,
      },
      where: {
        portfolioId: token,
      },
    });
    if (
      portfolio.filter((o) => o.cryptoId == idOfCrypto[0].id)[0].quantity <
      amount
    ) {
      throw error;
    } else if (
      portfolio.filter((o) => o.cryptoId == idOfCrypto[0].id)[0].quantity ==
      amount
    ) {
      const removeCrypto = await prisma.cryptoPortfolioOwned.deleteMany({
        where: {
          portfolioId: token,
          cryptoId: idOfCrypto[0].id,
        },
      });
    } else {
      const decCrypto = await prisma.cryptoPortfolioOwned.updateMany({
        data: {
          quantity: { decrement: amount },
        },
        where: {
          portfolioId: token,
          cryptoId: idOfCrypto[0].id,
        },
      });
    }
    if (!portfolio.some((o) => o.cryptoId == idOfUSD[0].id)) {
      const createUSD = await prisma.cryptoPortfolioOwned.create({
        data: {
          id: portfolio.length + 1,
          portfolioId: token,
          cryptoId: idOfUSD[0].id,
          quantity: amount * price,
          buyPrice: 1,
        },
      });
    } else {
      const addUSD = await prisma.cryptoPortfolioOwned.updateMany({
        data: {
          quantity: { increment: amount * price },
        },
        where: {
          cryptoId: idOfUSD[0].id,
          portfolioId: token,
        },
      });
    }

    return NextResponse.json(
      {
        message: "Crypto sold successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
