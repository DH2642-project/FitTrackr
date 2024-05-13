import { Grid } from "@mui/material";
import { GoalChart } from "./GoalChart.tsx";
import { TotalView } from "./TotalView.tsx";
import { CalendarChart } from "./CalendarChart.tsx";
import { ActivityChart } from "./ActivityChart.tsx";
import PieChartView from "./PieChartView.tsx";
import { GoalsState } from "../../Model/goals/goalsReducer.ts";

interface ProgressViewProps {
  goals: GoalsState;
  workouts: { length: number };
  updateGoalSelection: (id: string) => void;
  calendarData: { date: string; count: number }[];
  totalWeight: number | string;
  totalDistance: number | string;
  weeklyData: { x: number; y: number }[];
  muscleGroupsData: { name: string; value: number }[];
  workoutTypesData: { name: string; value: number }[];
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  goals,
  workouts,
  updateGoalSelection,
  calendarData,
  totalWeight,
  totalDistance,
  weeklyData,
  muscleGroupsData,
  workoutTypesData,
}) => {
  return (
    <>
      <Grid container spacing={4} sx={{ padding: "30px" }}>
        {goals.goals.length > 0 && (
          <Grid item xs={6}>
            <GoalChart
              onGoalSelection={updateGoalSelection}
              goals={goals}
            ></GoalChart>
          </Grid>
        )}

        <Grid item xs={6}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <TotalView
                title={"Total distance (km)"}
                value={totalDistance}
              ></TotalView>
            </Grid>
            <Grid item xs={6}>
              <TotalView
                title={"Total workouts"}
                value={workouts.length}
              ></TotalView>
            </Grid>
            {workouts.length > 0 && (
              <Grid item xs={12}>
                <ActivityChart
                  data={weeklyData}
                  title="Weekly activity"
                  legend="Week"
                  yAxisLabel="Completed workouts"
                ></ActivityChart>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <TotalView
            title={"Total weight lifted (kg)"}
            value={totalWeight}
          ></TotalView>
        </Grid>
        <Grid item xs={8}>
          <CalendarChart data={calendarData}></CalendarChart>
        </Grid>
        {workouts.length > 0 && (
          <Grid item xs={6}>
            <PieChartView
              data={muscleGroupsData}
              title="Muscles worked"
            ></PieChartView>
          </Grid>
        )}
        {workouts.length > 0 && (
          <Grid item xs={6}>
            <PieChartView
              data={workoutTypesData}
              title="Workout types"
            ></PieChartView>
          </Grid>
        )}
      </Grid>
    </>
  );
};