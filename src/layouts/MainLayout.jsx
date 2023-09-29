import React, {useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";

import { Header, Sidebar } from "./components";

export const MainLayout = () => {
  const [mini, setMini] = useState(false);
  const navigate = useNavigate()
    const checkList = (roleName, id) => {
        console.log(roleName, id)
        switch (roleName) {
            case 'Superadmin': return navigate(`/${id}/dashboard`)
            case 'VsxManager': return navigate(`/${id}/dashboard`)
            case 'VsxInspector': return navigate(`/${id}/cameras`)
            case 'RegionalManager': return navigate(`/${id}/dashboard`)
            case 'SuperDuperAdmin': return navigate(`/${id}/dashboard`)
            // default: return navigate(`/${id}/dashboard`)
        }
    }
    const rolename =localStorage.getItem('roleName')
useEffect(() => {
    checkList(rolename)
}, [])
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
