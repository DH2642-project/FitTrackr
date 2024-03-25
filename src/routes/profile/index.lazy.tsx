import { createLazyFileRoute } from "@tanstack/react-router";
import Cover from "../../components/Cover";
import LoginForm from "../../components/LoginForm";
import LoggedIn from "../../components/LoggedIn";
import { auth } from "../../main";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import firebase from "firebase/compat/app";
import { onAuthStateChanged } from "firebase/auth";

function Profile() {
  const [loading, setLoading] = useState(true);
  // TODO: user should be in model or store?
  const [user, setUser] = useState<firebase.User | null>(firebase.auth().currentUser);

  function handleLogout() {
    firebase
      .auth()
      .signOut()
      .catch((error) => {
        // Handle error
        console.error("Error signing out:", error);
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user as firebase.User | null);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Cover>
        <CircularProgress />
      </Cover>
    );
  }

  return <Cover>{user ? <LoggedIn user={user} logout={handleLogout} /> : <LoginForm />}</Cover>;
}

export const Route = createLazyFileRoute("/profile/")({
  component: Profile,
});
