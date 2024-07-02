import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Inscription from "./pages/Inscription";
import RecettesFavorites from "./components/RecettesFavorites";
import ListeRecettes from "./components/ListeRecettes";
import ConsulterRecette from "./components/ConsulterRecette";
import App from "./App";
import Login from "./pages/Login";
import Accueil from "./pages/Accueil";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/inscription",
        element: <Inscription />,
        path: "/",
        element: <Accueil />,
      },
      {
        path: "/recettes",
        element: <ListeRecettes />,
      },
      {
        path: "/favoris",
        element: <RecettesFavorites />,
      },

      { path: "/connexion",
        element: <Login />
      },
      {
        path: "/recettes/:id",
        element: <ConsulterRecette />,
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
