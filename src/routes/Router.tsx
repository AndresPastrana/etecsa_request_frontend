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
import { FormCreateRequetst } from "../components/Request/FormCreateRequetst";
import { ListRequest } from "../components/Request/ListRequest";
import RequestSpecialist from "../components/Request/RequestSpecialist";
import Graphic from "../components/Stadistics/Grapich";
import Bills from "../components/Bills/Bills";
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
        element: (
          <>
            <h1>Stadistics</h1>
            <Graphic />
          </>
        ),
      },
      {
        path: "bill",
        element: (
          <>
            <h1>Bills</h1>
            <Bills />
          </>
        ),
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
            <RequestSpecialist />
          </>
        ),
      },
    ],
  },
  {
    path: "worker",
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

        children: [
          {
            path: "new",
            element: <FormCreateRequetst />,
          },
          {
            path: "list",
            element: (
              <div className="basis-full">
                <ListRequest />
              </div>
            ),
          },
        ],
      },
      {
        path: "product",
        element: <ProductPanel />,
      },
    ],
  },
]);
