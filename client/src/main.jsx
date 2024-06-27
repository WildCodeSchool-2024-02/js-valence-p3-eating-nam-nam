import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RecettesFavorites from "./components/RecettesFavorites";
import ConsulterRecettesGenerales from "./components/ConsulterRecettesGenerales";

import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/recettes",
        element: <ConsulterRecettesGenerales />,
      },
      {
        path: "/favoris",
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
