import { NextRequest, NextResponse } from "next/server";
import prisma from "@/server/prisma";

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
  try {
    const ownedCrypto = await prisma.cryptoPortfolioOwned.findMany({
      select: {
        id: true,
        portfolioId: true,
        cryptoId: true,
        quantity: true,
        priceBought: true,
      },
    });
    return NextResponse.json(ownedCrypto);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
