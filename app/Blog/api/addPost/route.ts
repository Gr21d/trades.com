import jwt from "jsonwebtoken";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  userId: number;
}

function isDecodedToken(decoded: any): decoded is DecodedToken {
  return typeof decoded === "object" && decoded !== null && "userId" in decoded;
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.split(' ')[1];
    console.log('Token:', token);

    if (!token) {
      return new NextResponse(JSON.stringify({ message: "Authorization token is missing" }), { status: 401 });
    }

    let userId: number;
    try {
      const decoded = jwt.verify(token, "123" as string);
      if (isDecodedToken(decoded)) {
        userId = decoded.userId;
      } else {
        throw new Error("Invalid token payload");
      }
    } catch (error) {
      console.error('JWT verification error:', error);
      return new NextResponse(JSON.stringify({ message: "Invalid or expired token" }), { status: 401 });
    }

    const { title, content } = await req.json();
    console.log('Received data:', { title, content, userId });

    if (!title || !content) {
      return new NextResponse(JSON.stringify({ message: "Title and content are required" }), { status: 400 });
    }

    try {
      const blog = await db.blog.create({
        data: {
          title,
          content,
          authorId: userId,
        },
      });
      console.log('Blog post created:', blog);
      return new NextResponse(JSON.stringify(blog), { status: 201 });
    } catch (error) {
      console.error('Failed to create blog post:', error);
      return new NextResponse(JSON.stringify({ message: "Failed to create blog post" }), { status: 500 });
    }
  } catch (error) {
    console.error('Error in POST handler:', error);
    return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return new NextResponse(JSON.stringify({ message: "Method GET Not Allowed" }), { status: 405 });
}

export async function PUT(req: NextRequest) {
  return new NextResponse(JSON.stringify({ message: "Method PUT Not Allowed" }), { status: 405 });
}

export async function DELETE(req: NextRequest) {
  return new NextResponse(JSON.stringify({ message: "Method DELETE Not Allowed" }), { status: 405 });
}

export async function PATCH(req: NextRequest) {
  return new NextResponse(JSON.stringify({ message: "Method PATCH Not Allowed" }), { status: 405 });
}