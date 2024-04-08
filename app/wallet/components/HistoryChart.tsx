import React, { PureComponent } from "react";
import { Card, CardBody, CardTitle } from "react-bootstrap";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const HistoryChart = () => {
  const data = [
    {
      name: "Page A",
      value: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      value: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      value: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      value: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      value: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      value: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      value: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <Card
      className="bg-light text-dark text-center react-card"
      style={{ width: "30vw" }}
    >
      <CardTitle className="mt-3">History of value</CardTitle>
      <CardBody>
        <AreaChart width={254} height={290} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </CardBody>
    </Card>
  );
};

export default HistoryChart;
