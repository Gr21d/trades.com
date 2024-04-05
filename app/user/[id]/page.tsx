import React from "react";
import { db } from "@/lib/db";
import "bootstrap/dist/css/bootstrap.css";
import WebSocketComponent from "@/app/components/webSocket";
import BuyButton from "@/app/components/BuyButton";
import SellButton from "@/app/components/SellButton";
import SendButton from "@/app/components/SendButton";

interface Props {
  params: { id: number };
}

const OwnedCrypto = async ({ params: { id } }: Props) => {
  const cryptos = await db.cryptocurrencies.findMany();
  const portfolio = await db.portfolios.findMany({
    where: {
      investorID: { equals: Number(id) },
    },
  });

  return (
    <>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr className="table-primary">
            <td>Crypto Symbol</td>
            <td>Crypto Name</td>
            <td>Owned Amount</td>
            <td>Current Price</td>
            <td>Value</td>
          </tr>
        </thead>

        <tbody>
          {cryptos
            .filter((crypto) =>
              portfolio
                .map((portfolio) => portfolio.cryptoID)
                .includes(crypto.id)
            )
            .sort((crypto) => crypto.id)
            .map((crypto) => (
              <tr>
                <th>{crypto.symbol}</th>
                <td>{crypto.name}</td>
                <td>
                  {portfolio
                    .filter((val) => val.cryptoID == crypto.id)
                    .map((val) => val.amount)}
                </td>
                <td>{<WebSocketComponent amount={1} />}</td>
                <td>
                  $
                  {portfolio
                    .filter((val) => val.cryptoID == crypto.id)
                    .map((val) => (
                      <WebSocketComponent amount={val.amount} />
                    ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="d-flex flex-row justify-content-evenly">
        <BuyButton />
        <SellButton />
        <SendButton />
      </div>
    </>
  );
};

export default OwnedCrypto;
