"use client";
import React, { useEffect, useState } from "react";

interface Props {
  amount: number;
}

export const WebSocketComponent = ({ amount }: Props) => {
  const [price, setPrice] = useState("0");
  useEffect(() => {
    let ws = new WebSocket("wss://fstream.binance.com/ws/btcusdt@markPrice");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPrice(data.p);
    };
  }, []);
  return (parseFloat(price) * amount)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

export default WebSocketComponent;
