"use client";
import React, { useEffect, useState } from "react";

interface Props {
  cryptos: {
    id: number;
    name: string;
    symbol: string;
  }[];
  cryptosOwned: {
    id: number;
    portfolioId: number;
    cryptoId: number;
    quantity: number;
  }[];
}
interface Prices {
  symbol: string;
  price: string;
}
const TableClient = ({ cryptos, cryptosOwned }: Props) => {
  const [prices, setPrices] = useState<Prices[]>([{ symbol: "", price: "" }]);
  const url = `wss://fstream.binance.com/ws/!markPrice@arr@1s`;
  useEffect(() => {
    let ws = new WebSocket(url);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newPrices: Prices[] = data.map((crypto: any) => ({
        symbol: crypto.s,
        price: crypto.p,
      }));
      setPrices(newPrices);
    };
  }, []);
  return (
    <tbody>
      {cryptosOwned
        .sort((crypto) => crypto.id)
        .map((cryptoOwned) => (
          <tr key={cryptoOwned.id}>
            <th>
              {cryptos
                .filter((c) => c.id == cryptoOwned.cryptoId)
                .map((c) => c.symbol)}
            </th>
            <td>
              {cryptos
                .filter((c) => c.id == cryptoOwned.cryptoId)
                .map((c) => c.name)}
            </td>
            <td>{cryptoOwned.quantity}</td>
            <td>
              $
              {prices
                .filter((price) =>
                  cryptos
                    .filter((c) => c.id == cryptoOwned.cryptoId)
                    .some(
                      (crypto) =>
                        crypto.symbol.toUpperCase().concat("USDT") ===
                        price.symbol
                    )
                )
                .map((price) =>
                  parseFloat(price.price).toFixed(
                    parseFloat(price.price) >= 1 ? 2 : 5
                  )
                )}
            </td>
            <td>
              $
              {prices
                .filter((price) =>
                  cryptos
                    .filter((c) => c.id == cryptoOwned.cryptoId)
                    .some(
                      (crypto) =>
                        crypto.symbol.toUpperCase().concat("USDT") ===
                        price.symbol
                    )
                )
                .map((price) =>
                  parseFloat(
                    (parseFloat(price.price) * cryptoOwned.quantity).toFixed(2)
                  ).toLocaleString()
                )}
            </td>
          </tr>
        ))}
    </tbody>
  );
};

export default TableClient;
