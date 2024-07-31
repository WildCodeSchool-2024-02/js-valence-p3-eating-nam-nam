import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import Inscription, { action as registerAction } from "./pages/Inscription";
import ListeRecettes from "./pages/ListeRecettes";
import ConsulterRecette from "./pages/ConsulterRecette";
import App, { loader as appLoader } from "./App";
import Login, { action as loginAction } from "./pages/Login";
import Accueil from "./pages/Accueil";
import Profile from "./pages/Profile";
import RecettesFavorites from "./pages/RecettesFavorites";
import NutriAutoComplete from "./components/NutriAutoComplete";
import RecettesAjoutees from "./pages/RecettesAjoutees";
import AjouterRecette, {
  action as ajouterRecetteAction,
} from "./pages/AjouterRecette";
import fetchUserById from "./api/fetchUser";
import { checkAuth } from "./api/api";

function protectedRoute(routeConfig) {
  return {
    ...routeConfig,
    loader: async (args) => {
      const isAllowed = await checkAuth();

      if (!isAllowed) {
        return redirect("/connexion");
      }

      if (routeConfig.loader) {
        return routeConfig.loader(args);
      }

      return null; // Explicitly return null if no loader data
    },
  };
}

const router = createBrowserRouter([
  {
    element: <App />,
    loader: appLoader,
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
      protectedRoute({
        path: "/RecettesFavorites",
        element: <RecettesFavorites />,
      }),
      {
        path: "/NutriAutoComplete",
        element: <NutriAutoComplete />,
      },
      { path: "/dernieres-recettes", element: <RecettesAjoutees /> },
      protectedRoute({
        path: "/RecettesAjoutees",
        element: <AjouterRecette />,
        action: ajouterRecetteAction,
      }),
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
