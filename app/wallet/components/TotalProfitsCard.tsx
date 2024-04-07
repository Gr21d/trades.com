import React from "react";
import "../portfolio.css";
import { Card, CardSubtitle } from "react-bootstrap";
import DynamicCellPL from "./DynamicCellPL";
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
          cryptoOwned.buyPrice * cryptoOwned.quantity;

        const percentProfit = (
          (totalValue / (cryptoOwned.buyPrice * cryptoOwned.quantity)) *
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
      style={{ width: "18rem" }}
      className="bg-light text-dark text-center react-card"
    >
      <Card.Body>
        <Card.Title className="mx-2">
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
                        acc + cryptoOwned.buyPrice * cryptoOwned.quantity,
                      0
                    ) -
                  1) *
                100
              )
                .toFixed(2)
                .toLocaleString() + "%"
            }
          />
        </Card.Title>
        <CardSubtitle className="mb-2">
          ${parseFloat(totalProfit.toFixed(2)).toLocaleString()}
        </CardSubtitle>
        <Card.Text>Total Profits of Portfolio</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TotalFundsCard;
