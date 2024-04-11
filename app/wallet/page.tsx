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
      <Header type="portfolio"/>

      {loading == 0 && (
        <div className="container-fuid">
          <div className="portfolio-area">
            <div className="left-area">
              <h6 style={{color: "black", fontWeight:"bold", marginTop: "10px"}}>My Portfolio</h6>
            </div>
            <div className="right-area">
            <div className="titleasd">
            <h6 style={{color: "black", fontWeight:"bold", marginTop: "10px"}}>My Portfolio</h6>
              <div className="show-charts">
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

            <TotalValueCard
                      cryptos={cryptos}
                      cryptosOwned={ownedCrypto}
                      decodedToken={decodedToken}
                      prices={prices}
                    />
              <div className="realtimedatas">
              <div className="col1">
                  <div className="width">
                    <TotalFundsCard
                      cryptos={cryptos}
                      cryptosOwned={ownedCrypto}
                      decodedToken={decodedToken}
                    />
                  </div>
                </div>
                <div className="col1">
                  <div className="width">
                    <TotalProfitsCard
                      cryptos={cryptos}
                      cryptosOwned={ownedCrypto}
                      decodedToken={decodedToken}
                      prices={prices}
                    />
                  </div>
                </div>
                <div className="col1">
                  <div className="width">
                    <BiggestEarner
                      cryptos={cryptos}
                      cryptosOwned={ownedCrypto}
                      decodedToken={decodedToken}
                      prices={prices}
                    />
                  </div>
                </div>
                <div className="col1">
                  <div className="width">
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
                  style={{ height: "100"}}
                >
                </div>
              </div>
              <div className="row amk">
                <div className="col mb-3" style={{ height: "100%" }}>
                  <Chart
                    cryptos={cryptos}
                    cryptosOwned={ownedCrypto}
                    decodedToken={decodedToken}
                    prices={prices}
                  />
                </div>
                {/* <div className="col mb-3" style={{ height: "100%" }}>
                  <HistoryChart />
                </div>
                <div className="col mb-3" style={{ height: "100%" }}>
                  <PerformanceChart />
                </div> */}
              </div>
              <h6 style={{color: "black", fontWeight:"bold", marginTop: "10px"}}>Assets</h6>

              <div className="row mx-2">
                <table
                  className="table"
                  style={{
                    overflow: "hidden",
                    backgroundColor: "transparent",
                    padding: "20px",
                    margin: "auto",
                  }}
                >
                <thead>
                  <tr>
                    <td></td>
                    <td>
                      Name
                    </td>
                    <td>
                      Symbol
                    </td>
                    <td>
                      Holdings
                    </td>
                    <td>
                      Current Price
                    </td>
                    <td>Value</td>
                    <td>P/L</td>
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
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default OwnedCrypto;
