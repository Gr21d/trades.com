"use client";
import React, { useEffect, useState } from "react";
import DynamicCellPL from "./DynamicCellPL";
import SendButton from "./SendButton";
import SellButton from "./SellButton";

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
    buyPrice: number;
  }[];
}
interface Prices {
  symbol: string;
  price: string;
}
const TableClient = ({ cryptos, cryptosOwned }: Props) => {
  const [prices, setPrices] = useState<Prices[]>([{ symbol: "", price: "" }]);
  const url = `wss://fstream.binance.com/ws/!markPrice@arr@1s`;
  const [plcolor, setPLColor] = useState(".text-dark");
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
    <>
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
                      (parseFloat(price.price) * cryptoOwned.quantity).toFixed(
                        2
                      )
                    ).toLocaleString()
                  )}
              </td>
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
                    content={(
                      (1 - cryptoOwned.buyPrice / parseFloat(price.price)) *
                      100
                    )
                      .toFixed(2)
                      .toLocaleString()}
                  />
                ))}
            </tr>
          ))}
        <tr>
          <td colSpan={4} align="right">
            Total Value:
          </td>
          <td>
            $
            {parseFloat(
              cryptosOwned
                .reduce((accumulator, cryptoOwned) => {
                  const price = prices.filter((price) =>
                    cryptos
                      .filter((c) => c.id == cryptoOwned.cryptoId)
                      .some(
                        (crypto) =>
                          crypto.symbol.toUpperCase().concat("USDT") ===
                          price.symbol
                      )
                  );
                  if (price) {
                    const sum = price.reduce(
                      (acc, p) =>
                        acc + parseFloat(p.price) * cryptoOwned.quantity,
                      0
                    );
                    accumulator += sum;
                  }

                  return accumulator;
                }, 0)
                .toFixed(2)
            ).toLocaleString()}
          </td>
          <DynamicCellPL
            content={(
              (parseFloat(
                cryptosOwned
                  .reduce((accumulator, cryptoOwned) => {
                    const price = prices.filter((price) =>
                      cryptos
                        .filter((c) => c.id == cryptoOwned.cryptoId)
                        .some(
                          (crypto) =>
                            crypto.symbol.toUpperCase().concat("USDT") ===
                            price.symbol
                        )
                    );
                    if (price) {
                      const sum = price.reduce(
                        (acc, p) =>
                          acc + parseFloat(p.price) * cryptoOwned.quantity,
                        0
                      );
                      accumulator += sum;
                    }

                    return accumulator;
                  }, 0)
                  .toFixed(2)
              ) /
                cryptosOwned.reduce(
                  (acc, cryptoOwned) =>
                    acc + cryptoOwned.buyPrice * cryptoOwned.quantity,
                  0
                ) -
                1) *
              100
            )
              .toFixed(2)
              .toLocaleString()}
          />
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={6}>
            <div className="d-flex flex-row justify-content-evenly">
              <SendButton
                coins={cryptos
                  .filter((c) =>
                    cryptosOwned.map((cr) => cr.cryptoId).includes(c.id)
                  )
                  .map((c) => c.symbol)}
                cryptos={cryptos}
                cryptosOwned={cryptosOwned}
              />
              <SellButton coins={cryptos.map((crypto) => crypto.symbol)} />
            </div>
          </td>
        </tr>
      </tfoot>
    </>
  );
};

export default TableClient;
