import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./src/components/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReceipeContextProvider } from "./src/context/ReceipeContext.jsx";
import { PrimeReactProvider } from "primereact/api";
import ErrorBoundary from "./src/components/ErrorBoundary.jsx";
import NotFound from "./src/components/NotFound.jsx";

// Lazy load heavy/non-critical components
const Recents = lazy(() => import("./src/components/Recents.jsx"));
const NewReceipe = lazy(() => import("./src/components/NewReceipe.jsx"));
const ViewReceipe = lazy(() => import("./src/components/ViewReceipe.jsx"));
const ReceipeCards = lazy(() => import("./src/components/ReceipeCards.jsx"));
const FavorateReceipes = lazy(() => import("./src/components/FavorateReceipes.jsx"));

// Loading fallback component
const LoadingFallback = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", fontSize: "18px" }}>
    Loading...
  </div>
);

const base = import.meta.env.BASE_URL || "/";
const routes = createBrowserRouter(
  [
    {
      path: "/",
      index: true,
      element: <Home />,
    },
    {
      path: "/recent-recipies",
      element: (
        <Suspense fallback={<LoadingFallback />}>
          <Recents />
        </Suspense>
      ),
    },
    {
      path: "/favoraties-recipies",
      element: (
        <Suspense fallback={<LoadingFallback />}>
          <FavorateReceipes />
        </Suspense>
      ),
    },
    {
      path: "/add-recipie",
      element: (
        <Suspense fallback={<LoadingFallback />}>
          <NewReceipe />
        </Suspense>
      ),
    },
    {
      path: "/recipie/:recipie",
      element: (
        <Suspense fallback={<LoadingFallback />}>
          <ViewReceipe />
        </Suspense>
      ),
    },
    {
      path: "/recipies",
      element: (
        <Suspense fallback={<LoadingFallback />}>
          <ReceipeCards />
        </Suspense>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
  {
    basename: base,
  },
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <PrimeReactProvider>
        <ReceipeContextProvider>
          <RouterProvider router={routes} />
        </ReceipeContextProvider>
      </PrimeReactProvider>
    </ErrorBoundary>
  </StrictMode>,
);
