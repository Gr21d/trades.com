// pages/viewBlogs/api/fetchBlogs.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    // Retrieve query parameters for pagination
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const skip = parseInt(url.searchParams.get("skip") || "0", 10);
    const blogs = await db.blog.findMany({
      skip,
      take: limit, // Use take instead of limit for Prisma pagination
      include: {
        author: {
          include: {
            user: true,
          },
        },
        comments: {
          include: {
            author: true,
          },
          orderBy: {
            datePosted: "desc",
          },
        },
      },
    });
    const totalBlogsCount = await db.blog.count();

    return NextResponse.json({ blogs, totalBlogsCount });
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