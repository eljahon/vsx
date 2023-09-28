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
    RefreshCw,
    UserCheck,
    BookOpen,
  CheckCircle
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
        roles: new Set(['Superadmin', 'RegionalManager', 'VsxManager', 'VsxInspector', 'SuperDuperAdmin'])
      },
      {
        id: "cameras",
        // link: "/tashkent/cameras",?
        label: t('VSX-camera-list-take'),
        icon: <Camera className="mr_10" />,
        link: `/${params.region}/cameras`,
        roles: new Set(['Superadmin', 'VsxManager', 'VsxInspector', 'SuperDuperAdmin'])
      },
      {
        id: "prisoners",
        // link: "/tashkent/prisoner",
         link: `/${params.region}/prisoner`,
        label: t('prisoners-list-get'),
        icon: <User className="mr_10" />,
        roles: new Set(['Superadmin','VsxManager', 'VsxInspector', 'SuperDuperAdmin'])
      },
      {
        id: "prisoners-add",
        // link: "/tashkent/prisoner",
         link: `/${params.region}/prisoner-add`,
        label: t('prisoners-list-add'),
        icon: <User className="mr_10" />,
        roles: new Set(['VsxManager', 'VsxInspector', 'SuperDuperAdmin'])
      },
      {
        id: "prisoners-inside",
        // link: "/tashkent/prisoner",
         link: `/${params.region}/prisoner-insede`,
        label: t('prisoners-insede'),
        icon: <User className="mr_10" />,
        roles: new Set(['VsxManager', 'VsxInspector','SuperDuperAdmin'])
      },
      {
        id: "visitors",
        // link: "/tashkent/visitors",
        link: `/${params.region}/visitors`,
        label:t('visitors-came-citizen'),
        icon: <Users className="mr_10" />,
        roles: new Set(['RegionalManager', 'VsxManager', 'VsxInspector', 'SuperDuperAdmin'])
      },
      {
        id: "sanitation",
        // link: "/tashkent/cameras",?
        label: t('sanitation'),
        icon: <UserCheck className="mr_10" />,
        link: `/${params.region}/sanitation`,
        roles: new Set(['VsxManager', 'VsxInspector', 'SuperDuperAdmin'])
      },


      {
        id: "product",
        // link: "/tashkent/visitors",
         link: `/${params.region}/product`,
        label:t('person-visitor-product'),
        icon: <RefreshCw className="mr_10" />,
        roles: new Set(['VsxInspector', 'SuperDuperAdmin'])
      },
      {
        id: "vsx",
        // link: "/tashkent/vsx",
        label: t('VSX-list'),
         link: `/${params.region}/vsx`,
        icon: <FilePlus className="mr_10" />,
        roles: new Set(['Superadmin', 'SuperDuperAdmin'])
      },
         {
        id: "inspection",
        // link: "/tashkent/cameras",?
        label: t('inspection'),
        icon: <CheckCircle className="mr_10" />,
         link: `/${params.region}/inspection`,
        roles: new Set(['Superadmin', 'VsxManager', 'VsxInspector', 'SuperDuperAdmin'])
      },
      {
        id: "employees",
        // link: "/tashkent/employees",
        link: `/${params.region}/employees`,
        label: t('employees-list-get'),
        icon: <UserPlus className="mr_10" />,
        roles: new Set(['Superadmin', 'RegionalManager', 'VsxManager', 'SuperDuperAdmin'])
      },
      {
        id: "reports",
        // link: "/tashkent/cameras",?
        label: t('reports'),
        icon: <BookOpen className="mr_10" />,
         link: `/${params.region}/reports`,
        roles: new Set(['Superadmin' ,'VsxManager', 'SuperDuperAdmin'])
      },
      {
        id: "freedom",
        // link: "/tashkent/freedom",
        link: `/${params.region}/freedom`,
        // label: "ВСХдан ташқарига чиқарилганлар",
        label: t('VSX-outside'),
        icon: <FileText className="mr_10" />,
        roles: new Set(['Superadmin', 'VsxManager','VsxInspector', 'SuperDuperAdmin'])
      },

      {
        id: "arxive",
        // link: "/tashkent/archive",
         link: `/${params.region}/archive`,
        label: t('VSX-archive'),
        icon: <Download className="mr_10" />,
        roles: new Set(['Superadmin', 'VsxManager', 'SuperDuperAdmin'])
      },

      {
        id: "settings",
        // link: "/tashkent/",
         link: `/${params.region}/settings`,
        label: t('settings'),
        icon: <Settings className="mr_10" />,
        roles: new Set(['Superadmin', 'VsxManager', 'SuperDuperAdmin'])
      },

    ],
  }
  return _menu[name]
};
