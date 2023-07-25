import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const DonutChartComponent = ({ data }) => {
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];
  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        cx={200}
        cy={150}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default DonutChartComponent;
