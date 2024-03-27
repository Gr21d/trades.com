"use client"

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

function Details() {
    const [cryptoDetails, setCryptoDetails] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 
    const pathname = usePathname();
    let cryptoName = pathname ? pathname.substring(1) : null; 

    useEffect(() => {
      if (!cryptoName) {
        setIsLoading(true);
        return; 
      }

      setIsLoading(true);
      cryptoName = cryptoName.split("/")[2];
      console.log(cryptoName);
      fetch(`/api/catalogue/${cryptoName}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setCryptoDetails(data);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        });

    }, [cryptoName]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    console.log(cryptoDetails)
    return (
      <div>
        <h1>Details</h1>
        {error && <p>Error: {error}</p>}
        {cryptoDetails && <div>
                            {cryptoDetails.name} <br />
                            {cryptoDetails.symbol} <br />
                            {cryptoDetails.currentPrice}
                          </div>}
      </div>
    );
}

export default Details;
