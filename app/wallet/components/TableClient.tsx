"use client";

import { useEffect } from "react";

import DynamicCellPL from "./DynamicCellPL";

import "bootstrap/dist/css/bootstrap.css";

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
    priceBought: number;
  }[];
  prices: {
    symbol: string;
    price: string;
  }[];
  decodedToken: number;
}

const TableClient = ({
  cryptos,
  cryptosOwned,
  prices,
  decodedToken,
}: Props) => {
  const fetchLogos = async () => {
    cryptos.forEach;
  };

  useEffect(() => {}, []);

  return (
    <>
      <tbody>
        {cryptosOwned
          .filter(
            (o) =>
              o.portfolioId == decodedToken &&
              o.cryptoId != cryptos.filter((cr) => cr.name == "USD")[0].id
          )
          .sort((a, b) => a.id - b.id)
          .map((cryptoOwned) => (
            <tr key={cryptoOwned.cryptoId}>
              <td></td>
              <th>
                {cryptos
                  .filter((c) => c.id == cryptoOwned.cryptoId)
                  .map((c) => c.name)}
              </th>
              <td className="align-items-center">
                {cryptos
                  .filter((c) => c.id == cryptoOwned.cryptoId)
                  .map((c) => c.symbol)}
              </td>
              <td>{cryptoOwned.quantity}</td>
              <td className="align-items-center">
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
                      (parseFloat(price.price) * cryptoOwned.quantity).toFixed(
                        2
                      )
                    ).toLocaleString()
                  )}
              </td>
              <td>
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
                  .map((price) => (
                    <DynamicCellPL
                      content={
                        (
                          (parseFloat(
                            (
                              parseFloat(price.price) * cryptoOwned.quantity
                            ).toFixed(2)
                          ) /
                            (cryptoOwned.priceBought * cryptoOwned.quantity) -
                            1) *
                          100
                        ).toFixed(2) + "%"
                      }
                    />
                  ))}
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
};

export default TableClient;