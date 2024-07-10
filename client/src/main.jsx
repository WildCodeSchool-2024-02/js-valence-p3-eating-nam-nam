import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Inscription from "./pages/Inscription";
import ListeRecettes from "./components/ListeRecettes";
import ConsulterRecette from "./components/ConsulterRecette";
import Login from "./pages/Login";
import Accueil from "./pages/Accueil";
import Profile from "./pages/Profile";
import RecettesFavorites from "./components/RecettesFavorites";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/inscription",
        element: <Inscription />,
      },
      {
        path: "/",
        element: <Accueil />,
      },

      {
        path: "/recettes",
        element: <ListeRecettes />,
      },
      { path: "/connexion", element: <Login /> },
      {
        path: "/recettes/:id",
        element: <ConsulterRecette />,
      },
      {
        path: "/Profile",
        element: <Profile />,
      },
      {
        path: "/RecttesFavorites",
        element: <RecettesFavorites />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
