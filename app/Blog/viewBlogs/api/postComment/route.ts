import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { content, authorId, blogId } = await request.json();

    const comment = await db.comment.create({
      data: {
        content,
        authorId,
        blogId,
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Method GET Not Allowed" }, { status: 405 });
}

export async function PUT(request: NextRequest) {
  return NextResponse.json({ message: "Method PUT Not Allowed" }, { status: 405 });
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json({ message: "Method DELETE Not Allowed" }, { status: 405 });
}

export async function PATCH(request: NextRequest) {
  return NextResponse.json({ message: "Method PATCH Not Allowed" }, { status: 405 });
}