import React from "react";
import get from "lodash";
import {PageHeading, Table, Pagination, InputSearch, HeaderFilters} from "components";
import { useFetchList, useGetLanguage, useOverlay } from "hooks";
import { PForms } from "../components/prisoners-components/PForms";
import {time} from '../../../services/time'
import {formatters} from "../../../services/utils";
import {DrogDrop} from "../components/camera-compronents";

const Prisoners = () => {
    const { getLanguageValue } = useGetLanguage();
    const addPrisoner = useOverlay({ uniqueName: "addPrisoner" });
    const cameraList = useFetchList({
        url: "/rooms",
        // urlSearchParams: {
        //   include: "patient",
        //     page:'1',
        //     pageSize: 10
        // },
    });
    // console.log(cameraList)
    return (
        <>
            {/*<AddPrisonerModal*/}
            {/*    isOpen={addPrisoner.isOverlayOpen}*/}
            {/*    handleOverlayOpen={addPrisoner.handleOverlayOpen}*/}
            {/*    handleOverlayClose={addPrisoner.handleOverlayClose}*/}
            {/*    onAddedNewRecord={() => {*/}
            {/*        prisonerList.refetch();*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<HeaderFilters/>*/}
            {/*<InputSearch*/}
            {/*    text={'ВСХда сақланаётган шахслар рўйхати'}*/}
            {/*/>*/}
            {/*<PageHeading*/}
            {/*    links={[*/}
            {/*        { link: "/", label: "Bosh sahifa" },*/}
            {/*        { link: "/", label: "Toshkent" },*/}
            {/*        { label: "Shaxslarni ro'yxatga olish" },*/}
            {/*    ]}*/}
            {/*    title="Shaxslarni ro'yxatga olish"*/}
            {/*    mainAction={addPrisoner.handleOverlayOpen}*/}
            {/*    btnText={"Shaxslarni ro'yxatga olish"}*/}
            {/*/>*/}
            <DrogDrop/>
            {/*<Table*/}
            {/*    emptyUiText="Afsuski hozirda shaxslarni ro'yxatga olish bo'yicha ma'lumot yo'q"*/}
            {/*    isLoading={prisonerList.isLoading}*/}
            {/*    columns={[*/}
            {/*        {*/}
            {/*            title: "Дата",*/}
            {/*            dataKey: "created_at",*/}
            {/*            className: "white-space_no-wrap",*/}
            {/*            render: (value) => time?.formatTimestamp(value, "DD.MM.YYYY"),*/}
            {/*        },*/}
            {/*        {*/}
            {/*            title: "ID пациента",*/}
            {/*            dataKey: "id",*/}
            {/*            render: (value) => value,*/}
            {/*        },*/}
            {/*        {*/}
            {/*            title: "Пациент",*/}
            {/*            className: "white-space_no-wrap",*/}
            {/*            dataKey: "patient",*/}
            {/*            render: (value) =>*/}
            {/*                `${get(value, "first_name", "")} ${get(value, "last_name", "")}`,*/}
            {/*        },*/}
            {/*        {*/}
            {/*            title: "Сумма Долга",*/}
            {/*            dataKey: "amount",*/}
            {/*            className: "white-space_no-wrap",*/}
            {/*            render: (value) => formatters.formatCurrencyView(value),*/}
            {/*        },*/}
            {/*        {*/}
            {/*            title: "Валюта",*/}
            {/*            dataKey: "currency",*/}
            {/*            render: (value) => getLanguageValue(get(value, "name")),*/}
            {/*        },*/}
            {/*        {*/}
            {/*            title: "Номер телефона",*/}
            {/*            dataKey: "patient",*/}
            {/*            className: "white-space_no-wrap",*/}
            {/*            render: (value) =>*/}
            {/*                formatters.formatPhoneView(get(value, "phone")),*/}
            {/*        },*/}
            {/*        {*/}
            {/*            title: "Ответственный",*/}
            {/*            dataKey: "user",*/}
            {/*            render: (value) => get(value, "username"),*/}
            {/*        },*/}
            {/*        {*/}
            {/*            title: "Комментарий",*/}
            {/*            dataKey: "comment",*/}
            {/*            render: (value) => value,*/}
            {/*        },*/}
            {/*        {*/}
            {/*            title: "Степень знакомства",*/}
            {/*            dataKey: "degree",*/}
            {/*            render: (value) => formatters.showDegree(value),*/}
            {/*        },*/}
            {/*        {*/}
            {/*            title: "Дата Выплаты",*/}
            {/*            dataKey: "expired_at",*/}
            {/*            className: "white-space_no-wrap",*/}
            {/*            render: (value) => time?.formatTimestamp(value, "DD.MM.YYYY"),*/}
            {/*        },*/}
            {/*    ]}*/}
            {/*    items={prisonerList.data}*/}
            {/*/>*/}

            {/* <Pagination
        currentPage={prisonerList.page}
        pageCount={get(prisonerList, "meta.pageCount")}
        onPageChange={(newPage) => prisonerList.setPage(newPage + 1)}
      /> */}
        </>
    );
};

export default Prisoners;
