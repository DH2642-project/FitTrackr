import { createLazyFileRoute } from "@tanstack/react-router";
import firebase from "firebase/compat/app";
import Cover from "../../components/Cover";
import LoginForm from "../../components/LoginForm";
import LoggedIn from "../../components/LoggedIn";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../main";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

function Profile() {
  const [loading, setLoading] = useState(true);
  // TODO: user should be in model or store?
  const [user, setUser] = useState<object | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
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

  return <Cover>{user ? <LoggedIn /> : <LoginForm />}</Cover>;
}

export const Route = createLazyFileRoute("/profile/")({
  component: Profile,
});
