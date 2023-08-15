import { lazy } from "react";

import "./styles/regions.scss";

const RegionsMenu = lazy(() => import("./pages/Regions"));
// const CashboxStatistics = lazy(() => import("./pages/CashboxStatistics"));
// const CashboxOrders = lazy(() => import("./pages/CashboxOrder"));
// const CashboxOrderSingle = lazy(() => import("./pages/CashboxOrderSingle"));

export const RegionsRoutes = [
  {
    path: "/:region",
    // element: <Income />,
    element: <RegionsMenu />,
  },
];
