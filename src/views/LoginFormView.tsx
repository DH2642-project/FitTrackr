import { Box, CircularProgress, Typography } from "@mui/material";
import "firebaseui/dist/firebaseui.css";
import { useEffect} from "react";
import { useTheme } from "@mui/material/styles";

export default function LoginFormView(
  {
    uiConfig, 
    ui
  }: {
    uiConfig: firebaseui.auth.Config, 
    ui: firebaseui.auth.AuthUI
  }) {
  const theme = useTheme();

  useEffect(() => {
    ui.start("#firebaseui-auth-container", uiConfig);
  }, [ui, uiConfig]);

  return (
    <Box>
      <Typography variant="h5" textAlign="center">
        Welcome to <span style={{ color: theme.palette.primary.main }}>FitTrackr</span>!
      </Typography>
      <Typography variant="body2" textAlign="center">
        Please sign in to continue
      </Typography>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">
        <CircularProgress />
      </div>
    </Box>
  );
}