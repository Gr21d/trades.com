import React, { useEffect, useState } from "react";
import "../portfolio.css";
import { Card, CardSubtitle } from "react-bootstrap";
import DynamicCellPL from "./DynamicCellPL";
import FetchImage from "./FetchImage";
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

const BiggestEarner = ({
  cryptos,
  cryptosOwned,
  decodedToken,
  prices,
}: Props) => {
  const [imageData, setData] = useState("");
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
          name: cryptos.filter(
            (c) => c.symbol == price.symbol.replace("USDT", "").toLowerCase()
          )[0].name,
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

  const sortedProfit = profits.sort(
    (a, b) => a.percentProfit - b.percentProfit
  );
  if (sortedProfit[0]) {
    return (
      <Card
        style={{ width: "18rem" }}
        className="bg-light text-dark text-center react-card"
      >
        <Card.Body>
          <Card.Title className="mx-2">
            <DynamicCellPL
              content={
                sortedProfit[0] &&
                sortedProfit[0].percentProfit.toLocaleString().concat("%")
              }
            />
          </Card.Title>
          <CardSubtitle className="text-center d-flex flex-row justify-content-center gap-3">
            <span className="align-self-center" style={{ fontSize: 20 }}>
              {sortedProfit[0] &&
                "$" +
                  sortedProfit[0].profit.toLocaleString() +
                  " - " +
                  sortedProfit[0].symbol.replace("USDT", "")}
            </span>
            <FetchImage
              namen={sortedProfit[0].name.toLowerCase().replaceAll(" ", "")}
            />
          </CardSubtitle>
          <Card.Text>Worst Performer</Card.Text>
        </Card.Body>
      </Card>
    );
  }
};

export default BiggestEarner;
