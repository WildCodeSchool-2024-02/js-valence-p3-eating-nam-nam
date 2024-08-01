import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Inscription, { action as registerAction } from "./pages/Inscription";
import ListeRecettes from "./pages/ListeRecettes";
import ConsulterRecette from "./pages/ConsulterRecette";
import App from "./App";
import Login, { action as loginAction } from "./pages/Login";
import Accueil from "./pages/Accueil";
import Profile from "./pages/Profile";
import RecettesFavorites from "./pages/RecettesFavorites";
import NutriAutoComplete from "./components/NutriAutoComplete";
import RecettesAjoutees from "./pages/RecettesAjoutees";
import AjouterRecette, {
  action as ajouterRecetteAction,
} from "./pages/AjouterRecette";
import fetchUserById from "./api/fetch";
import Admin from "./components/Admin";
import GestionRecettes, {
  loader as gestionRecettesLoader,
} from "./pages/admin/GestionRecettes";
import GestionUtilisateur, {
  loader as gestionUsersLoader,
} from "./pages/admin/GestionUtilisateur";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/inscription",
        element: <Inscription />,
        action: registerAction,
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
      { path: "/dernieres-recettes", element: <RecettesAjoutees /> },
      {
        path: "/RecettesAjoutees",
        element: <AjouterRecette />,
        action: ajouterRecetteAction,
      },
      {
        path: "/admin",
        element: <Admin />,
        children: [
          {
            index: true,
            element: <GestionRecettes />,
            loader: gestionRecettesLoader,
          },
          {
            path: "GestionUtilisateurs",
            element: <GestionUtilisateur />,
            loader: gestionUsersLoader,
          },
        ],
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
