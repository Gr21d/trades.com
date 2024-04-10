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
    priceBought: number;
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
          cryptoOwned.priceBought * cryptoOwned.quantity;

        const percentProfit = (
          (totalValue / (cryptoOwned.priceBought * cryptoOwned.quantity)) *
          100
        );

        return {
          name: cryptos.filter(
            (c) => c.symbol == price.symbol.replace("USDT", "").toLowerCase()
          )[0].name,
          symbol: price.symbol,
          profit: parseFloat(totalValue),
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
          style={{ width: "200px", height: 100, border: "none", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)"}}
          className="bg-white text-dark text-center react-card"
        >
          <Card.Body>
            <Card.Title className="mx-2" style={{ fontSize: 12 }}>
              <span style={{ fontSize: 12 }}>Worst Performer</span>
            </Card.Title>
            <CardSubtitle className="text-center d-flex flex-row justify-content-center gap-3">
              <div className="title-relax">
                <FetchImage
                  namen={sortedProfit[sortedProfit.length - 1].name.toLowerCase().replaceAll(" ", "")}
                />
                {sortedProfit[sortedProfit.length - 1] &&
                  "$" +
                  sortedProfit[sortedProfit.length - 1].symbol.replace("USDT", "")}
              </div>
            </CardSubtitle>
            <Card.Text>
              <div className="displayflexx">
                <span style={{ fontSize: 12, marginBottom: "10px"}}>
                  {sortedProfit[sortedProfit.length - 1] &&
                    "$" +
                    sortedProfit[sortedProfit.length - 1].profit.toLocaleString()}
                </span>
                <DynamicCellPL
                  content={
                    sortedProfit[sortedProfit.length - 1] &&
                    sortedProfit[sortedProfit.length - 1].percentProfit.toLocaleString().concat("%")
                  }
                />
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
    );
  }
};

export default BiggestEarner;
