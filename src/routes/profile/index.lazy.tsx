import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { AlertColor } from "@mui/material";
import { ProfileView } from "../../views/Profile/ProfileView";
import { auth } from "../../firebase";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchProfile, saveChanges, setAge, setGender, setHeight, setWeight } from "../../Model/profile/profileSlice";
import { UserProfile } from "../../main";
import * as firebaseui from "firebaseui";
import firebase from "firebase/compat/app";

export const Route = createLazyFileRoute("/profile/")({
  component: ProfilePresenter,
});

export function ProfilePresenter() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("info");
  const [user = null] = useAuthState(auth);
  const [signOut, signOutLoading] = useSignOut(auth);
  const profileState = useSelector((state: RootState) => state.profile);

  // const [snapshot] = useObject(ref(database, "users/" + user?.uid + "/profile"));
  // const userProfile: UserProfile = snapshot?.val();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Fetch profile from database
    dispatch(fetchProfile());
  }, [dispatch]);

  const ui = useMemo(() => firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth()), []);
  const uiConfig = useMemo(
    () => ({
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
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.EmailAuthProvider.PROVIDER_ID],
    }),
    []
  );

  function showSnackbar(message: string, severity: AlertColor = "info") {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    setSnackbarSeverity(severity);
  }

  async function handleSignOut() {
    const success = await signOut();
    if (!success) {
      showSnackbar("An error occurred while signing out.", "error");
    }
  }

  function handleSetGender(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setGender(event.target.value));
  }

  function handleSetWeight(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setWeight(Number(event.target.value)));
  }

  function handleSetHeight(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setHeight(Number(event.target.value)));
  }

  function handleSetAge(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setAge(Number(event.target.value)));
  }

  async function handleSaveChanges() {
    try {
      await dispatch(saveChanges(profileState.userProfile as UserProfile));
      showSnackbar("Changes saved.", "success");
    } catch (error) {
      showSnackbar("An error occurred while saving changes. Please try again later.", "error");
    }
  }

  return (
    <ProfileView
      ui={ui}
      uiConfig={uiConfig}
      user={user}
      userProfile={profileState.userProfile || null}
      userProfileLoading={profileState.status === "loading"}
      handleSignOut={handleSignOut}
      handleSetGender={handleSetGender}
      handleSetWeight={handleSetWeight}
      handleSetHeight={handleSetHeight}
      handleSetAge={handleSetAge}
      handleSaveChanges={handleSaveChanges}
      showSnackbar={showSnackbar}
      snackbarOpen={snackbarOpen}
      snackbarMessage={snackbarMessage}
      snackbarSeverity={snackbarSeverity}
      setSnackbarOpen={setSnackbarOpen}
      signOutLoading={signOutLoading}
    />
  );
}
