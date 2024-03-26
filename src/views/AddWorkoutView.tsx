import { Search } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  InputAdornment,
  List,
  ListItem,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { Workout } from "../routes/add-workout/index.lazy";

export default function AddWorkoutView({
  categories,
  category,
  setCategory,
  search,
  searchResults,
  addWorkout,
  workouts,
}: {
  categories: string[];
  category: string;
  setCategory: (event: SelectChangeEvent) => void;
  search: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchResults: Workout[];
  addWorkout: (workout: Workout) => void;
  workouts: Workout[];
}) {
  return (
    <Grid container rowSpacing={2} columnSpacing={2} sx={{ width: "100%", height: "100%", p: 2 }}>
      <Grid item md={8} xs={12}>
        {/* Search menu */}
        <Paper elevation={4} sx={{ width: "100%", height: "100%" }}>
          <Container sx={{ pt: 2 }}>
            <Stack direction="row" spacing={2}>
              {/* Filter by category */}
              <Select variant="standard" value={category} onChange={setCategory}>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
              {/* Search field */}
              <TextField
                variant="standard"
                sx={{ width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                onChange={search}
              />
            </Stack>
          </Container>
          {/* Search results */}
          <Container sx={{ pt: 2 }}>
            <Grid container rowSpacing={2} columnSpacing={2} sx={{ pb: 1 }}>
              {searchResults.map((result) => (
                <Grid item key={result.title} md={6} xs={12}>
                  <Card>
                    <CardMedia component="img" height="140" image={result.image} alt={result.title} />
                    <CardHeader title={result.title} subheader={result.description} />
                    <CardActions>
                      <Button onClick={() => addWorkout(result)}>Add to workout</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Paper>
      </Grid>
      <Grid item md={4} xs={12}>
        <Card>
          <CardHeader title="Workout session" />
          <CardContent>
            <List>{workouts && workouts.map((workout) => <ListItem key={workout.id}>{workout.title}</ListItem>)}</List>
          </CardContent>
          <CardActions>
            <Button>Add session</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
