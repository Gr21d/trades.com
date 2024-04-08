import prisma from "@/server/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
  try {
    const { amount, token } = await req.json();
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
    if (!portfolio.some((o) => o.cryptoId == idOfUSD[0].id)) {
      throw error;
    } else if (
      portfolio.filter((o) => o.cryptoId == idOfUSD[0].id)[0].quantity < amount
    ) {
      throw error;
    } else {
      const subUSD = await prisma.cryptoPortfolioOwned.updateMany({
        data: {
          quantity: { decrement: amount },
        },
        where: {
          cryptoId: idOfUSD[0].id,
        },
      });

      return NextResponse.json(
        {
          message: "USD decremented successfully ",
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
