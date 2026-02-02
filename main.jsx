import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./index.css";

import Home from "./src/components/Home.jsx";
import ErrorBoundary from "./src/components/ErrorBoundary.jsx";
import NotFound from "./src/components/NotFound.jsx";

import { ReceipeContextProvider } from "./src/context/ReceipeContext.jsx";
import { PrimeReactProvider } from "primereact/api";

/* =====================================================
   LAZY LOADED COMPONENTS
===================================================== */
const Recents = lazy(() => import("./src/components/Recents.jsx"));
const NewReceipe = lazy(() => import("./src/components/NewReceipe.jsx"));
const ViewReceipe = lazy(() => import("./src/components/ViewReceipe.jsx"));
const ReceipeCards = lazy(() => import("./src/components/ReceipeCards.jsx"));
const FavorateReceipes = lazy(
  () => import("./src/components/FavorateReceipes.jsx"),
);

/* =====================================================
   LOADING FALLBACK
===================================================== */
const LoadingFallback = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      fontSize: "18px",
    }}
  >
    Loading...
  </div>
);

/* =====================================================
   APP LAYOUT (IMPORTANT)
===================================================== */
function AppLayout() {
  return (
    <PrimeReactProvider>
      <ReceipeContextProvider>
        <Outlet />
      </ReceipeContextProvider>
    </PrimeReactProvider>
  );
}

/* =====================================================
   ROUTER
===================================================== */
const base = import.meta.env.BASE_URL || "/";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "recent-recipies",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <Recents />
            </Suspense>
          ),
        },
        {
          path: "favoraties-recipies",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <FavorateReceipes />
            </Suspense>
          ),
        },
        {
          path: "add-recipie",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <NewReceipe />
            </Suspense>
          ),
        },
        {
          path: "recipie/:recipie",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <ViewReceipe />
            </Suspense>
          ),
        },
        {
          path: "recipies",
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
    },
  ],
  { basename: base },
);

/* =====================================================
   RENDER
===================================================== */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
);
