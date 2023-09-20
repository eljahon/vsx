import React from "react";

import {AppLink, Button, ListActions, Typography} from "components";

import Tashkent from "assets/images/tashkent.avif";
import TashkentRegion from "assets/images/toshkentVil.jpeg";
import Bukhara from "assets/images/bukhara.jpeg";
// import Kitchen from "assets/images/menu-kitchen.png";
// import Accounting from "assets/images/menu-accounting.png";
// import Hr from "assets/images/menu-hr.png";
// import Management from "assets/images/menu-management.png";
// import Inventory from "assets/images/menu-inventory.png";
// import Administration from "assets/images/menu-administration.png";
// import Settings from "assets/images/menu-settings.png";
import { useTranslation } from 'react-i18next';
import {useFetchList, useOverlay} from "hooks";
import { AddRegionModal } from "../components/AddRegionModal";

const Menu = () => {
    const {t} = useTranslation()
  const modal = useOverlay({ uniqueName: "addRegion" });
  const menu = [
    {
      img: Tashkent,
      label: "Toshkent shahri",
      link: "/tashkent/dashboard",
    },
    {
      img: TashkentRegion,
      label: "Toshkent viloyati",
      link: "/tashkentRegion/dashboard",
    },
    {
      img: Bukhara,
      label: "Buxoro viloyati",
      link: "/bukhara/dashboard",
    },
  ];
  const regionList  = useFetchList({url:'/regions', urlSearchParams: {}})
  return (
    <>
      <AddRegionModal
        isOpen={modal.isOverlayOpen}
        handleOverlayOpen={modal.handleOverlayOpen}
        handleOverlayClose={modal.handleOverlayClose}
        refetch={regionList.refetch}
      />
      <div className="row g-4">
          <span>{t('home')}</span>
        {regionList?.data?.map((item, index) => (
          <div key={index} className="col-3" >

            <AppLink link={`/${item?.id}/dashboard`}>
              <div className="menu__item menu__item_granted">
                <img className="menu__item-icon" src={Tashkent} alt="" />
                <Typography
                  Type="p"
                  className="fw_600 fz_18 color_txt-primary"
                  text={item?.name
                  }
                />
              </div>
            </AppLink>
              {/*<div><Button>ok</Button></div>*/}
          </div>
        ))}
      </div>
      <ListActions
        addAction={() => modal.handleOverlayOpen()}
        addActionTooltip="Viloyat qo'shish"
      />
    </>
  );
};

export default Menu;
