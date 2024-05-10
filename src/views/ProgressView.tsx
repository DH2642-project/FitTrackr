import { Grid } from "@mui/material";
import { GoalChart } from "./Progress/GoalChart.tsx";
import { TotalView } from "./Progress/TotalView.tsx";
import { CalendarChart } from "./Progress/CalendarChart.tsx";
import { ActivityChart } from "./Progress/ActivityChart.tsx";
import MuscleChart from "./Progress/MuscleChart.tsx";

interface ProgressViewProps {
  goals: any;
  workouts: any;
  updateGoalSelection: (id: string) => void;
  calendarData: any;
  totalWeight: any;
  totalDistance: any;
  weeklyData: any;
  muscleGroupsData: any;
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
            <MuscleChart data={muscleGroupsData}></MuscleChart>
          </Grid>
        )}
      </Grid>
    </>
  );
};