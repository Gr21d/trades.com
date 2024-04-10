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
}

const TotalFundsCard = ({ cryptos, cryptosOwned, decodedToken }: Props) => {
  const funds = cryptosOwned.filter(
    (o) =>
      o.portfolioId == decodedToken &&
      o.cryptoId == cryptos.filter((cr) => cr.name == "USD")[0].id
  )[0];
  return (
    <Card
      style={{ width: "200px", height: 100, border: "none", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)"}}
      className="bg-white text-dark text-center react-card"
    >
      <Card.Body>
      <Card.Text>Total Balance</Card.Text>

        <Card.Title>
          {funds
            ? "$" + parseFloat(funds.quantity.toFixed(2)).toLocaleString()
            : "$0"}
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default TotalFundsCard;
