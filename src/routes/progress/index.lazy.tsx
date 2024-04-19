import { Grid } from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";
import { ActivityChart } from "../../views/Progress/ActivityChart.tsx";
import { GoalChart } from "../../views/Progress/GoalChart.tsx";
import { fetchGoals, setCurrentGoal } from "../../features/goals/goalsReducer.ts";
import { useDispatch, useSelector } from "react-redux";
import { TotalView } from "../../views/Progress/TotalView.tsx";
import { CalendarChart } from "../../views/Progress/CalendarChart.tsx";
import { AppDispatch, RootState } from "../../store.ts";
import { fetchWorkouts } from "../../features/workouts/workoutsSlice.ts";
import MuscleChart from "../../views/Progress/MuscleChart.tsx";
import { useEffect } from "react";
import { getCalendarData, getMuscleGroupsData, getWeightlifted, getWorkoutsPerWeek } from "../../utils/progressUtils.tsx";

export const Route = createLazyFileRoute("/progress/")({
  component: ProgressPresenter,
});

export function ProgressPresenter() {
  const goals = useSelector((state: RootState) => state.goals);
  const workouts = useSelector((state: RootState) => state.workouts.workouts);

  const dispatch = useDispatch<AppDispatch>();

  const updateGoalSelection = (id: string) => {
    dispatch(setCurrentGoal(id));
  };

  useEffect(() => {
    try {
       dispatch(fetchGoals());
       dispatch(fetchWorkouts());
    } catch (error) {
      console.log("Error fetching data")
    }
   
  }, [dispatch]);

  const calendarData = getCalendarData(workouts);
  const totalWeight = getWeightlifted(workouts);
  const weeklyData = getWorkoutsPerWeek(workouts);
  const muscleGroupsData = getMuscleGroupsData(workouts);

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
              <TotalView title={"Total distance (km)"} value={"55"}></TotalView>
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
}
