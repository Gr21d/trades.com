// pages/api/bitcoin-ohlc.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const crypto = req.query.cryptoOhlc;
  console.log('crypto name passed', crypto);

  const apiUrl = `https://api.binance.com/api/v3/klines?symbol=${crypto}USDT&interval=15m&limit=1000`;

  try {
    const apiRes = await fetch(apiUrl);

    if (apiRes.ok) {
      const data = await apiRes.json();
      res.status(200).json(data);
    } else {
      const errorData = await apiRes.json();
      res.status(apiRes.status).json({ message: errorData.msg || 'API error' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}