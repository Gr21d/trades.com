// walletAPIs/[fetchData].ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  console.log('here')
  const {crypto} = req.query;
  console.log('crypto name passed', crypto);

  const apiUrl = `https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=usd&days=30`;

  try {
    const apiRes = await fetch(apiUrl);

    if (apiRes.ok) {
      const data = await apiRes.json();
      console.log('json',data)
      const hello = data.prices.map(([timestamp, price]) => ({
        date: new Date(timestamp).toLocaleDateString(),
        price: price,
        }));

      res.status(200).json(hello);
    } else {
      const errorData = await apiRes.json();
      res.status(apiRes.status).json({ message: errorData.msg || 'API error' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}