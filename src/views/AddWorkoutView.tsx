import { Delete, Search } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Modal,
  Paper,
  Select,
  SelectChangeEvent,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Exercise, ExerciseType } from "../features/workouts/workoutsSlice";
import FullscreenCircularProgress from "../components/FullscreenCircularProgress";
import { useState } from "react";

export default function AddWorkoutView({
  sets,
  setSets,
  reps,
  setReps,
  types,
  selectedType,
  setType,
  setName,
  name,
  search,
  searchLoading,
  searchResults,
  addWorkout,
  exercises,
  addExercise,
  removeExercise,
}: {
  sets: number;
  setSets: (event: Event, value: number | number[]) => void;
  reps: number;
  setReps: (event: Event, value: number | number[]) => void;
  types: ExerciseType[];
  selectedType: ExerciseType | "all";
  setType: (event: SelectChangeEvent) => void;
  setName: (name: string) => void;
  name: string;
  search: () => void;
  searchLoading: boolean;
  searchResults: Exercise[];
  addWorkout: () => void;
  exercises: Exercise[];
  addExercise: (exercise: Exercise) => void;
  removeExercise: (name: string) => void;
}) {
  const [addModal, setAddModal] = useState(false);
  const [result, setResult] = useState<Exercise | null>(null);

  return (
    <>
      <Grid container spacing={2} sx={{ width: "100%", height: "100%", p: 2 }}>
        {/* Selected Workout */}
        <Grid item md={3} xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">New workout</Typography>
              <Typography variant="subtitle1">
                {new Date().toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <List disablePadding>
                {exercises.map((exercise) => (
                  <ListItem
                    key={exercise.name}
                    secondaryAction={
                      <IconButton edge="end" onClick={() => removeExercise(exercise.name)}>
                        <Delete />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={exercise.name} secondary={`${exercise.sets} sets, ${exercise.reps} reps`} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
            <CardActions>
              <Button disabled={exercises.length == 0} onClick={addWorkout}>
                Add workout
              </Button>
            </CardActions>
          </Card>
        </Grid>
        {/* Add exercises */}
        <Grid item md={9} xs={12}>
          {/* Search menu */}
          <Paper elevation={4} sx={{ width: "100%", height: "100%" }}>
            <Container sx={{ pt: 2 }}>
              <Stack direction="row" spacing={2}>
                {/* Filter by type */}
                <Select variant="standard" value={selectedType || "all"} onChange={setType}>
                  <MenuItem key={1} value={"all"}>
                    ALL
                  </MenuItem>
                  {types.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type.replace("_", " ").toLocaleUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
                {/* Search field */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    search();
                  }}
                  style={{ flexGrow: 1 }}
                >
                  <TextField
                    placeholder="Search Exercise"
                    variant="standard"
                    sx={{ width: "100%" }}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton type="submit">
                            <Search />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </form>
              </Stack>
            </Container>
            {/* Search results */}
            <Container sx={{ pt: 2, minHeight: 400 }}>
              {searchLoading ? (
                <FullscreenCircularProgress />
              ) : searchResults.length == 0 ? (
                <Typography variant="h5">No exercises found</Typography>
              ) : (
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, lg: 12 }} sx={{ pb: 1 }}>
                  {searchResults.map((result) => (
                    <Grid item key={result.name} xs={4} sm={4} lg={4}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" noWrap>
                            {result.name}
                          </Typography>
                          <Stack direction="row" spacing={0.5} useFlexGap flexWrap="wrap" sx={{ p: 0 }}>
                            {result.difficulty && (
                              <Chip color="secondary" size="small" label={result.difficulty.toLocaleUpperCase()} />
                            )}
                            {result.type && (
                              <Chip
                                color="success"
                                size="small"
                                label={result.type.replace("_", " ").toLocaleUpperCase()}
                              />
                            )}
                            {result.muscle && (
                              <Chip
                                color="primary"
                                size="small"
                                label={result.muscle.replace("_", " ").toLocaleUpperCase()}
                              />
                            )}
                          </Stack>
                          <Typography
                            variant="body1"
                            sx={{
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 2,
                            }}
                          >
                            {result.instructions}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            disabled={exercises.some((e) => e.name === result.name)}
                            onClick={() => {
                              setResult(result);
                              setAddModal(true);
                            }}
                          >
                            Add to workout
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Container>
          </Paper>
        </Grid>
      </Grid>
      <Modal open={addModal} onClose={() => setAddModal(false)}>
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {result?.name}
          </Typography>
          <Typography variant="subtitle1">Sets</Typography>
          <Slider value={sets} onChange={setSets} step={1} marks min={1} max={8} valueLabelDisplay="on" />
          <Typography variant="subtitle1">Reps</Typography>
          <Slider value={reps} onChange={setReps} step={1} marks min={1} max={20} valueLabelDisplay="on" />
          <Button
            disabled={result === null}
            onClick={() => {
              addExercise(result!);
              setAddModal(false);
            }}
          >
            Add to workout
          </Button>
        </Paper>
      </Modal>
    </>
  );
}
