import { lazy } from "react";

import "./styles/vsxs.scss";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Prisoners = lazy(() => import("./pages/Prisoners"));
const Employees = lazy(() => import("./pages/Employees"));
const Camera = lazy(() => import("./pages/Camera"));
const Visitors = lazy(() => import("./pages/Visitors"));
const PrisonerDetail = lazy(() => import("./sub-pages/Prisoner/Prisoner-detail"))
const PrisonerForms = lazy(() => import("./sub-pages/Prisoner/PrisonerForms"))
const PrisonerMadicalForms = lazy(() => import("./sub-pages/Prisoner/PrisonerMadicalForms"))
const VisitorsForms = lazy(() => import("./sub-pages/Visitors/VisitorsForms"))
const EmployessForms = lazy(() => import("./sub-pages/Employees/EmployeesForms"))
export const VSXRoutes = [
  {
    id:1,
    path: "/:region/dashboard",
    // element: <Income />,
    element: <Dashboard />,
    roles: new Set(["Superadmin"])
  },
  {
    id:2,
    path: "/:region/prisoner",
    // element: <Debtors />,
    element: <Prisoners />,
    roles: new Set(["Superadmin"])
  },
  {
    id:3,
   path: '/:region/prisoner/detail/:id',
   element: <PrisonerDetail/>,
    roles: new Set(["Superadmin"])
},
  {
    id:4,
    path: '/:region/prisoner/:id',
    element: <PrisonerForms/>,
    roles: new Set(["Superadmin"])
  },
  {
    id:28,
    path: '/:region/prisoner/medical/:pr_id/:id',
    element: <PrisonerMadicalForms/>,
    roles: new Set(["Superadmin"])
  },

  {
    id:5,
    path: "/:region/employees",
    // element: <Outgo />,
    element: <Employees/>,
    roles: new Set(["Superadmin"])
  },
  {
    id:6,
    path: "/:region/employees/:id",
    // element: <Outgo />,
    element: <EmployessForms/>,
    roles: new Set(["Superadmin"])
  },
  {
    id:7,
    path: "/:region/visitors",
    // element: <CashboxOrderSingle />,
    element: <Visitors/>,
    roles: new Set(["Superadmin"])
  },
  {
    id:8,
    path: "/:region/visitors/form/:id",
    // element: <CashboxOrderSingle />,
    element: <VisitorsForms/>,
    roles: new Set(["Superadmin"])
  },
  {
    id:9,
    path: "/:region/cameras",
    // element: <CashboxOrders />,
    element: <Camera/>,
    roles: new Set(["Superadmin"])
  },
  {
    id:10,
    path: "/:region/store",
    // element: <CashboxOrderSingle />,
    element: <>Sklad toshkent</>,
    roles: new Set(["Superadmin"])
  },
  {
    id:11,
    path: "/:region/archive",
    // element: <CashboxOrderSingle />,
    element: <>Arxiv toshkent</>,
    roles: new Set(["Superadmin"])
  },
  {
    id:12,
    path: "/:region/vsx",
    // element: <CashboxStatistics />,
    element: <>Bu yerda vsxlar ro'yxati bo'ladi</>,
    roles: new Set(["Superadmin"])
  },
  {
    id:13,
    path: "/:region/vsx/:id",
    // element: <CashboxStatistics />,
    element: <>Bu yerda har bir vsx dagi rameralar bo'ladi.</>,
    roles: new Set(["Superadmin"])
  },
  {
    id:14,
    path: "/:region/freedom",
    // element: <CashboxOrderSingle />,
    element: <>Ozodlikka chiqarilganlar toshkent</>,
    roles: new Set(["Superadmin"])
  },
  {
    id:15,
    path: "/:region/settings",
    // element: <CashboxOrderSingle />,
    element: <>Sozlamalar</>,
    roles: new Set(["Superadmin"])
  },

];
