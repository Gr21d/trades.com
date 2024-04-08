import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle } from "react-bootstrap";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import randomColor from "randomcolor";
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

const Chart = ({ cryptos, cryptosOwned, decodedToken, prices }: Props) => {
  const [colors, setColors] = useState([""]);
  const filteredCryptos = cryptos.filter((o) =>
    cryptosOwned
      .filter((a) => a.portfolioId == decodedToken)
      .map((c) => c.cryptoId)
      .includes(o.id)
  );
  const ownedCrypto = cryptosOwned.filter((c) => c.portfolioId == decodedToken);
  const names = filteredCryptos.map((f) => ({
    name: f.name,
    id: f.id,
  }));
  const priceWithId = ownedCrypto.map((cryptoOwned) => {
    const priceObj = prices
      .filter((price) =>
        cryptos
          .filter((c) => c.id == cryptoOwned.cryptoId)
          .some(
            (crypto) =>
              crypto.symbol.toUpperCase().concat("USDT") === price.symbol
          )
      )
      .map((price) => ({
        price: parseFloat(
          parseFloat(price.price).toFixed(parseFloat(price.price) >= 1 ? 2 : 5)
        ),
        id: cryptoOwned.cryptoId,
      }))[0];

    if (priceObj) {
      return priceObj;
    } else {
      return { price: 1, id: cryptoOwned.cryptoId };
    }
  });
  const amounts = cryptosOwned
    .filter((c) => filteredCryptos.map((f) => f.id).includes(c.cryptoId))
    .map((m) => ({ id: m.cryptoId, amount: m.quantity }));
  const dataArray = names
    .map((nameItem) => {
      const priceItem = priceWithId.find((price) => price.id === nameItem.id);
      const amountItem = amounts.find((amount) => amount.id === nameItem.id);

      if (priceItem && amountItem) {
        const totalPrice = priceItem.price * amountItem.amount;
        return {
          name: nameItem.name,
          totalValue: parseFloat(totalPrice.toFixed(2)),
        };
      } else {
        return null;
      }
    })
    .filter((item) => item !== null);

  const dataArray2 = [
    {
      name: "Group A",
      value: 400,
    },
    {
      name: "Group B",
      value: 300,
    },
    {
      name: "Group C",
      value: 300,
    },
    {
      name: "Group D",
      value: 200,
    },
    {
      name: "Group E",
      value: 278,
    },
    {
      name: "Group F",
      value: 189,
    },
  ];
  useEffect(() => {
    const numberOfColors = dataArray.length;
    const hue = "#4caf50";
    setColors(randomColor({ count: numberOfColors, hue: hue }));
  }, [dataArray.length]);
  return (
    <Card
      style={{ width: "30vw" }}
      className="bg-light text-dark text-center react-card"
    >
      <CardTitle className="mt-3">Wealth Distribution</CardTitle>
      <CardBody>
        <PieChart width={400} height={290}>
          <Legend
            height={36}
            layout="vertical"
            verticalAlign="top"
            align="right"
          />
          <Pie
            dataKey="totalValue"
            isAnimationActive={true}
            data={dataArray}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#4caf50"
          >
            {dataArray2.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </CardBody>
    </Card>
  );
};

export default Chart;
