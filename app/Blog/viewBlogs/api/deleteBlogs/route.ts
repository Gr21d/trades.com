// pages/api/blogs/[id].ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const url  = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const blogId = Number(searchParams.get("id"))

  try {
    await db.blog.delete({
      where: { id: blogId },
    });

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const url  = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const blogId = Number(searchParams.get("id"))

  try {
    const { title, content } = await request.json();

    const updatedBlog = await db.blog.update({
      where: { id: blogId },
      data: {
        title,
        content,
      },
    });

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const blogId = Number(params.id);

  try {
    const blog = await db.blog.findUnique({
      where: { id: blogId },
      include: {
        author: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: "Method POST Not Allowed" }, { status: 405 });
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: "Method PATCH Not Allowed" }, { status: 405 });
}