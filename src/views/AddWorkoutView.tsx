import { CheckCircle, ExpandMore, Remove, Search } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
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
import { toFriendlyString } from "../helpers";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import dayjs from "dayjs";

export default function AddWorkoutView({
  setDistance,
  setTime,
  setWeight,
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
  addWorkoutLoading,
  exercises,
  addExercise,
  removeExercise,
  date,
  setDate,
}: {
  setDistance: (distance: number) => void;
  setTime: (time: number) => void;
  setWeight: (weight: number) => void;
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
  addWorkoutLoading: boolean;
  exercises: Exercise[];
  addExercise: (exercise: Exercise) => void;
  removeExercise: (name: string) => void;
  date: string;
  setDate: (date: string) => void;
}) {
  const [addModal, setAddModal] = useState(false);
  const [result, setResult] = useState<Exercise | null>(null);

  return (
    <>
      <Grid
        container
        spacing={1.5}
        sx={{
          width: "100%",
          height: "100%",
          p: "0.75rem 0rem 0.75rem 0.75rem",
        }}
      >
        {/* Selected Workout */}
        <Grid item md={3} xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" align="center">
                New workout
              </Typography>
              <Typography variant="subtitle1" align="center">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    name="workout-date"
                    ampm={false}
                    defaultValue={dayjs(new Date(date).toISOString())}
                    onChange={(newValue) => {
                      if (newValue) setDate(newValue.toISOString());
                    }}
                  />
                </LocalizationProvider>
              </Typography>
              <List disablePadding>
                {exercises.map((exercise) => (
                  <ListItem
                    key={exercise.name}
                    disablePadding
                    secondaryAction={
                      <IconButton
                        edge="end"
                        onClick={() => removeExercise(exercise.name)}
                      >
                        <Remove />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={
                        <Typography lineHeight={1}>{exercise.name}</Typography>
                      }
                      secondary={
                        exercise.type !== "cardio"
                          ? `${exercise.sets} sets, ${exercise.reps} reps, ${exercise.weight} kg `
                          : `${exercise.distance} km, ${exercise.time} minutes`
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
            <CardActions>
              {addWorkoutLoading ? (
                <Button
                  startIcon={<CircularProgress color="inherit" size={20} />}
                  disabled
                >
                  Loading...
                </Button>
              ) : (
                <Button disabled={exercises.length == 0} onClick={addWorkout}>
                  Add workout
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>
        {/* Add exercises */}
        <Grid item md={9} xs={12} sx={{ minHeight: "100%" }}>
          {/* Search menu */}
          <Paper elevation={4} sx={{ width: "100%", height: "100%" }}>
            <Container sx={{ pt: 2 }}>
              <Stack direction="row" spacing={2}>
                {/* Filter by type */}
                <Select
                  variant="standard"
                  value={selectedType || "all"}
                  onChange={setType}
                >
                  <MenuItem key={1} value={"all"}>
                    All
                  </MenuItem>
                  {types.map((type) => (
                    <MenuItem key={type} value={type}>
                      {toFriendlyString(type)}
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
            <Container sx={{ p: { xs: 1, md: 2 }, height: "100%" }}>
              {searchLoading ? (
                <FullscreenCircularProgress />
              ) : searchResults.length == 0 ? (
                <Typography variant="h6" align="center">
                  No exercises found
                </Typography>
              ) : (
                <Grid
                  container
                  spacing={{ xs: 1, md: 2 }}
                  columns={{ xs: 4, md: 8 }}
                  sx={{ pb: 1 }}
                >
                  {searchResults.map((result) => {
                    const isAdded = exercises.some(
                      (e) => e.name === result.name
                    );
                    return (
                      <Grid item key={result.name} xs={4}>
                        <Badge
                          invisible={!isAdded}
                          badgeContent={
                            <CheckCircle
                              sx={{
                                fontSize: 32,
                                color: "success.main",
                              }}
                            />
                          }
                          sx={{
                            width: "100%",
                          }}
                        >
                          <Card
                            variant={isAdded ? "outlined" : "elevation"}
                            elevation={isAdded ? 0 : 3}
                            sx={{
                              width: "100%",
                            }}
                          >
                            <CardActionArea
                              onClick={() => {
                                setResult(result);
                                setAddModal(true);
                              }}
                            >
                              <CardContent>
                                <Typography
                                  variant="h5"
                                  gutterBottom
                                  lineHeight={1}
                                >
                                  {result.name}
                                </Typography>
                                <Stack
                                  direction="row"
                                  spacing={0.5}
                                  useFlexGap
                                  flexWrap="wrap"
                                  sx={{
                                    pb: 1,
                                    filter: isAdded ? "grayscale(1)" : "none",
                                  }}
                                >
                                  {result.difficulty && (
                                    <Chip
                                      color="secondary"
                                      size="small"
                                      label={toFriendlyString(
                                        result.difficulty
                                      )}
                                    />
                                  )}
                                  {result.type && (
                                    <Chip
                                      color="success"
                                      size="small"
                                      label={toFriendlyString(result.type)}
                                    />
                                  )}
                                  {result.muscle && (
                                    <Chip
                                      color="error"
                                      size="small"
                                      label={toFriendlyString(result.muscle)}
                                    />
                                  )}
                                </Stack>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{
                                    overflow: "hidden",
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 3,
                                  }}
                                  title={result.instructions}
                                >
                                  {result.instructions}
                                </Typography>
                              </CardContent>
                              <CardActions>
                                {isAdded ? (
                                  <Button
                                    color="error"
                                    onClick={() => {
                                      removeExercise(result.name);
                                    }}
                                  >
                                    Remove from workout
                                  </Button>
                                ) : (
                                  <Button
                                    color="primary"
                                    disabled={isAdded}
                                    onClick={() => {
                                      setResult(result);
                                      setAddModal(true);
                                    }}
                                  >
                                    Add to workout
                                  </Button>
                                )}
                              </CardActions>
                            </CardActionArea>
                          </Card>
                        </Badge>
                      </Grid>
                    );
                  })}
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
            width: 350,
            maxHeight: "80vh",
            overflowY: "auto",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" gutterBottom>
            {result?.name}
          </Typography>
          {result?.instructions && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                Instructions
              </AccordionSummary>
              <AccordionDetails>{result.instructions}</AccordionDetails>
            </Accordion>
          )}
          {result?.type === "cardio" ? (
            <>
              <Typography variant="subtitle1">Distance</Typography>
              <OutlinedInput
                endAdornment={
                  <InputAdornment position="end">km</InputAdornment>
                }
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                  setDistance(parseFloat(evt.target.value))
                }
                type="number"
              />
              <Typography variant="subtitle1">Time</Typography>
              <OutlinedInput
                endAdornment={
                  <InputAdornment position="end">minutes</InputAdornment>
                }
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                  setTime(parseFloat(evt.target.value))
                }
                type="number"
              />
            </>
          ) : (
            <>
              <Typography variant="subtitle1">Sets</Typography>
              <Slider
                value={sets}
                onChange={setSets}
                step={1}
                marks
                min={1}
                max={8}
                valueLabelDisplay="on"
              />
              <Typography variant="subtitle1">Reps</Typography>
              <Slider
                value={reps}
                onChange={setReps}
                step={1}
                marks
                min={1}
                max={20}
                valueLabelDisplay="on"
              />
              <Typography variant="subtitle1">Weight</Typography>
              <OutlinedInput
                endAdornment={
                  <InputAdornment position="end">kg</InputAdornment>
                }
                type="number"
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                  setWeight(parseFloat(evt.target.value))
                }
              />
            </>
          )}

          <Button
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
