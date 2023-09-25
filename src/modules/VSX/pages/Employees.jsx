import React, {useState} from "react";
import get from "lodash";
import {PageHeading, Table, Pagination, InputSearch, HeaderFilters, ConfirmModal} from "components";
import {useTranslation} from "react-i18next";
import { useFetchList, useGetLanguage, useOverlay, useDeleteWithConfirm} from "hooks";
import { useNavigate, useParams } from "react-router-dom";
import {formatters} from "../../../services/utils";
import {time} from '../../../services/time'
import {Avatar,Span, IsInvalid,ActionDropDown} from '../components/prisoners-components'
import '../styles/prisoners.scss'

const Employees = () => {
    const {t} = useTranslation()
    const navLink = useNavigate()
    const { getLanguageValue } = useGetLanguage();
    const {region} = useParams()
    const [isUpdate, setUpdate] = useState(false)
    const [values, setValues] = useState({})
    const [filters, setFilters] = useState({
        start: '',
        end: '',
        search: '',
        region_id: null
    })
    let count =0;
    const removePrisonerModal = useOverlay({ uniqueName: "removePrisoner" });
    const prisonerList = useFetchList({
        url: "/users",
        urlSearchParams:{
            pageSize: 10,
            populate: "*"
        }
    });
    console.log(prisonerList)
    const prisonerDelete = useDeleteWithConfirm({
        uniqueName: "removePrisonerModal",
        url: "/users",
    });
    const handlaAction=  (items) => {
        tableCheckItemClick(items)

    }
    const remove = (id) => {
        // console.log(itemdata, get(itemdata, "id"))
        prisonerDelete.setId(id);
        prisonerDelete.handleOverlayOpen();

    }
    const tableCheckItemClick = (item) =>{
        const {actionType, itemdata} = item;
        switch (actionType) {
            case 'see': return navLink(`/${region}/prisoner-detail/${itemdata.id}`);
            case 'updata': return navLink(`/${region}/prisoner/${itemdata.id}`)
            case 'delete': return remove(itemdata.id)
        }
    }
    const regionList = useFetchList({url:'/regions'});
    return (
        <>
            <ConfirmModal
                isOpen={prisonerDelete.isOverlayOpen}
                cancelAction={prisonerDelete.handleOverlayClose}
                successAction={() => {
                    prisonerDelete.mutateAsync(prisonerDelete.id).then(() => prisonerList.refetch());
                    prisonerDelete.handleOverlayClose();
                }}
            />
            <HeaderFilters
                setFieldValue={setFilters}
                items={regionList?.data?.map((el) => ({id:el.id, name: el?.name}))}
            />
            <InputSearch
                setValue={setFilters}
                text={t('employees-list-get')}
            />
            <PageHeading
                links={[
                    { link: "/", label: "Bosh sahifa" },
                    { link: "/", label: "Toshkent" },
                    { label: "Shaxslarni ro'yxatga olish" },
                ]}
                title={t("prisoner-list-add")}
                mainAction={() => navLink(`/${region}/employees/create`)}
                btnText={t("individuals-add")}
            />

            <Table
                emptyUiText="Afsuski hozirda shaxslarni ro'yxatga olish bo'yicha ma'lumot yo'q"
                isLoading={prisonerList.isLoading}
                columns={[
                    {
                        title: t('number'),
                        dataKey: "id",
                        render: (value, item) => {
                            return ++count;
                        },
                    },
                    {
                        title: t('photo'),
                        dataKey: "attributes",
                        className: "white-space_no-wrap",
                        render: (value, item) => Avatar(item?.image)
                        // time?.timeFormater(item?.attributes?.createdAt, "DD.MM.YYYY"),
                    },
                    {
                        title: t('fullName'),
                        className: "white-space_no-wrap",
                        dataKey: "attributes.sureName",
                        render: (value, item) =>
                        {
                            return Span(item)
                        }
                    },
                    {
                        title: t('birthdate'),
                        dataKey: "amount",
                        className: "white-space_no-wrap",
                        render: (value,items) => time.timeFormater(items?.birthdate, "DD.MM.YYYY"),
                    },
                    {
                        title: t("passport"),
                        dataKey: "currency",
                        render: (value,items) => items?.passport,
                    },
                    {
                        title: t("to-account"),
                        dataKey: "patient",
                        className: "white-space_no-wrap",
                        render: (value) =>
                            formatters.formatPhoneView(get(value, "phone")),
                    },
                    //
                    // {
                    //   title: "Комментарий",
                    //   dataKey: "comment",
                    //   render: (value) => value,
                    // },
                    {
                        title: t('isInvalid'),
                        dataKey: "user",
                        render: (value,item) => IsInvalid(item?.isInvalid),
                    },
                    {
                        title: t("camera"),
                        dataKey: "camera",
                        render: (value) => formatters.showDegree(value),
                    },
                    {
                        title: t('action'),
                        dataKey: "expired_at",
                        className: "white-space_no-wrap",
                        render: (value, items) => <ActionDropDown setMethod={handlaAction}  itemdata={items}/>,
                    },
                ]}
                items={prisonerList.data}
            />
            <span>{get(prisonerList, "meta.pagination.pageCount")}</span>
            <Pagination
                currentPage={prisonerList?.meta?.pagination?.page}
                pageCount={prisonerList?.meta?.pagination?.pageCount}
                onPageChange={(newPage) => prisonerList.setPage(newPage + 1)}
            />
        </>
    );
};

export default Employees;
