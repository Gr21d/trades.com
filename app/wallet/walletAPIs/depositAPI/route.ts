import prisma from "@/server/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
  try {
    const { amount, token } = await req.json();
    let idOfUSD = await prisma.cryptocurrency.findMany({
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
        portfolioId: token,
      },
      where: {
        portfolioId: { equals: token },
      },
    });
    if (!idOfUSD) {
      const createUSD = await prisma.cryptocurrency.create({
        data: {
          symbol: "USD",
          name: "USD",
          currentPrice: 1,
        },
      });
      idOfUSD = await prisma.cryptocurrency.findMany({
        select: {
          id: true,
        },
        where: {
          name: { equals: "USD" },
        },
      });
    }
    if (!portfolio.some((o) => o.cryptoId == idOfUSD[0].id)) {
      const createUSD = await prisma.cryptoPortfolioOwned.create({
        data: {
          portfolioId: token,
          cryptoId: idOfUSD[0].id,
          quantity: amount,
          priceBought: 1,
        },
      });

      return NextResponse.json(
        {
          message: "USD Created successfully ",
        },
        { status: 200 }
      );
    } else {
      const addUSD = await prisma.cryptoPortfolioOwned.updateMany({
        data: {
          quantity: { increment: amount },
        },
        where: {
          cryptoId: idOfUSD[0].id,
          portfolioId: token,
        },
      });

      return NextResponse.json(
        {
          message: "USD incremented successfully ",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
