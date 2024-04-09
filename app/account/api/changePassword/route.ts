import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function isPasswordStrong(password: string) {
  const hasMinLength = password.length > 10;
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasCapital = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  return hasMinLength && hasSymbol && hasCapital && hasNumber;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, currentPassword, newPassword } = body;

    // Verify the user's token
    const { userId } = jwt.verify(token, "123") as { userId: string };

    // Find the user in the database
    const user = await db.user.findUnique({ where: { id: parseInt(userId) } });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }

    // Compare the provided current password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid current password" }),
        { status: 401 }
      );
    }
    if (!isPasswordStrong(newPassword)) {
      return new NextResponse(
        JSON.stringify({ message: "New password is not strong enough" }),
        { status: 400 }
      );
    }

    
    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await db.user.update({
      where: { id: parseInt(userId) },
      data: { password: hashedNewPassword },
    });

    return new NextResponse(
      JSON.stringify({ message: "Password changed successfully" }),
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