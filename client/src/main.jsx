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
import NutriAutoComplete from "./components/NutriAutoComplete";
import RecettesAjoutees from "./components/RecettesAjoutees";
import AjouterRecette, {
  action as ajouterRecetteAction,
} from "./components/AjouterRecette";
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
      {
        path: "/NutriAutoComplete",
        element: <NutriAutoComplete />,
      },

      { path: "/dernieres-recettes", element: <RecettesAjoutees /> },
      {
        path: "/RecettesAjoutees",
        element: <AjouterRecette />,
        action: ajouterRecetteAction,
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
