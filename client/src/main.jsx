import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Inscription from "./pages/Inscription";
import ListeRecettes from "./components/ListeRecettes";
import ConsulterRecette from "./components/ConsulterRecette";
import App from "./App";
import Login, { action as loginAction } from "./pages/Login";
import Accueil from "./pages/Accueil";
import Profile from "./pages/Profile";
import RecettesFavorites from "./components/RecettesFavorites";
import NutriAutoComplete from "./components/NutriAutoComplete";
import RecettesAjoutees from "./components/RecettesAjoutees";
import fetchUserById from "./api/fetchUser";

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

      { path: "/connexion", element: <Login />, action: loginAction },
      {
        path: "/recettes/:id",
        element: <ConsulterRecette />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
        loader: ({ params }) => fetchUserById(params.id),
      },
      {
        path: "/RecettesFavorites",
        element: <RecettesFavorites />,
      },
      {
        path: "/NutriAutoComplete",
        element: <NutriAutoComplete />,
      },
      {
        path: "/dernieres-recettes",
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
