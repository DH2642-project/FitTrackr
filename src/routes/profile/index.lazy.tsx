import { createLazyFileRoute } from "@tanstack/react-router";
import firebase from "firebase/compat/app";
import Cover from "../../components/Cover";
import LoginForm from "../../components/LoginForm";
import LoggedIn from "../../components/LoggedIn";

function Profile() {
  return <Cover>{firebase.auth().currentUser ? <LoggedIn /> : <LoginForm />}</Cover>;
}

export const Route = createLazyFileRoute("/profile/")({
  component: Profile,
});
