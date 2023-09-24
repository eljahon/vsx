import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { AppLink, Avatar, Button, Typography } from "components";
import { SubMenu } from "./SubMenu";

import { SidbarMenu } from "../helpers/menu";
import { formatters } from "services/utils";

import userAva from "../../assets/images/user.png";
import { ReactComponent as ArrowLeft } from "assets/icons/arrow.svg";
import { ReactComponent as ArrowRight } from "assets/icons/arrow-right.svg";

export const Sidebar = ({ setMini, mini }) => {
  const getWidth = () => {
    if (window.innerWidth < 992) {
      setMini(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", getWidth);
    return () => window.removeEventListener("resize", getWidth);
  }, []);

  const { pathname } = useLocation();
  const menuKey = pathname.split("/")[1];
  const roleName = localStorage.getItem("roleName");
  return (
    <aside className={`sidebar scroll-style ${mini ? "sidebar__mini" : ""} `}>
      <Button
        className="sidebar__btn"
        type="button"
        design="circled"
        prepend={mini ? <ArrowRight /> : <ArrowLeft />}
        onClick={() => setMini(!mini)}
      />
      <div className="sidebar__admin d-flex align-items-center">
        <Avatar size="md" borderColor="white" className="mr_10" src={userAva} />
        <div className="sidebar__admin-info">
          <Typography Type="p" className="sidebar__role" text={"Инспектор"} />
          <Typography
            Type="h5"
            className="sidebar__admin-name"
            text={"Маърупов Олимжон"}
          />
          <Typography
            Type="p"
            className="sidebar__admin-pnfl "
            text={"ПИНФЛ: 131231242312542341234"}
          />
        </div>
      </div>

      {SidbarMenu("tashkent")?.map((menu, index) =>
        menu.submenu ? (
          <SubMenu key={menu.id} menu={menu} />
        ) : (
          menu?.roles.has(roleName) && (
            <AppLink
              key={menu.id}
              className="sidebar__link"
              link={menu.link}
              prepend={menu.icon}
              text={menu.label}
              activeClass="sidebar__link_active"
            />
          )
        )
      )}
    </aside>
  );
};
