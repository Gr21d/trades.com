"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./portfolio.css";
import TableClient from "@/app/wallet/components/TableClient";
import { jwtDecode } from "jwt-decode";
import TotalFundsCard from "./components/TotalFundsCard";
import TotalValueCard from "./components/TotalValueCard";
import TotalProfitsCard from "./components/TotalProfitsCard";
import Chart from "./components/PieChart";
import SendButton from "./components/SendButton";
import SellButton from "./components/SellButton";
import DepositButton from "./components/DepositButton";
import WithdrawButton from "./components/WithdrawButton";
import BiggestEarner from "./components/BIggestEarner";
import BiggestLose from "./components/BiggestLose";
import HistoryChart from "./components/HistoryChart";
import PerformanceChart from "./components/PerformanceChart";
import Header from "../components/header";
import Footer from "../components/footer";

interface Crypto {
  id: number;
  symbol: string;
  name: string;
}
interface CryptoOwned {
  id: number;
  portfolioId: number;
  cryptoId: number;
  quantity: number;
  priceBought: number;
}
interface Prices {
  symbol: string;
  price: string;
}

const OwnedCrypto = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [ownedCrypto, setCryptoOwned] = useState<CryptoOwned[]>([]);
  const [prices, setPrices] = useState<Prices[]>([{ symbol: "", price: "" }]);
  const url = `wss://fstream.binance.com/ws/!markPrice@arr@1s`;
  const [decodedToken, setDecodedToken] = useState(0);
  const [loading, setLoading] = useState(4);

  useEffect(() => {
    fetchCryptos();
    fetchownedCryptos();
  }, []);
  useEffect(() => {
    let ws = new WebSocket(url);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newPrices: Prices[] = data.map((crypto: any) => ({
        symbol: crypto.s,
        price: crypto.p,
      }));
      setPrices(newPrices);
    };
  }, []);
  useEffect(() => {
    const getToken = () => {
      if (typeof window !== "undefined" && window.localStorage) {
        return localStorage.getItem("token");
      }
      return null;
    };
    const token = getToken();
    if (token) {
      console.log("Token found: ", jwtDecode(token).portfolioId);
      setDecodedToken(jwtDecode(token).portfolioId);
    } else {
      console.log("Token not found");
    }
  }, []);

  const fetchCryptos = async () => {
    try {
      const response = await fetch("wallet/walletAPIs/prismaAPIs/cryptosAPI", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCryptos(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching crypto:", error);
    } finally {
      setLoading((count) => count - 1);
    }
  };
  const fetchownedCryptos = async () => {
    try {
      const response = await fetch(
        "wallet/walletAPIs/prismaAPIs/ownedCryptoAPI",
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCryptoOwned(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching cryptoOwned:", error);
    } finally {
      setLoading((count) => count - 1);
    }
  };
  return (
    <div className=" container-fluid pb-1">
      {loading == 0 && (
        <div className="container-fuid">
          <div className="row">
            <Header />
          </div>

          <div className="row d-flex flex-row justify-content-between align-items-center mx-2">
            <div className="col">
              <div className="d-flex flex-row align-items-center justify-content-start mb-3 ms-3">
                <TotalFundsCard
                  cryptos={cryptos}
                  cryptosOwned={ownedCrypto}
                  decodedToken={decodedToken}
                />
              </div>
            </div>
            <div className="col">
              <div className="d-flex flex-row align-items-center justify-content-start mb-3 ms-3">
                <TotalProfitsCard
                  cryptos={cryptos}
                  cryptosOwned={ownedCrypto}
                  decodedToken={decodedToken}
                  prices={prices}
                />
              </div>
            </div>
            <div className="col">
              <div className="d-flex flex-row align-items-center justify-content-start mb-3 ms-3">
                <TotalValueCard
                  cryptos={cryptos}
                  cryptosOwned={ownedCrypto}
                  decodedToken={decodedToken}
                  prices={prices}
                />
              </div>
            </div>
            <div className="col">
              <div className="d-flex flex-row align-items-center justify-content-center mb-3 ms-3">
                <BiggestEarner
                  cryptos={cryptos}
                  cryptosOwned={ownedCrypto}
                  decodedToken={decodedToken}
                  prices={prices}
                />
              </div>
            </div>
            <div className="col">
              <div className="d-flex flex-row align-items-center justify-content-start mb-3 ms-3">
                <BiggestLose
                  cryptos={cryptos}
                  cryptosOwned={ownedCrypto}
                  decodedToken={decodedToken}
                  prices={prices}
                />
              </div>
            </div>
            <div
              className="col d-flex flex-row align-items-center justify-content-start"
              style={{ height: 142.2 }}
            >
              <SendButton
                coins={cryptos
                  .filter(
                    (c) =>
                      ownedCrypto
                        .filter((f) => f.portfolioId == decodedToken)
                        .map((cr) => cr.cryptoId)
                        .includes(c.id) && c.name != "USD"
                  )
                  .map((c) => c.symbol)}
                token={decodedToken}
              />
              <DepositButton token={decodedToken} />
              <WithdrawButton token={decodedToken} />
            </div>
          </div>
          <div className="row">
            <div className="col mb-3" style={{ height: "390px" }}>
              <HistoryChart />
            </div>
            <div className="col mb-3" style={{ height: "390px" }}>
              <PerformanceChart />
            </div>
            <div className="col mb-3" style={{ height: "390px" }}>
              <Chart
                cryptos={cryptos}
                cryptosOwned={ownedCrypto}
                decodedToken={decodedToken}
                prices={prices}
              />
            </div>
          </div>

          <div className="row mx-2">
            <table
              className="table"
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                margin: "auto",
              }}
            >
              <thead>
                <tr>
                  <td style={{ backgroundColor: "#4caf50" }}></td>
                  <td style={{ backgroundColor: "#4caf50" }}>Crypto Symbol</td>
                  <td style={{ backgroundColor: "#4caf50" }}>Crypto Name</td>
                  <td style={{ backgroundColor: "#4caf50" }}>Owned Amount</td>
                  <td style={{ backgroundColor: "#4caf50" }}>Current Price</td>
                  <td style={{ backgroundColor: "#4caf50" }}>Value</td>
                  <td style={{ backgroundColor: "#4caf50" }}>P/L</td>
                </tr>
              </thead>

              <TableClient
                cryptos={cryptos}
                cryptosOwned={ownedCrypto}
                prices={prices}
                decodedToken={decodedToken}
              />
            </table>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default OwnedCrypto;
