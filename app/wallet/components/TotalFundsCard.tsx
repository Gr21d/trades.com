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
    buyPrice: number;
  }[];
  decodedToken: number;
}

const TotalFundsCard = ({ cryptos, cryptosOwned, decodedToken }: Props) => {
  const funds = cryptosOwned.filter(
    (o) =>
      o.portfolioId == decodedToken &&
      o.cryptoId == cryptos.filter((cr) => cr.name == "USD")[0].id
  )[0];
  return (
    <Card
      style={{ width: "18rem" }}
      className="bg-light text-dark text-center react-card"
    >
      <Card.Body>
        <Card.Title>
          ${parseFloat(funds.quantity.toFixed(2)).toLocaleString()}
        </Card.Title>
        <Card.Text>Total Funds Available to Invest</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TotalFundsCard;
