import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Counter from "../components/Counter";
import MainContent from "../components/MainContent";
import ProtectedRoute from "../components/ProtectedRoute";
import { UserRole } from "../const";
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
				element: (
					<MainContent>
						<Counter />
						<h1>User Table</h1>
					</MainContent>
				),
			},
			{
				path: "department",
				element: (
					<MainContent>
						<Counter />
						<h1>Department Table</h1>
					</MainContent>
				),
			},
			{
				path: "product",
				element: (
					<MainContent>
						<Counter />
						<h1>Product Table</h1>
					</MainContent>
				),
			},
			{
				path: "stadistic",
				element: (
					<MainContent>
						<Counter />
						<h1>Statdistics Grafic</h1>
					</MainContent>
				),
			},
			{
				path: "bill",
				element: (
					<MainContent>
						<Counter />
						<h1>Bill</h1>
					</MainContent>
				),
			},
			{
				path: "destiny",
				element: (
					<MainContent>
						<Counter />
						<h1>Destinies Table</h1>
					</MainContent>
				),
			},
			{
				path: "request",
				element: (
					<MainContent>
						<Counter />
						<h1>Request Table</h1>
					</MainContent>
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
				element: (
					<MainContent>
						<Counter />
						<h1>Request Table</h1>
					</MainContent>
				),
			},
			{
				path: "product",
				element: (
					<MainContent>
						<Counter />
						<h1>Product Table</h1>
					</MainContent>
				),
			},
		],
	},
]);
