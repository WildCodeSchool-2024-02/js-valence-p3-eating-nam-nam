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
import { fetchUserById } from "./api/fetch";
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
        path: "/dernieres-recettes",
        element: <RecettesAjoutees />,
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
