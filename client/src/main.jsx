import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Inscription from "./pages/Inscription";
import ListeRecettes from "./pages/ListeRecettes";
import ConsulterRecette from "./pages/ConsulterRecette";
import App from "./App";
import Login from "./pages/Login";
import Accueil from "./pages/Accueil";
import Profile from "./pages/Profile";
import RecettesFavorites from "./pages/RecettesFavorites";

import RecettesAjoutees from "./pages/RecettesAjoutees";
import AjouterRecette, {
  action as ajouterRecetteAction,
} from "./pages/AjouterRecette";
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

      { path: "/connexion", element: <Login /> },
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

      { path: "/dernieres-recettes", element: <RecettesAjoutees /> },
      {
        path: "/RecettesAjoutees",
        element: <AjouterRecette />,
        action: ajouterRecetteAction,
      },
      { path: "/dernieres-recettes", element: <RecettesAjoutees /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
