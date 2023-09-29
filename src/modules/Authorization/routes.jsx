import { lazy } from "react";

import "./styles/Auth.scss";
// const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ConfirmPassword = lazy(() => import("./pages/ConfirmPassword"));
const NewPassword = lazy(() => import("./pages/NewPassword"));

export const AuthRoutes = [
	// {
	// 	path: "/register",
	// 	element: <Register />,
	// },
	{
		path: "/login",
		index:true,
		element: <Login />,
		// roles: new Set(['Superadmin'])
	},
	// {
	// 	path: "/forgot-password",
	// 	element: <ForgotPassword />,
	// 	// roles: new Set(['Superadmin'])
	// },
	// {
	// 	path: "/confirm-password/:phone",
	// 	element: <ConfirmPassword />,
	// 	// roles: new Set(['Superadmin'])
	// },
	// {
	// 	path: "/new-password",
	// 	element: <NewPassword />,
	// 	// roles: new Set(['Superadmin'])
	// },
];
