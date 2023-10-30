import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import { UserRole } from "../const";
import { UserPanel } from "../components/Users/index";
import { RequestCounterBadge } from "../components/Request/index";
import Test from "../components/Test";
import { Destiny } from "../components/Destiniy/Destiny";
import { DepartmentPanel } from "../components/Departamnet/index";
import { ProductPanel } from "../components/Products/index";
const WorkerPage = lazy(() => import("../pages/Worker"));
const LoginPage = lazy(() => import("../pages/Login"));
const SpecialistPage = lazy(() => import("../pages/Specialist"));
const LandingPage = lazy(() => import("../pages/Landing"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <LandingPage />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/specialist",
    element: (
      <Suspense>
        <ProtectedRoute
          ToRenderComponet={SpecialistPage}
          role={UserRole.SPECIALIST}
          fallbackPath="/"
        />
      </Suspense>
    ),
    children: [
      {
        path: "user",
        element: <UserPanel />,
      },
      {
        path: "department",
        element: <DepartmentPanel />,
      },
      {
        path: "product",
        element: <ProductPanel />,
      },
      {
        path: "stadistic",
        element: <h1>Statdistics Grafic</h1>,
      },
      {
        path: "bill",
        element: <h1>Bill</h1>,
      },
      {
        path: "destiny",
        element: <Destiny />,
      },
      {
        path: "test",
        element: <Test />,
      },
      {
        path: "request",
        element: (
          <>
            <RequestCounterBadge />
            <h1>MM</h1>
            {/* <ListRequest /> */}
          </>
        ),
      },
    ],
  },
  {
    path: "/worker",
    element: (
      <Suspense>
        <ProtectedRoute
          ToRenderComponet={WorkerPage}
          role={UserRole.HEAD_OF_DEPARTMENT}
          fallbackPath="/"
        />
      </Suspense>
    ),
    children: [
      {
        path: "request",
        element: <h1>Request Table</h1>,
      },
      {
        path: "product",
        element: <h1>Product Table</h1>,
      },
    ],
  },
]);
