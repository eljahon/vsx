import React from "react";
import {useParams} from "react-router-dom";
import {
  Camera,
  Download,
  FilePlus,
  Home,
  User,
  UserPlus,
  Users,
  UserX,
  Settings,
  FileText,
} from "react-feather";

import { ReactComponent as IncomeIcon } from "assets/icons/sidebar-income.svg";
import { ReactComponent as OutgoIcon } from "assets/icons/sidebar-outgo.svg";
import { ReactComponent as DebtorsIcon } from "assets/icons/sidebar-debtors.svg";
import { ReactComponent as StatisticsIcon } from "assets/icons/sidebar-statistics.svg";
import { ReactComponent as ProvidersIcon } from "assets/icons/sidebar-providers.svg";
import { ReactComponent as StockIncomeIcon } from "assets/icons/sidebar-stock-income.svg";
import { ReactComponent as OrderIcon } from "assets/icons/sidebar-stock-orders.svg";
import { ReactComponent as FoodMenuIcon } from "assets/icons/food-menu.svg";
import { ReactComponent as FoodIcon } from "assets/icons/food.svg";
import { ReactComponent as InventoryIcon } from "assets/icons/inventory.svg";
import { ReactComponent as WriteOffIcon } from "assets/icons/write-off.svg";
import { ReactComponent as VsxR } from "assets/icons/VsxR.svg";
import {useTranslation} from "react-i18next";

export const SidbarMenu = (name) => {
  const params = useParams();
  const {t} =useTranslation()
  const _menu = {
    tashkent: [
      {
        id: "dashboard",
        link: `/${params.region}/dashboard`,
        label: t('statistics'),
        icon: <Home className="mr_10" />,
        roles: new Set(['Superadmin'])
      },
      {
        id: "prisoners",
        // link: "/tashkent/prisoner",
         link: `/${params.region}/prisoner`,
        label: t('prisoners-list-get'),
        icon: <User className="mr_10" />,
        roles: new Set(['Superadmin'])
      },  {
        id: "prisoners-inside",
        // link: "/tashkent/prisoner",
         link: `/${params.region}/prisoner-insede`,
        label: t('prisoners-insede'),
        icon: <User className="mr_10" />,
        roles: new Set(['Superadmin'])
      },
      {
        id: "employees",
        // link: "/tashkent/employees",
         link: `/${params.region}/employees`,
        label: t('employees-list-get'),
        icon: <UserPlus className="mr_10" />,
        roles: new Set(['Superadmin'])
      },
      {
        id: "visitors",
        // link: "/tashkent/visitors",
         link: `/${params.region}/visitors`,
        label:t('visitors-came-citizen'),
        icon: <Users className="mr_10" />,
        roles: new Set(['Superadmin'])
      },
      {
        id: "vsx",
        // link: "/tashkent/vsx",
        label: t('VSX-list-add'),
         link: `/${params.region}/vsx`,
        icon: <FilePlus className="mr_10" />,
        roles: new Set(['Superadmin'])
      },
      {
        id: "cameras",
        // link: "/tashkent/cameras",?
        label: t('VSX-camera-list-take'),
        icon: <Camera className="mr_10" />,
         link: `/${params.region}/cameras`,
        roles: new Set(['Superadmin'])
      },
      {
        id: "arxive",
        // link: "/tashkent/archive",
         link: `/${params.region}/archive`,
        label: t('VSX-archive'),
        icon: <Download className="mr_10" />,
        roles: new Set(['Superadmin'])
      },
      {
        id: "settings",
        // link: "/tashkent/",
         link: `/${params.region}/settings`,
        label: t('settings'),
        icon: <Settings className="mr_10" />,
        roles: new Set(['Superadmin'])
      },
      {
        id: "freedom",
        // link: "/tashkent/freedom",
         link: `/${params.region}/freedom`,
        // label: "ВСХдан ташқарига чиқарилганлар",
        label: t('VSX-outside'),
        icon: <FileText className="mr_10" />,
        roles: new Set(['Superadmin'])
      },
    ],
  }
  return _menu[name]
};
