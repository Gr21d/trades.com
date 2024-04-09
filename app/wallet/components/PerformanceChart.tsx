import React, { PureComponent } from "react";
import { Card, CardBody, CardTitle } from "react-bootstrap";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PerformanceChart = () => {
  const data = [
    {
      name: "Page A",
      uv: 25,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 12,
      pv: 1398,
      amt: 2210,
    },
  ];

  const gradientOffset = () => {
    const dataMax = Math.max(...data.map((i) => i.uv));
    const dataMin = Math.min(...data.map((i) => i.uv));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();
  return (
    <Card
      className="bg-white text-dark text-center react-card"
      style={{ width: "30vw" }}
    >
      <CardTitle className="mt-3">Performance (Cumulative)</CardTitle>
      <CardBody>
        <AreaChart width={254} height={290} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="green" stopOpacity={1} />
              <stop offset={off} stopColor="red" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#000"
            fill="url(#splitColor)"
          />
        </AreaChart>
      </CardBody>
    </Card>
  );
};
export default PerformanceChart;
