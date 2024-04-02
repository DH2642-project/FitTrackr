import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

export function GoalProgressChart({ value, circleSize }: { value: number; circleSize: number}){
     const data = [{ value }];
  return (
    <RadialBarChart
      width={circleSize}
      height={circleSize}
      innerRadius="80%"
      outerRadius="100%"
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


