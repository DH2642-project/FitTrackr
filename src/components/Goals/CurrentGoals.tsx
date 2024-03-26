import { Grid,Button, Card, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Gauge } from "@mui/x-charts/Gauge";

export function CurrentGoals(props: any) {
     function currentGoalCardCB(goal: any) {
       return (
         <Card key={goal.id}>
           <Grid container spacing={2}>
             <Grid item xs={10}>
               <Typography variant="h4">{goal.description}</Typography>
             </Grid>
             <Grid item xs={2}>
               <Gauge width={100} height={100} value={goal.progress} />
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