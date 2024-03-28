import jwt from "jsonwebtoken";
import { db } from "@/lib/db"; // Assuming you have a database instance set up similarly to your sign-in API

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: "Authorization token is missing" });
      }

      let userId;
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
      } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
      }

      const blog = await db.blog.create({
        data: {
          title,
          content,
          authorID: userId, // Ensure this matches your database schema
        },
      });

      return res.status(200).json(newPost);
    } catch (error) {
      console.error("Failed to create post:", error);
      return res.status(500).json({ message: "Failed to create post" });
    }
  } else {
    // Handle non-POST requests or add more methods as needed
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

//a new blog entry should be created when the user adds a post using the PostButton that uses the handlepost function in BlogPage.js
//entry should be visable in table