import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const PieChartComponent = ({ data }) => {
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];
  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        cx={200}
        cy={150}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
