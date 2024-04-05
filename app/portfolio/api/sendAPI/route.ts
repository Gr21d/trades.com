import prisma from "@/server/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
  try {
    const { symbol, destination, amount, token } = await req.json();
    const cryptos = await prisma.cryptocurrency.findMany({
      select: {
        id: true,
      },
      where: {
        symbol: { equals: symbol },
      },
    });
    const user = await prisma.user.findMany({
      select: {
        id: true,
      },
      where: {
        username: { equals: destination },
      },
    });
    const ownedCrypto = await prisma.cryptoPortfolioOwned.findMany({
      select: {
        id: true,
      },
    });
    const investor = await prisma.investor.findMany({
      select: {
        portfolioId: true,
      },
      where: {
        investorId: { equals: user[0].id },
      },
    });
    const takenCrypto = await prisma.cryptoPortfolioOwned.findMany({
      select: {
        quantity: true,
        buyPrice: true,
      },
      where: {
        cryptoId: { equals: cryptos[0].id },
        portfolioId: { equals: token }, //Should be origin!!
      },
    });
    const addCrypto = await prisma.cryptoPortfolioOwned.create({
      data: {
        id: ownedCrypto.length + 1,
        portfolioId: investor[0].portfolioId,
        cryptoId: cryptos[0].id,
        quantity: amount,
        buyPrice: takenCrypto[0].buyPrice,
      },
    });

    if (takenCrypto[0].quantity - amount >= 0) {
      const alterCrypto = await prisma.cryptoPortfolioOwned.updateMany({
        where: {
          cryptoId: cryptos[0].id,
          portfolioId: token, //Should be origin!!
        },
        data: {
          quantity: { decrement: amount },
        },
      });
    } else {
      const deleteCrypto = await prisma.cryptoPortfolioOwned.deleteMany({
        where: {
          cryptoId: cryptos[0].id,
          portfolioId: token, //Should be origin!!
        },
      });
    }

    return NextResponse.json(
      {
        message:
          "Form submitted successfully " +
          `id: ${ownedCrypto.map((o) => o.id)[ownedCrypto.length - 1]} ` +
          `portfolioID: ${investor[0].portfolioId} ` +
          `cryptoID: ${cryptos[0].id}` +
          `quantity: ${amount}` +
          `buyPrice: ${0}`,
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
