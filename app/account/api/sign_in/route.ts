import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { sendVerificationEmail } from "../verify/route"; // Add this import

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    const user = await db.user.findUnique({ where: { email } });

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

    if (!investor) {
      return new NextResponse(
        JSON.stringify({ message: "Investor not found" }),
        { status: 404 }
      );
    }

    const investorId = investor.investorId;
    const portfolioId = investor.portfolioId;

    // Generate a verification token
    const verificationToken = jwt.sign(
      { userId: user.id, investorId, portfolioId },
      "123",
      { expiresIn: "10m" } // Set a short expiration time for the verification token
    );

    // Send the verification email
    console.log("hello")
    await sendVerificationEmail(user.email, verificationToken);
    console.log("hello")

    return new NextResponse(
      JSON.stringify({ message: "Verification email sent" }),
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


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return new NextResponse(
      JSON.stringify({ message: "Missing verification token" }),
      { status: 400 }
    );
  }

  try {
    const { userId, investorId, portfolioId } = jwt.verify(token, "123") as {
      userId: string;
      investorId: string;
      portfolioId: string;
    };

    const user = await db.user.findUnique({ where: { id: parseInt(userId) } });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }

    const { password: userPassword, ...userWithoutPassword } = user;

    const accessToken = jwt.sign(
      { userId, investorId, portfolioId },
      "123",
      { expiresIn: "1d" }
    );

    return new NextResponse(
      JSON.stringify({ user: userWithoutPassword, token: accessToken }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "Invalid verification token" }),
      { status: 401 }
    );
  }
}