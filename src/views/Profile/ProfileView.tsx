import firebase from "firebase/compat/app";
import { useMemo } from "react";
import * as firebaseui from "firebaseui";
import Cover from "../Application/Cover";
import LoginFormView from "./LoginFormView";
import LoggedInView from "./LoggedInView";
import CustomSnackbar from "../Application/CustomSnackbar";
import { User } from "firebase/auth";
import { AlertColor } from "@mui/material";
import { UserProfile } from "../../main";

export function ProfileView({
  user,
  signOutLoading,
  userProfile,
  userProfileLoading,
  handleSignOut,
  handleSetGender,
  handleSetWeight,
  handleSetHeight,
  handleSetAge,
  handleSaveChanges,
  snackbarOpen,
  snackbarMessage,
  snackbarSeverity,
  setSnackbarOpen,
}: {
  user: User | null;
  signOutLoading: boolean;
  userProfile: UserProfile | null;
  userProfileLoading: boolean;
  handleSignOut: () => void;
  handleSetGender: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSetWeight: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSetHeight: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSetAge: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveChanges: () => void;
  showSnackbar: (message: string, severity: AlertColor) => void;
  snackbarOpen: boolean;
  snackbarMessage: string;
  snackbarSeverity: AlertColor;
  setSnackbarOpen: (open: boolean) => void;
}) {
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

  return (
    <Cover>
      {user ? (
        <LoggedInView
          user={user as firebase.User}
          userProfileLoading={userProfileLoading}
          signOut={handleSignOut}
          signOutLoading={signOutLoading}
          userProfile={userProfile}
          setGender={handleSetGender}
          setWeight={handleSetWeight}
          setHeight={handleSetHeight}
          setAge={handleSetAge}
          saveChanges={handleSaveChanges}
        />
      ) : (
        <LoginFormView ui={ui} uiConfig={uiConfig} />
      )}
      <CustomSnackbar
        snackbarOpen={snackbarOpen}
        snackbarMessage={snackbarMessage}
        snackbarSeverity={snackbarSeverity}
        setSnackbarOpen={setSnackbarOpen}
      />
    </Cover>
  );
}
