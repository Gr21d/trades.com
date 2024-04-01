import {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method === 'GET'){
        const {userId} = req.query;
        
        try {
            const investor = await.prisma.investor.findFirst({
                where: {
                    user: {id: Number(userId)},
                },
                select: {
                    investorId : true,
                    portfolio: {
                        select: {
                            id: true,
                        },
                    },
                },
            });

            if (!investor){
                return res.status(404).json({error: 'Investor not found'});
            }
            
            res.status(200).json(investor)
        } catch(error){
            console.error('Error fetching investor:', error);
            res.status(500).json({error: 'Failed to fetch investor'});
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.status(405).json({error: 'Method not allowed'});
    }
}