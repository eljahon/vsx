import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { Language } from "./components/Language";
import { useTranslation } from "react-i18next";

export const AuthLayout = () => {
  const {t} = useTranslation();
  return (
    <div className="auth">
      <div className="auth__header d-flex justify-content-between align-items-center">
        <Link className="auth__logo" to={"/"}>
          <img src={logo} alt="logo" />
          <p>{t('vsx-title')}</p>
        </Link>
        <Language />
      </div>

      <div className="auth__content">
        <Outlet />
      </div>
    </div>
  );
};
