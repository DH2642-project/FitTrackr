import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#f4611e",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#efefef",
    },
  },
});

export default theme;
