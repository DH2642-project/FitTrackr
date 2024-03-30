import { Grid,Button, Card, Stack, Typography, CardContent } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import GoalProgressChart from "../Progress/GoalProgressChart";

export function CurrentGoalsView(props: any) {
     function currentGoalCardCB(goal: any) {
       return (
         <Card key={goal.id} sx={{ borderRadius: 4 }}>
           <CardContent>
             <Grid container spacing={2}>
               <Grid item xs={9}>
                 <Typography variant="h4">{goal.description}</Typography>
                 <Typography variant="body1">Type: {goal.goalType}</Typography>
                 <Typography variant="body1">
                   Exercise: {goal.exercise}
                 </Typography>
                 <Typography variant="body1">
                   Start: {goal.startingPoint}
                 </Typography>
                 <Typography variant="body1">Goal: {goal.endGoal}</Typography>
               </Grid>

               <Grid item xs={3}>
                 <GoalProgressChart value={goal.progress}></GoalProgressChart>
               </Grid>
             </Grid>

             <Button
               type="button"
               variant="contained"
               color="error"
               onClick={() => props.onDeleteGoal(goal.id)}
             >
               Delete
             </Button>
           </CardContent>
         </Card>
       );
     }
    const goals = useSelector(
        (state: RootState) => state.goals.goals
    );
    return (
        <Stack spacing={2}>
            {goals.map(currentGoalCardCB)}
        </Stack>
    )
}