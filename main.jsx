import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./src/components/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Recents from "./src/components/Recents.jsx";
import NewReceipe from "./src/components/NewReceipe.jsx";
import ViewReceipe from "./src/components/ViewReceipe.jsx";
import { ReceipeContextProvider } from "./src/context/ReceipeContext.jsx";
import ReceipeCards from "./src/components/ReceipeCards";
import { PrimeReactProvider } from "primereact/api";
import FavorateReceipes from "./src/components/FavorateReceipes.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <Home />,
  },
  {
    path: "/recent-recipies",
    element: <Recents />,
  },
  {
    path: "/favoraties-recipies",
    element: <FavorateReceipes />,
  },
  {
    path: "/add-recipie",
    element: <NewReceipe />,
  },
  {
    path: "/recipie/:recipie",
    element: <ViewReceipe />,
  },
  {
    path: "/recipies",
    element: <ReceipeCards />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PrimeReactProvider>
      <ReceipeContextProvider>
        <RouterProvider router={routes} />
      </ReceipeContextProvider>
    </PrimeReactProvider>
  </StrictMode>,
);
