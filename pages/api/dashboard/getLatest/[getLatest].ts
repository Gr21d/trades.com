// pages/api/bitcoin-ohlc.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const getLatest = req.query.getLatest;
    console.log('crypto name passed',getLatest)
    const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${getLatest}&vs_currencies=usd&include_last_updated_at=true`;
  
    try {
      const apiRes = await fetch(`${apiUrl}`, {
        method: 'GET',
        headers: {
          'x-cg-demo-api-key': 'CG-xc5hrVz9Rxi8KtWm5Py3Gtw5',
          'Accept': 'application/json',
        },
      });
  
      if (apiRes.ok) {
        const data = await apiRes.json();
        res.status(200).json(data);
      } else {
        const error = await apiRes.text();
        res.status(apiRes.status).json({ message: error });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}
