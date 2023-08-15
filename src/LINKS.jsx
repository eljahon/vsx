import React from "react";
import { AppLink } from "components";

export const Links = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: "40px",
      }}
    >
      {/* <AppLink link="/register" className="mb_40" text="Register" /> */}
      <AppLink link="/login" className="mb_40" text="Login" />
      <AppLink
        link="/forgot-password"
        className="mb_40"
        text="Forgot password"
      />
      <AppLink
        link="/confirm-password"
        className="mb_40"
        text="Send password"
      />
      <AppLink link="/new-password" className="mb_40" text="New password" />
      {/* <AppLink link="/cashbox/income" className="mb_40" text="Cashbox Income" /> */}
    </div>
  );
};
