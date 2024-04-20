import { CheckCircle } from "@mui/icons-material";
import {
  Badge,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { toFriendlyString } from "../../helpers";
import { Exercise } from "../../features/workouts/workoutsSlice";

export function SearchResultCard({
  result,
  isAdded,
  setResult,
  setAddModal,
  removeExercise,
}: {
  result: Exercise;
  isAdded: boolean;
  setResult: (value: React.SetStateAction<Exercise | null>) => void;
  setAddModal: (value: React.SetStateAction<boolean>) => void;
  removeExercise: (name: string) => void;
}) {
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
              <Typography variant="h5" gutterBottom lineHeight={1}>
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
                    label={toFriendlyString(result.difficulty)}
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
}
