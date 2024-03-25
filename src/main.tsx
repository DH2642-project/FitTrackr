import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import theme from "./theme";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { routeTree } from "./routeTree.gen"; // Import the generated route tree
import { Provider } from "react-redux";
import { store } from "./store";
import firebase from "firebase/compat/app";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCEoStnp59JE3vmVMc_Y0K8cNw-A7haUSQ",
  authDomain: "dh2642-project-7eb8e.firebaseapp.com",
  databaseURL: "https://dh2642-project-7eb8e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dh2642-project-7eb8e",
  storageBucket: "dh2642-project-7eb8e.appspot.com",
  messagingSenderId: "230765286214",
  appId: "1:230765286214:web:7771f9814dfc7ac78e4b47",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const auth = getAuth(app);

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </StrictMode>
  );
}
