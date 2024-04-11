import React from "react";
import "../portfolio.css";
import { Card, CardSubtitle } from "react-bootstrap";
import DynamicCellPL from "./DynamicCellPL";
import Image from 'next/image';


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
  decodedToken: number;
  prices: {
    symbol: string;
    price: string;
  }[];
}

const TotalFundsCard = ({
  cryptos,
  cryptosOwned,
  decodedToken,
  prices,
}: Props) => {
  const profits = cryptosOwned
    .filter((o) => o.portfolioId == decodedToken)
    .map((cryptoOwned) => {
      const price = prices.find((price) =>
        cryptos
          .filter((c) => c.id == cryptoOwned.cryptoId)
          .some(
            (crypto) =>
              crypto.symbol.toUpperCase().concat("USDT") === price.symbol
          )
      );

      if (price) {
        const totalValue =
          parseFloat(price.price) * cryptoOwned.quantity -
          cryptoOwned.priceBought * cryptoOwned.quantity;

        const percentProfit = (
          (totalValue / (cryptoOwned.priceBought * cryptoOwned.quantity)) *
          100
        ).toFixed(2);

        return {
          symbol: price.symbol,
          profit: parseFloat(totalValue.toFixed(2)),
          percentProfit: parseFloat(percentProfit),
          price: price.price,
        };
      } else {
        return null;
      }
    })
    .filter((item) => item !== null);
  const totalProfit = profits.reduce((accumulator, currentObject) => {
    return accumulator + currentObject.profit;
  }, 0);
  return (
    <Card
      style={{ width: "200px", height: 100, border: "none", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)"}}
      className="bg-white text-dark react-card"
    >
      <Card.Body>
        <p style={{height: "20px", fontSize:"14px", color: "black"}}>
         All time profit
        </p>
        <CardSubtitle className="mb-1">
          ${parseFloat(totalProfit.toFixed(2)).toLocaleString()}
        </CardSubtitle>
        <CardSubtitle className="mx-2 amk" style={{marginTop: "10px", fontSize: "14px"}}>
        <DynamicCellPL
          content={
            (
              (parseFloat(
                cryptosOwned
                  .filter((o) => o.portfolioId == decodedToken)
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
                cryptosOwned
                  .filter((o) => o.portfolioId == decodedToken)
                  .reduce(
                    (acc, cryptoOwned) =>
                      acc + cryptoOwned.priceBought * cryptoOwned.quantity,
                    0
                  ) -
                1) *
              100
            )
              .toFixed(2)
              .toLocaleString() + "%"
          }
          icon={
            (parseFloat(
              cryptosOwned
                .filter((o) => o.portfolioId == decodedToken)
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
              cryptosOwned
                .filter((o) => o.portfolioId == decodedToken)
                .reduce(
                  (acc, cryptoOwned) =>
                    acc + cryptoOwned.priceBought * cryptoOwned.quantity,
                  0
                ) -
              1) < 0 ? (
              <Image src="/down.png" alt="Down" width={20} height={20} />
            ) : (
              <Image src="/up.png" alt="Up" width={20} height={20} />
            )
          }
        />
        </CardSubtitle>
      </Card.Body>
    </Card>
  );
};

export default TotalFundsCard;
