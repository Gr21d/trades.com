import axios from 'axios';

export default async function handler(req, res) {
  const { name } = req.query;
  console.log('name of the crypto detail',name)

  try {

    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${name}`,
        {
          params: {
            vs_currency: 'usd',
            ids: name,
          },
        }
      );

      const cryptoDetails = response.data;

      if (cryptoDetails.length === 0) {
        return res.status(404).json({ error: 'Cryptocurrency not found' });
      }

      res.status(200).json(response);
    } catch (apiError) {
      console.error(apiError);
      return res.status(500).json({ error: 'Failed to fetch cryptocurrency details from the API' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch cryptocurrency details' });
  }
}