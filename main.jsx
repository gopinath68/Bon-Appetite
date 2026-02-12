import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./index.css";

// Eager-load shared layout components
import ErrorBoundary from "./src/components/ErrorBoundary.jsx";
import NotFound from "./src/components/NotFound.jsx";
import { ReceipeContextProvider } from "./src/context/ReceipeContext.jsx";
import { PrimeReactProvider } from "primereact/api";

// Lazy-load route components for code splitting
const Home = lazy(() => import("./src/components/Home.jsx"));
const Recents = lazy(() => import("./src/components/Recents.jsx"));
const ViewReceipe = lazy(() => import("./src/components/ViewReceipe.jsx"));
const ReceipeCards = lazy(() => import("./src/components/ReceipeCards.jsx"));
const FavorateReceipes = lazy(() => import("./src/components/FavorateReceipes.jsx"));
const NewReceipe = lazy(() => import("./src/components/NewReceipe.jsx"));

/* =====================================================
   APP LAYOUT
===================================================== */
function AppLayout() {
  return (
    <PrimeReactProvider>
      <ReceipeContextProvider>
        <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'60vh',fontSize:'1.2rem',color:'#888'}}>Loading…</div>}>
          <Outlet />
        </Suspense>
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
        { index: true, element: <Home /> },
        { path: "recent-recipies", element: <Recents /> },
        { path: "favoraties-recipies", element: <FavorateReceipes /> },
        { path: "add-recipie", element: <NewReceipe /> },
        { path: "recipie/:recipie", element: <ViewReceipe /> },
        { path: "recipies", element: <ReceipeCards /> },
        { path: "*", element: <NotFound /> },
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
