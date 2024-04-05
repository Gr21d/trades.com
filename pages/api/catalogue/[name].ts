import axios from 'axios';

export default async function handler(req, res) {
  const { name } = req.query;
  console.log('name of the crypto detail',name)

  try {
    const options = {
      method: 'GET',
      url: `https://api.coingecko.com/api/v3/coins/${name}`,
      headers: { 'x-cg-demo-api-key': 'CG-xc5hrVz9Rxi8KtWm5Py3Gtw5' },
      params: {
        vs_currency: 'usd',
        ids: name,
      },
    };

    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (apiError) {
    console.error(apiError);
    return res.status(500).json({ error: 'Failed to fetch cryptocurrency details from the API' });
  }
}