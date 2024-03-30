// pages/viewBlogs/api/fetchBlogs.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const blogs = await db.blog.findMany({
      include: {
        author: {
          include: {
            user: true,
          },
        },
        comments: {
          orderBy: {
            datePosted: "desc",
          },
        },
      },
    });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: "Method POST Not Allowed" }, { status: 405 });
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