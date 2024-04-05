import { Avatar, CircularProgress } from "@mui/material";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { AccountCircle } from "@mui/icons-material";

export function ProfileAvatar() {
  const [user, loading] = useAuthState(auth);

  return loading ? (
    <CircularProgress sx={{ color: "primary.contrastText" }} />
  ) : user?.photoURL ? (
    <Avatar src={user.photoURL} />
  ) : (
    <AccountCircle />
  );
}
