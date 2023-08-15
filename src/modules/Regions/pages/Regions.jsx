import React from "react";

import { AppLink, ListActions, Typography } from "components";

import Tashkent from "assets/images/tashkent.avif";
import TashkentRegion from "assets/images/toshkentVil.jpeg";
import Bukhara from "assets/images/bukhara.jpeg";
import Kitchen from "assets/images/menu-kitchen.png";
import Accounting from "assets/images/menu-accounting.png";
import Hr from "assets/images/menu-hr.png";
import Management from "assets/images/menu-management.png";
import Inventory from "assets/images/menu-inventory.png";
import Administration from "assets/images/menu-administration.png";
import Settings from "assets/images/menu-settings.png";
import { useParams } from "react-router-dom";

const RegionsMenu = () => {
  const region = useParams();
  // console.log(region);
  const menu = [
    {
      img: Tashkent,
      label: `${region.region} VSX-1`,
      link: `/${region.region}/vsx-1/dashboard`,
    },
    {
      img: Tashkent,
      label: "Toshkent shahri VSX-2",
      link: "/tashkent/vsx-2/dashboard",
    },
    {
      img: Tashkent,
      label: "Toshkent shahri VSX-3",
      link: "/tashkent/vsx-3/dashboard",
    },
    // {
    // 	img: Kitchen,
    // 	label: "Кухня",
    // 	link: "/kitchen/menu",
    // },
    // {
    // 	img: Accounting,
    // 	label: "Бухгалтерия",
    // 	link: "/accounting",
    // },
    // {
    // 	img: Hr,
    // 	label: "HR",
    // 	link: "/hr",
    // },
    // {
    // 	img: Management,
    // 	label: "Управление",
    // 	link: "/management",
    // },
    // {
    // 	img: Inventory,
    // 	label: "Инвентарь",
    // 	link: "/inventory/room",
    // },
    // {
    // 	img: Administration,
    // 	label: "Администрация",
    // 	link: "/administration",
    // },
    // {
    // 	img: Hr,
    // 	label: "Персональный кабинет",
    // 	link: "/profile",
    // },
    // {
    // 	img: Settings,
    // 	label: "Настройки",
    // 	link: "/settings/currency",
    // },
  ];

  return (
    <>
      <div className="row g-4">
        {menu.map((item, index) => (
          <div key={index} className="col-3">
            <AppLink link={item.link}>
              <div className="menu__item menu__item_granted">
                <img className="menu__item-icon" src={item.img} alt="" />

                <Typography
                  Type="p"
                  className="fw_600 fz_18 color_txt-primary"
                  text={item.label}
                />
              </div>
            </AppLink>
          </div>
        ))}
      </div>
      <ListActions addAction={() => {}} addActionTooltip="VSX qo'shish" />
    </>
  );
};

export default RegionsMenu;
