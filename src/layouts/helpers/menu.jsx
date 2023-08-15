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

export const SidbarMenu = (name) => {
  const params = useParams();
  const _menu = {
    cashbox: [
      {
        id: "income",
        link: "/cashbox/income",
        label: "Приход",
        icon: <IncomeIcon className="mr_5" />,
      },

      {
        id: "outgo",
        link: "/cashbox/outgo",
        label: "Расход",
        icon: <OutgoIcon className="mr_5" />,
      },
      {
        id: "cashbox-orders",
        link: "/cashbox/order",
        label: "Заказы",
        icon: <OrderIcon className="mr_5" />,
      },
      {
        id: "debtor",
        link: "/cashbox/debtors",
        label: "Должники",
        icon: <DebtorsIcon className="mr_5" />,
      },

      {
        id: "statistics",
        link: "/cashbox/statistics",
        label: "Статистика",
        icon: <StatisticsIcon className="mr_5" />,
      },
    ],

    stock: [
      {
        id: "stock-income",
        link: "/stock/store",
        label: "Приход товаров",
        icon: <StockIncomeIcon className="mr_5" />,
      },
      {
        id: "stock-orders",
        link: "/stock/order",
        label: "Заказы",
        icon: <OrderIcon className="mr_5" />,
      },
      {
        id: "provider",
        link: "/stock/provider",
        label: "Поставщики",
        icon: <ProvidersIcon className="mr_5" />,
      },
      {
        id: "product",
        link: "/stock/product",
        label: "Продукты",
        icon: <ProvidersIcon className="mr_5" />,
      },
    ],

    supply: [
      {
        id: "order",
        link: "/supply/order",
        label: "Новые заказы",
        icon: <OrderIcon className="mr_5" />,
      },
    ],

    kitchen: [
      {
        id: "food-menu",
        // link: "/kitchen/menu",
        label: "Меню",
        icon: <FoodMenuIcon className="mr_5" />,
        submenu: [
          {
            id: "kitchen-all-food",
            link: "/kitchen/menu",
            label: "Всё меню",
          },
          {
            id: "kitchen-ready-food",
            link: "/kitchen/menu-ready",
            label: "Готовые блюда",
          },
        ],
      },
      {
        id: "order",
        link: "/kitchen/order",
        label: "Заказы",
        icon: <OrderIcon className="mr_5" />,
      },
      {
        id: "kitchen-food",
        link: "/kitchen/food",
        label: "Блюда",
        icon: <FoodIcon className="mr_5" />,
      },
    ],

    inventory: [
      {
        id: "inventory-room",
        link: "/inventory/room",
        label: "Инвентари в кабинетах",
        icon: <InventoryIcon className="mr_5" />,
      },
      {
        id: "inventory-removed",
        link: "/inventory/removed",
        label: "Списание",
        icon: <WriteOffIcon className="mr_5" />,
      },
      {
        id: "inventory-orders",
        link: "/inventory/order",
        label: "Заказы",
        icon: <OrderIcon className="mr_5" />,
      },
    ],

    settings: [
      {
        id: "currency",
        link: "/settings/currency",
        label: "Валюты",
        icon: <IncomeIcon className="mr_5" />,
      },
      {
        id: "payment-type",
        link: "/settings/payment-type",
        label: "Способы оплаты",
        icon: <OutgoIcon className="mr_5" />,
      },
      {
        id: "position",
        link: "/settings/position",
        label: "Должности",
        icon: <DebtorsIcon className="mr_5" />,
      },
      {
        id: "specialization",
        link: "/settings/specialization",
        label: "Специализации",
        icon: <DebtorsIcon className="mr_5" />,
      },
      {
        id: "measure",
        link: "/settings/measure",
        label: "Меры",
        icon: <DebtorsIcon className="mr_5" />,
      },
      {
        id: "category",
        link: "/settings/category",
        label: "Категории",
        icon: <DebtorsIcon className="mr_5" />,
      },
      {
        id: "shift",
        link: "/settings/shift",
        label: "Смены",
        icon: <DebtorsIcon className="mr_5" />,
      },
      {
        id: "cashbox",
        link: "/settings/cashbox",
        label: "Кассы",
        icon: <DebtorsIcon className="mr_5" />,
      },
      {
        id: "manufacturer",
        link: "/settings/manufacturer",
        label: "Производители",
        icon: <DebtorsIcon className="mr_5" />,
      },
      {
        id: "patient",
        link: "/settings/patient",
        label: "Пациенты",
        icon: <DebtorsIcon className="mr_5" />,
      },
      {
        id: "question",
        link: "/settings/question",
        label: "Воросы",
        icon: <DebtorsIcon className="mr_5" />,
      },
    ],

    tashkent: [
      {
        id: "dashboard",
        link: `/${params.region}/dashboard`,
        label: "Статистика",
        icon: <Home className="mr_10" />,
        roles: new Set(['Superadmin'])
      },
      {
        id: "prisoners",
        // link: "/tashkent/prisoner",
         link: `/${params.region}/prisoner`,
        label: "Шахсларни рўйхатга олиш",
        icon: <User className="mr_10" />,
        roles: new Set(['Superadmin'])
      },
      {
        id: "employees",
        // link: "/tashkent/employees",
         link: `/${params.region}/employees`,
        label: "Ходимларни рўйхатга олиш",
        icon: <UserPlus className="mr_10" />,
        roles: new Set(['Superadmin'])
      },
      {
        id: "absence",
        // link: "/tashkent/visitors",
         link: `/${params.region}/visitors`,
        label: "Йўқловга келган фуқаролар",
        icon: <Users className="mr_10" />,
        roles: new Set(['Superadmin'])
      },
      {
        id: "vsx",
        // link: "/tashkent/vsx",
        label: "ВСХни рўйхатга олиш",
         link: `/${params.region}/vsx`,
        icon: <FilePlus className="mr_10" />,
        roles: new Set(['Superadmin'])
      },
      {
        id: "vsxi",
        // link: "/tashkent/vsxi",
        label: "ВСХ раҳбарни малумотини олиш",
         link: `/${params.region}/vsxi`,
        icon: <VsxR className="mr_10" />,
        roles: new Set(['Superadmin'])
      },
      {
        id: "cameras",
        // link: "/tashkent/cameras",?
        label: "ВСХ камераларини рўйхатга олиш",
        icon: <Camera className="mr_10" />,
         link: `/${params.region}/cameras`,
        roles: new Set(['Superadmin'])
      },
      {
        id: "arxive",
        // link: "/tashkent/archive",
         link: `/${params.region}/archive`,
        label: "ВСХ архиви",
        icon: <Download className="mr_10" />,
        roles: new Set(['Superadmin'])
      },
      {
        id: "settings",
        // link: "/tashkent/",
         link: `/${params.region}/settings`,
        label: "Созламалар",
        icon: <Settings className="mr_10" />,
        roles: new Set(['Superadmin'])
      },
      {
        id: "freedom",
        // link: "/tashkent/freedom",
         link: `/${params.region}/freedom`,
        label: "ВСХдан ташқарига чиқарилганлар",
        icon: <FileText className="mr_10" />,
        roles: new Set(['Superadmin'])
      },
    ],
  }
  return _menu[name]
};
