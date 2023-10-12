import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
const AdminPage = lazy(() => import("../pages/Admin"));
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
		path: "/admin",
		element: (
			<Suspense>
				<AdminPage />
			</Suspense>
		),
	},
	{
		path: "/specialist",
		element: (
			<Suspense>
				<SpecialistPage />
			</Suspense>
		),
	},
]);
