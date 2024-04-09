import { NextRequest, NextResponse } from "next/server";
import prisma from "@/server/prisma";

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
  try {
    const cryptos = await prisma.cryptocurrency.findMany({
      select: {
        id: true,
        name: true,
        symbol: true,
      },
    });
    return NextResponse.json(cryptos);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
