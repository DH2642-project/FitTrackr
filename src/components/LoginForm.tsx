import { Box, CircularProgress, Typography } from "@mui/material";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { useEffect } from "react";
import { firebaseConfig } from "../main";
import { useTheme } from "@mui/material/styles";

firebase.initializeApp(firebaseConfig);
// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());
const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function () {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function () {
      // The widget is rendered, hide the loader.
      const loader = document.getElementById("loader");
      if (loader) loader.style.display = "none";
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  // signInSuccessUrl: "/profile/",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    // firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  // tosUrl: "<your-tos-url>",
  // Privacy policy url.
  // privacyPolicyUrl: "<your-privacy-policy-url>",
};

export default function LoginForm() {
  const theme = useTheme();

  useEffect(() => {
    // The start method will wait until the DOM is loaded.
    ui.start("#firebaseui-auth-container", uiConfig);
  }, []);

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
