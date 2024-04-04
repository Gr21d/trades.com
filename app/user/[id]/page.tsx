import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import prisma from "@/server/prisma";
import TableClient from "@/app/components/TableClient";

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
  const ownedCrypto = await prisma.cryptoPortfolioOwned.findMany({
    select: {
      id: true,
      portfolioId: true,
      cryptoId: true,
      quantity: true,
      buyPrice: true,
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
            <td>P/L</td>
          </tr>
        </thead>

        <TableClient cryptos={cryptos} cryptosOwned={ownedCrypto} />
      </table>
    </>
  );
};

export default OwnedCrypto;
