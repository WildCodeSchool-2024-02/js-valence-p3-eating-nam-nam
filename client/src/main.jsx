import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RecettesFavorites from "./components/RecettesFavorites";
import ListeRecettes from "./components/ListeRecettes";
import ConsulterRecette from "./components/ConsulterRecette";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/recettes",
        element: <ListeRecettes />,
      },
      {
        path: "/favoris",
        element: <RecettesFavorites />,
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
