import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import './table.css'

function Details(props) {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/catalogue/crypto')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCryptos(data.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  let i = 1

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!cryptos || cryptos.length === 0) return <div>No data found</div>;
  console.log(cryptos)

  return (
    <div>
    <div className="container">
      <h1>Today's Cryptocurrency Prices by Market Cap</h1>
      <table className="rwd-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price in USD</th>
            <th>Change 1h %</th>
            <th>Change 24h %</th>
            <th>Change 7d %</th>
            <th>Market Cap</th>
            <th>Volume (24h)</th>
            <th>Circulating Supply</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((crypto, index) => (
            <tr key={crypto.id}>
              <td data-th="#">{index + 1}</td>
              <td data-th="Name">{crypto.name}</td>
              <td data-th="Price in USD">${crypto.quote.USD.price.toFixed(2)}</td>
              <td data-th="% Change 1h" style={{color: crypto.quote.USD.percent_change_1h >= 0 ? 'green' : 'red'}}>
                {crypto.quote.USD.percent_change_1h.toFixed(2)}%
                <Image src={crypto.quote.USD.percent_change_1h >= 0 ? "/up.png" : "/down.png"} alt="Change" width={20} height={20} />
              </td>
              <td data-th="% Change 24h" style={{color: crypto.quote.USD.percent_change_24h >= 0 ? 'green' : 'red'}}>
                {crypto.quote.USD.percent_change_24h.toFixed(2)}%
                <Image src={crypto.quote.USD.percent_change_24h >= 0 ? "/up.png" : "/down.png"} alt="Change" width={20} height={20} />
              </td>
              {/* Assuming you have a percent_change_7d property in your quote.USD object */}
              <td data-th="% Change 7d" style={{color: crypto.quote.USD.percent_change_7d >= 0 ? 'green' : 'red'}}>
                {crypto.quote.USD.percent_change_7d?.toFixed(2)}%
                <Image src={crypto.quote.USD.percent_change_7d >= 0 ? "/up.png" : "/down.png"} alt="Change" width={20} height={20} />
              </td>
              <td data-th="Market Cap">${crypto.quote.USD.market_cap.toLocaleString()}</td>
              {/* Example of applying similar logic to Volume (24h), assuming volume is treated as a positive/negative change */}
              <td data-th="Volume (24h)">${crypto.quote.USD.volume_24h.toLocaleString()}</td>
              <td data-th="Circulating Supply">{crypto.circulating_supply.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default Details;
