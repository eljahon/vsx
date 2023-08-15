import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import { Header, Sidebar } from "./components";

export const MainLayout = () => {
  const [mini, setMini] = useState(false);

  return (
    <>
      <Header
        hasSearch={true}
        hasDatePicker={true}
        hasNotification={true}
        hasProfile={true}
        hasLogo={true}
        containerClass="max-width_full w_full px_0"
      />
      <div className={mini ? "page pl_120" : "page pl_350"}>
        <Sidebar setMini={setMini} mini={mini} />
        <main className="main scroll-style">
          <Outlet />
        </main>
      </div>
    </>
  );
};
