import { PrismaClient, SupportQuery } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

// const [decodedToken, setDecodedToken] = useState(null);

// useEffect(() => {
//   const getToken = () => {
//     if(typeof window !== 'undefined' && window.localStorage) {
//       return localStorage.getItem("token");
//     }
//     return null;
//   };

//   const token = getToken();
//   if(token){
//     setDecodedToken(jwtDecode(token));
//   }
//   else {
//     console.log("Token not found");
//   }
// }, []);

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SupportQuery | { message: string }>
) {
  if (req.method === 'POST') {
    const { content, investorId, adminId } = req.body;
    try {
      const supportQuery = await prisma.supportQuery.create({
        data: {
          content,
          investorId,
          adminId: 9,
        },
      });
      res.status(200).json(supportQuery);
    } catch (error) {
      console.error('Request error', error);
      res.status(500).json({ message: 'Error creating support query' });
    }
  } else {
    // If the HTTP method is not POST, return a 405 Method Not Allowed error
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}

