// pages/api/crypto.ts

export default async function handler(req, res:any) {
    // Define the URL of the external API you want to call
    const apiUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
    const params = new URLSearchParams({
      start: '1',
      limit: '20',
      convert: 'USD',
    });
  
    try {
      // Make an external API request to fetch data
      const apiRes = await fetch(`${apiUrl}?${params}`, {
        method: 'GET',
        headers: {
          'X-CMC_PRO_API_KEY': '31bc424d-e15f-4220-975d-671d8dbbf011',
          'Accept': 'application/json',
        },
      });
  
      // If the external API call was successful
      if (apiRes.ok) {
        const data = await apiRes.json();
        // Send the data back to the client
        res.status(200).json(data);
      } else {
        // If the external API call failed, forward the status code and error
        const error = await apiRes.text();
        res.status(apiRes.status).json({ message: error });
      }
    } catch (error) {
      // Handle any errors that occurred during the fetch
      res.status(500).json({ message: error.message });
    }
  }
  