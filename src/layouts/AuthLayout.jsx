import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { Language } from "./components/Language";

export const AuthLayout = () => {
  return (
    <div className="auth">
      <div className="auth__header d-flex justify-content-between align-items-center">
        <Link className="auth__logo" to={"/"}>
          <img src={logo} alt="logo" />
          <p>Вактинчалик саклаш хибcхоналаринииг назорат-мониторинги</p>
        </Link>
        <Language />
      </div>

      <div className="auth__content">
        <Outlet />
      </div>
    </div>
  );
};
