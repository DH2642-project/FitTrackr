import { Search } from "@mui/icons-material";
import {
  Container,
  Stack,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  IconButton,
  SelectChangeEvent,
} from "@mui/material";
import { toFriendlyString } from "../../helpers";
import { ExerciseType } from "../../Model/workouts/workoutsSlice";

export function SearchBarView({
  selectedType,
  setType,
  types,
  search,
  setName,
  name,
}: {
  selectedType: ExerciseType | "all";
  setType: (event: SelectChangeEvent) => void;
  types: ExerciseType[];
  search: () => void;
  setName: (name: string) => void;
  name: string;
}) {
  return (
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
  );
}
