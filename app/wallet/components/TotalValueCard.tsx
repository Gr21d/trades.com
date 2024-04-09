import React from "react";
import "../portfolio.css";
import { Card } from "react-bootstrap";
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
  let value = parseFloat(
    cryptosOwned
      .filter((o) => o.portfolioId == decodedToken)
      .reduce((accumulator, cryptoOwned) => {
        const price = prices.filter((price) =>
          cryptos
            .filter((c) => c.id == cryptoOwned.cryptoId)
            .some(
              (crypto) =>
                crypto.symbol.toUpperCase().concat("USDT") === price.symbol
            )
        );
        if (price) {
          const sum = price.reduce(
            (acc, p) => acc + parseFloat(p.price) * cryptoOwned.quantity,
            0
          );
          accumulator += sum;
        }

        return accumulator;
      }, 0)
      .toFixed(2)
  ).toLocaleString();
  if (
    cryptosOwned
      .filter(
        (o) =>
          o.portfolioId == decodedToken &&
          o.cryptoId == cryptos.filter((cr) => cr.name == "USD")[0].id
      )
      .map((m) => m.quantity)[0]
  ) {
    value += cryptosOwned
      .filter(
        (o) =>
          o.portfolioId == decodedToken &&
          o.cryptoId == cryptos.filter((cr) => cr.name == "USD")[0].id
      )
      .map((m) => m.quantity)[0];
  }
  return (
    <Card
      style={{ width: "18rem", height: 125.2 }}
      className="bg-light text-dark text-center react-card"
    >
      <Card.Body>
        <Card.Title>${value}</Card.Title>
        <Card.Text>Total Value of Portfolio</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TotalFundsCard;
