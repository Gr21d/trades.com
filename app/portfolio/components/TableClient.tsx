"use client";
import React, { useEffect, useState } from "react";
import DynamicCellPL from "./DynamicCellPL";
import SendButton from "./SendButton";
import SellButton from "./SellButton";
import { getToken } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";
import DepositButton from "./DepositButton";
import WithdrawButton from "./WithdrawButton";

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
  const [decodedToken, setDecodedToken] = useState(0);
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
  useEffect(() => {
    const getToken = () => {
      if (typeof window !== "undefined" && window.localStorage) {
        return localStorage.getItem("token");
      }
      return null;
    };
    const token = getToken();
    if (token) {
      console.log("Token found: ", jwtDecode(token).portfolioId);
      setDecodedToken(jwtDecode(token).portfolioId);
    } else {
      console.log("Token not found");
    }
  }, []);

  return (
    <>
      <tbody>
        <tr>
          <td colSpan={4} align="center">
            Funds available to invest (USD):
          </td>
          {cryptosOwned
            .filter(
              (o) =>
                o.portfolioId == decodedToken &&
                o.cryptoId == cryptos.filter((cr) => cr.name == "USD")[0].id
            )
            .map((c) => (
              <td>${c.quantity.toFixed(2)}</td>
            ))}
          <td>0%</td>
        </tr>
        {cryptosOwned
          .filter(
            (o) =>
              o.portfolioId == decodedToken &&
              o.cryptoId != cryptos.filter((cr) => cr.name == "USD")[0].id
          )
          .sort((a, b) => a.id - b.id)
          .map((cryptoOwned) => (
            <tr key={cryptoOwned.cryptoId}>
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
            {(
              parseFloat(
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
              ) +
              cryptosOwned
                .filter(
                  (o) =>
                    o.portfolioId == decodedToken &&
                    o.cryptoId == cryptos.filter((cr) => cr.name == "USD")[0].id
                )
                .map((m) => m.quantity)[0]
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
                token={decodedToken}
              />
              <SellButton
                coins={cryptos
                  .filter((c) =>
                    cryptosOwned.map((cr) => cr.cryptoId).includes(c.id)
                  )
                  .map((c) => c.symbol)}
                token={decodedToken}
                prices={prices}
              />
              <DepositButton token={decodedToken} />
              <WithdrawButton token={decodedToken} />
            </div>
          </td>
        </tr>
      </tfoot>
    </>
  );
};

export default TableClient;
