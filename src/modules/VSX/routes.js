import { lazy } from "react";

import "./styles/vsxs.scss";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const VSXList = lazy(() => import("./pages/VSXLIst"));
const VSXFomrs = lazy(() => import("./sub-pages/VsxList/VSXForms"));
const Employees = lazy(() => import("./pages/Employees"));
const EmployeesDetail = lazy(() => import("./sub-pages/Employees/Employees-detail"))
const EmployessForms = lazy(() => import("./sub-pages/Employees/EmployeesForms"))
const Camera = lazy(() => import("./pages/Camera"));
const CheckList = lazy(() => import("./pages/CheckList"));
const Sanitaion = lazy(() => import("./pages/Sanitaion"));
const Inspection = lazy(() => import("./pages/Inspection"));
const Reports = lazy(() => import("./pages/Reports"));
const CameraReverese = lazy(() => import("./pages/Camera-insede-reverese"));
const ItemCamera = lazy(() => import("./sub-pages/Camera/ItemCamera"));
const Prisoners = lazy(() => import("./pages/Prisoners"));
const PrisonerDetail = lazy(() => import("./sub-pages/Prisoner/Prisoner-detail"))
const PrisonerForms = lazy(() => import("./sub-pages/Prisoner/PrisonerForms"))
const PrisonerMadicalForms = lazy(() => import("./sub-pages/Prisoner/PrisonerMadicalForms"))
const Visitors = lazy(() => import("./pages/Visitors"));
const VisotorProduct = lazy(() => import("./pages/VisitorProduct"));
const VisitorsForms = lazy(() => import("./sub-pages/Visitors/VisitorsForms"))
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
    roles: new Set([])
  },
  {
    id:24435,
    path: "/:region/prisoner-insede",
    // element: <Debtors />,
    element: <CameraReverese />,
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
    path: '/:region/prisoner-add',
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
    id:67,
    path: "/:region/inspection",
    // element: <Outgo />,
    element: <><CheckList/></>,
    roles: new Set(["Superadmin"])
  },    {
    id:69,
    path: "/:region/reports",
    // element: <Outgo />,
    element: <><Reports/></>,
    roles: new Set(["Superadmin"])
  },
  {
    id:87,
    path: "/:region/sanitation",
    // element: <Outgo />,
    element: <><Sanitaion/></>,
    roles: new Set(["Superadmin"])
  },  {
    id:5,
    path: "/:region/employees",
    // element: <Outgo />,
    element: <Employees/>,
    roles: new Set(['Superadmin', 'RegionalManager', 'VsxManager'])
  },
  {
    id:6,
    path: "/:region/employees/:id",
    // element: <Outgo />,
    element: <EmployessForms/>,
    roles: new Set(['Superadmin', 'RegionalManager', 'VsxManager'])
  },
  {
    id:31,
    path: '/:region/employees/detail/:id',
    element: <EmployeesDetail/>,
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
    id:22,
    path: "/:region/product",
    // element: <CashboxOrderSingle />,
    element: <VisotorProduct/>,
    roles: new Set(["Superadmin"])
  },
  {
    id:9,
    path: "/:region/cameras",
    // element: <CashboxOrders />,
    element: <Camera/>,
    roles: new Set(["Superadmin", 'VsxManager'])
  },  {
    id:24,
    path: "/:region/cameras/:id/:name",
    // element: <CashboxOrders />,
    element: <ItemCamera/>,
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
    element: <><VSXList/></>,
    roles: new Set(["Superadmin"])
  },
  {
    id:13,
    path: "/:region/vsx/:id",
    // element: <CashboxStatistics />,
    element:<VSXFomrs/>,
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
