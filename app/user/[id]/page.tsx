import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import prisma from "@/server/prisma";
import SendButton from "@/app/components/SendButton";
import TableClient from "@/app/components/TableClient";
import SellButton from "@/app/components/SellButton";

interface Props {
  params: { id: number };
}

const OwnedCrypto = async ({ params: { id } }: Props) => {
  const cryptos = await prisma.cryptocurrency.findMany({
    select: {
      id: true,
      name: true,
      symbol: true,
    },
  });
  const portfolio = await prisma.portfolio.findMany({
    where: {
      id: { equals: Number(id) },
    },
  });
  const ownedCrypto = await prisma.cryptoPortfolioOwned.findMany({
    select: {
      id: true,
      portfolioId: true,
      cryptoId: true,
      quantity: true,
    },
    where: {
      portfolioId: { equals: Number(id) },
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
        <TableClient cryptos={cryptos} cryptosOwned={ownedCrypto} />
      </table>
      <div className="d-flex flex-row justify-content-evenly">
        <SendButton coins={cryptos.map((crypto) => crypto.symbol)} />
        <SellButton coins={cryptos.map((crypto) => crypto.symbol)} />
      </div>
    </>
  );
};

export default OwnedCrypto;
