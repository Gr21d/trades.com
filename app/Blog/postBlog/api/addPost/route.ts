import jwt from "jsonwebtoken";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  userId: number;
}


export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    console.error('Authorization Header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new NextResponse(JSON.stringify({ message: "Authorization token is missing or invalid" }), { status: 401 });
    }

    const token = authHeader.substring(7); 
    console.error(new NextResponse(JSON.stringify({ message: 'Token Inside:', token }), { status: 401 }));

    if (!token) {
      return new NextResponse(JSON.stringify({ message: "Authorization token is missing" }), { status: 401 });
    }

    let loggedUserId;
    try {
      const decoded = jwt.verify(token, "123") as DecodedToken;
      loggedUserId = decoded.userId;
      console.log("UserId " + loggedUserId);
    } catch (error) {
      console.error('JWT verification error:', error);
      return new NextResponse(JSON.stringify({ message: "Invalid or expired token " + token }), { status: 401 });
    }

    const { title, content } = await req.json();
    console.log('Received data:', { title, content, loggedUserId });

    if (!title || !content) {
      return new NextResponse(JSON.stringify({ message: "Title and content are required" }), { status: 400 });
    }

    try {
      const user = await db.user.findUnique({
        where: { id: loggedUserId },
        include: { investor: true },
      });

      if (!user || !user.investor) {
        return new NextResponse(JSON.stringify({ message: "User or investor not found" }), { status: 404 });
      }

      const blog = await db.blog.create({
        data: {
          title,
          content,
          author: {
            connect: { investorId: user.investor.investorId },
          },
        },
      });

      console.log('Blog post created:', blog);
      return new NextResponse(JSON.stringify(blog), { status: 201 });
    } catch (error) {
      console.error('Failed to create blog post:', error);
      return new NextResponse(JSON.stringify({ message: "Failed to create blog post" }), { status: 500 });
    }
  } catch (error) {
    console.log("hello");
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