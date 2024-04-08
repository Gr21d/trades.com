"use client";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
interface Props {
  namen: string;
}
const FetchImage = ({ namen }: Props) => {
  const [imageData, setData] = useState("");
  const fetchImage = async (name: string) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${name}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setData(data.image.small);
      console.log("DATA SET!");
    } catch (error) {
      console.error("Error fetching crypto:", error);
    }
  };
  useEffect(() => {
    fetchImage(namen);
  }, []);
  return <Card.Img style={{ width: 30, height: 30 }} src={imageData} />;
};

export default FetchImage;
