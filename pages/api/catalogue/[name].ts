import prisma from '../_base'
import axios from 'axios'


export default async function handler(req, res) {
  const {name} = req.query

  try{
    const cryptoNameFormatted = name.replace(/\s+/g, '-')
    let crypto = await prisma.cryptocurrency.findUnique({
      where: { name: cryptoNameFormatted },
    });

    if (!crypto) {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoNameFormatted}`);
        const cryptoDetails = response.data;

        crypto = await prisma.cryptocurrency.create({
          data: {
            name: cryptoDetails.name,
            symbol: cryptoDetails.symbol,
            currentPrice: cryptoDetails.market_data.current_price.usd,
          },
        });
      } catch (apiError) {
        console.error(apiError);
        return res.status(500).json({ error: 'Failed to fetch cryptocurrency details from the API' });
      }
    }

    res.status(200).json(crypto)
  } catch(error){
    console.error(error)
    res.status(500).json({error: 'Failed to fetch cryptocurrency details'})
  }
}