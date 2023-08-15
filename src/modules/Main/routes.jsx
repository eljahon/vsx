import { lazy } from "react";

import "./styles/menu.scss";

const MenuPage = lazy(() => import("./pages/Menu"));

export const MainRoutes = [
  {
    index: true,
    element: <MenuPage />,
    roles: new Set(['Superadmin'])
  },
];
