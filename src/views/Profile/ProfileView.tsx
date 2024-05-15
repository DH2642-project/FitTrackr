import Cover from "../Application/Cover";
import LoginFormView from "./LoginFormView";
import LoggedInView from "./LoggedInView";
import CustomSnackbar from "../Application/CustomSnackbar";
import { User } from "firebase/auth";
import { AlertColor } from "@mui/material";
import { UserProfile } from "../../main";
import * as firebaseui from "firebaseui";
import firebase from "firebase/compat/app";

export function ProfileView({
  ui,
  uiConfig,
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
  ui: firebaseui.auth.AuthUI;
  uiConfig: firebaseui.auth.Config;
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
