import { Box, CircularProgress, Typography } from "@mui/material";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { useEffect, useMemo } from "react";
import { useTheme } from "@mui/material/styles";

export default function LoginFormView() {
  const theme = useTheme();

  const ui = useMemo(() => firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth()), []);
  const uiConfig = useMemo(() => ({
    callbacks: {
      signInSuccessWithAuthResult: function () {
        return true;
      },
      uiShown: function () {
        const loader = document.getElementById("loader");
        if (loader) loader.style.display = "none";
      },
    },
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  }), []);

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