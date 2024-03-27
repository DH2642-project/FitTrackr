import React from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";


const GoalProgressChart: React.FC<{ value: number }> = ({ value }) => {
    const circleSize = 200;
    const data = [{ value }];
  return (
    <RadialBarChart
      width={circleSize}
      height={circleSize}
      innerRadius="60%"
      outerRadius="80%"
      data={data}
      startAngle={90}
      endAngle={-270}
    >
      <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
      <RadialBar
        background
        dataKey="value"
        cornerRadius={circleSize / 2}
        fill="#ff7f0e"
        label={{
          position: "center",
          formatter: (value: number) => `${value}%`,
        }}
      />
    </RadialBarChart>
  );
};

export default GoalProgressChart;
