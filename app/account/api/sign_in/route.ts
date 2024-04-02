import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 401 }
      );
    }

    const investor = await db.investor.findUnique({
      where: { investorId: user.id },
    });
    
    if (!investor){
      return new NextResponse(
        JSON.stringify({message: "Investor not found"}),
      )
    }

    const investorId = investor.investorId;
    const portfolioId = investor.portfolioId;


    const token = jwt.sign(         
      { userId: user.id, investorId, portfolioId },
      "123",
      { expiresIn: "1d" }
    );

    const { password: userPassword, ...userWithoutPassword } = user;

    return new NextResponse(
      JSON.stringify({ user: userWithoutPassword, token }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }        
}