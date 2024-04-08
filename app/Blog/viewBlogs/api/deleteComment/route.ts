import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(request: NextRequest) {
  try {

    const { commentId, userId } = await request.json();

    const comment = await db.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      return NextResponse.json({ message: "Comment not found" }, { status: 404 });
    }


    if (comment.authorId !== userId) {
      // User is neither the comment owner nor an admin
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Authorized to delete the comment
    await db.comment.delete({
      where: {
        id: commentId,
      },
    });

    // Confirmation response
    return NextResponse.json({ message: "Comment deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
