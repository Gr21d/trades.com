import React, { useState } from "react";

interface Props {
  content: string;
}

const DynamicCellPL = ({ content }: Props) => {
  const dynamicColor =
    parseFloat(content) < 0
      ? "text-danger"
      : parseFloat(content) > 0
      ? "text-success"
      : "text-dark";
  return <td className={dynamicColor}>{content}%</td>;
};

export default DynamicCellPL;
