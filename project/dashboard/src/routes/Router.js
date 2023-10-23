import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../component/shared/Loadable";
import DashBoard from "../DashBoard";

const BlankLayout = Loadable(
  lazy(() => import("../component/layouts/BlankLayout"))
);

/* ****Pages***** */
const Home = Loadable(lazy(() => import("../component/Home")));
const Chart = Loadable(lazy(() => import("../component/Chart")));
const AccountList = Loadable(lazy(() => import("../component/AccountList")));
const Patient = Loadable(lazy(() => import("../component/Patient")));
const Donations = Loadable(lazy(() => import("../component/Donations")));
const BloodRequest = Loadable(lazy(() => import("../component/BloodRequest")));
const RequestHistory = Loadable(
  lazy(() => import("../component/RequestHistory"))
);
const BloodStock = Loadable(lazy(() => import("../component/BloodStock")));
const MultiStepForm = Loadable(
  lazy(() => import("../component/MultiStepForm/MultiStepForm"))
);

const Error = Loadable(lazy(() => import("../component/auth/error")));
const Register = Loadable(lazy(() => import("../component/auth/Register")));
const Login = Loadable(lazy(() => import("../component/auth/login")));
const Logout = Loadable(lazy(() => import("../component/auth/Logout")));

const Router = [
  {
    path: "/dashboard",
    element: <DashBoard />,
    children: [
      { path: "", exact: true, element: <Navigate to="home" /> },
      { path: "home", exact: true, element: <Home /> },
      { path: "account", exact: true, element: <AccountList /> },
      { path: "chart", exact: true, element: <Chart /> },
      { path: "patient", exact: true, element: <Patient /> },
      { path: "donations", exact: true, element: <Donations /> },
      { path: "bloodRequest", exact: true, element: <BloodRequest /> },
      { path: "requesthistory", exact: true, element: <RequestHistory /> },
      { path: "bloodStock", exact: true, element: <BloodStock /> },
      { path: "multiStepForm", exact: true, element: <MultiStepForm /> },
      { path: "*", exact: true, element: <Error /> },
    ],
  },
  { path: "/", element: <Navigate to="/auth/login" /> },
  {
    path: "/auth",
    element: <BlankLayout />,
    children: [
      { path: "404", element: <Error /> },
      { path: "/auth/register", element: <Register /> },
      { path: "/auth/login", element: <Login /> },
      { path: "/auth/logOut", element: <Logout /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
