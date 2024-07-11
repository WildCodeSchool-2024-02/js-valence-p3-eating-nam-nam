import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Inscription from "./pages/Inscription";
import ListeRecettes from "./components/ListeRecettes";
import ConsulterRecette from "./components/ConsulterRecette";
import App from "./App";
import Login from "./pages/Login";
import Accueil from "./pages/Accueil";
import Profile from "./pages/Profile";
import RecettesFavorites from "./components/RecettesFavorites";
import RecettesAjoutees from "./components/RecettesAjoutees";

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
        path: "/RecettesFavorites",
        element: <RecettesFavorites />,
      },
      {
        path: "/RecettesAjoutees",
        element: <RecettesAjoutees />,
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
