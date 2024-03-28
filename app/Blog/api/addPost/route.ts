import jwt from "jsonwebtoken";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.split(' ')[1];
    if (!token) {
      return new NextResponse(JSON.stringify({ message: "Authorization token is missing" }), { status: 401 });
    }

    let userId: number;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "123");
      userId = parseInt((decoded as { id: string }).id, 10);
    } catch (error) {
      return new NextResponse(JSON.stringify({ message: "Invalid or expired token" }), { status: 401 });
    }

    const { title, content } = await req.json();
    if (!title || !content) {
      return new NextResponse(JSON.stringify({ message: "Title and content are required" }), { status: 400 });
    }

    const blog = await db.blog.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });

    return new NextResponse(JSON.stringify(blog), { status: 201 });
  } catch (error) {
    console.error("Failed to create post:", error);
    return new NextResponse(JSON.stringify({ message: "Failed to create post" }), { status: 500 });
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