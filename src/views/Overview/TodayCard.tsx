import { Box, Card, CardContent, Stack, Typography } from "@mui/material"
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts"
import theme from "../../theme"

export function TodayCard({
  exercises,
  exercisesMax,
  caloriesBurned,
  caloriesMax,
}: {
  exercises: number
  exercisesMax: number
  caloriesBurned: number
  caloriesMax: number
}) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Today
        </Typography>
        <Stack direction="row">
          <Box>
            <RadialBarChart
              width={150}
              height={150}
              innerRadius="80%"
              outerRadius="100%"
              data={[{ value: exercises }]}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, exercisesMax]}
                tick={false}
              />
              <RadialBar
                background
                dataKey="value"
                cornerRadius={150 / 2}
                fill={theme.palette.primary.main}
                label={{
                  position: "center",
                  formatter: (value: number) => `${value} exercises`,
                }}
              />
            </RadialBarChart>
            <Typography align="center">Exercises</Typography>
          </Box>
          <Box>
            <RadialBarChart
              width={150}
              height={150}
              innerRadius="80%"
              outerRadius="100%"
              data={[{ value: caloriesBurned }]}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, caloriesMax]}
                tick={false}
              />
              <RadialBar
                background
                dataKey="value"
                cornerRadius={150 / 2}
                fill={theme.palette.primary.main}
                label={{
                  position: "center",
                  formatter: (value: number) => `${value} kcal`,
                }}
              />
            </RadialBarChart>
            <Typography align="center">Calories</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}
