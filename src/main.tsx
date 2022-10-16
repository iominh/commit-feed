import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import IndexPage from "@/pages/IndexPage/IndexPage";
import CommitsPage from "@/pages/CommitsPage/CommitsPage";
import "@fontsource/roboto";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:user/:repo",
    element:  <CommitsPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
