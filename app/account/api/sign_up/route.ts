import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

function isPasswordStrong(password: string) {
  const hasMinLength = password.length > 10;
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasCapital = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  return hasMinLength && hasSymbol && hasCapital && hasNumber;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, username, password, userType } = body;

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 }
      );
    }

    const existingUserByUserName = await db.user.findUnique({
      where: { username: username },
    });

    if (existingUserByUserName) {
      return NextResponse.json(
        { user: null, message: "User with this Username already exists" },
        { status: 409 }
      );
    }

    if (!isPasswordStrong(password)) {
      return NextResponse.json(
        { user: null, message: "Password is not strong enough" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        userType,
        investor: {
          create: {
            portfolio: {
              create: {
                balance: 0,
              },
            },
          },
        },
      },
      include: {
        investor: true,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "User Created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}