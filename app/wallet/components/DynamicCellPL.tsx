import React, { useState } from "react";

interface Props {
  content: string;
}

const DynamicCellPL = ({ content }: Props) => {
  const dynamicColor =
    parseFloat(content) < 0
      ? "red"
      : parseFloat(content) > 0
      ? "#4caf50"
      : "black";
  return <p style={{ color: dynamicColor }}>{content}</p>;
};

export default DynamicCellPL;
