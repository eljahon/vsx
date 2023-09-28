import React, {useState} from "react";
import get from "lodash";
import {PageHeading, Table, Pagination, InputSearch, HeaderFilters, ConfirmModal} from "components";
import {useTranslation} from "react-i18next";
import {useFetchList, useGetLanguage, useDeleteWithConfirm} from "hooks";
import {useNavigate, useParams} from "react-router-dom";
import {formatters} from "../../../services/utils";
import {time} from '../../../services/time'
import {Avatar,Span, IsInvalid,ActionDropDown} from '../components/visotors-components'
import '../styles/prisoners.scss'

const Vsitors = () => {
    const {t} = useTranslation()
    const navLink = useNavigate()
    const { getLanguageValue } = useGetLanguage();
    const {region} = useParams()
    const userData = JSON.parse(localStorage.getItem('userData'))
    const [isUpdate, setUpdate] = useState(false)
    const [values, setValues] = useState({})
    const [filters, setFilters] = useState({
        start: '',
        end: '',
        search: '',
        region_id: null
    })
    let count =0;
    let filter = {};
    if(userData.vsx){
        filter = {
            vsx: {
                id: userData?.vsx?.id
            }
        }
    }
    if (userData.region) {
        filter = {
            ...filter,
            vsx: {
                region: {
                    id: userData?.region?.id
                }
            }
        }
    }
    const visitorsList = useFetchList({
        url: "/visits",
        urlSearchParams:{
            filters:filter

        }
    });
    const visitorsDelete = useDeleteWithConfirm({
        uniqueName: "removeVisitorsModal",
        url: "/visits",
    });
    const handlaAction=  (items) => {
        tableCheckItemClick(items)

    }
    const remove = (item) => {
        visitorsDelete.setId(item.id);
        visitorsDelete.handleOverlayOpen();

    }
    const tableCheckItemClick = (item) =>{
        const {actionType, itemdata} = item;
        switch (actionType) {
            case 'updata': return navLink(`/${region}/visitors/form/${itemdata.id}`)
            case 'delete': return remove(itemdata.id)
        }
    }
    //   const visitorsList = fetchPrisonersList({pagination:{page:1, pageSize:10}})
    // console.log(visitorsList)
    const regionList = useFetchList({url:'/regions'});
    return (
        <>
            {/*<AddPrisonerModal*/}
            {/*  isOpen={addPrisoner.isOverlayOpen}*/}
            {/*  isUpdate={isUpdate}*/}
            {/*  values={isUpdate ? values : null}*/}
            {/*  handleOverlayOpen={addPrisoner.handleOverlayOpen}*/}
            {/*  handleOverlayClose={addPrisoner.handleOverlayClose}*/}
            {/*  onAddedNewRecord={() => {*/}
            {/*    visitorsList.refetch();*/}
            {/*  }}*/}
            {/*/>*/}
            <ConfirmModal
                cancelText={t('cancel-text')}
                successText={t('remove')}
                title={t('citizen-info')}
                isOpen={visitorsDelete.isOverlayOpen}
                cancelAction={visitorsDelete.handleOverlayClose}
                successAction={() => {
                    visitorsDelete.mutateAsync(visitorsDelete.id).then(() => visitorsList.refetch());
                    visitorsDelete.handleOverlayClose();
                }}
            />
            <HeaderFilters
                setFieldValue={setFilters}
                items={regionList?.data?.map((el) => ({id:el.id, name: el?.name}))}
            />
            <InputSearch
                placeholder={t('search')}
                setValue={setFilters}
                text={t('visitors-came-citizen')}
            />
            <PageHeading
                links={[
                    { link: "/", label: "Bosh sahifa" },
                    { link: "/", label: "Toshkent" },
                    { label: "Shaxslarni ro'yxatga olish" },
                ]}
                title={t("prisoner-list-add")}
                mainAction={() => navLink(`/${region}/visitors/form/create`)}
                btnText={t("visitors-add")}
            />

            <Table
                editAction={(row) => {navLink(`/${region}/visitors/form/${row.id}`)}}
                deleteAction={remove}
                // seeAction={(row) => { navLink(`/${region}/prisoner/detail/${row.id}`)}}
                emptyUiText="Afsuski hozirda shaxslarni ro'yxatga olish bo'yicha ma'lumot yo'q"
                isLoading={visitorsList.isLoading}
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
                        title: t('fullname'),
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
                    }
                ]}
                items={visitorsList.data}
            />
            <span>{get(visitorsList, "meta.pagination.pageCount")}</span>
            <Pagination
                currentPage={visitorsList?.meta?.pagination?.page}
                pageCount={visitorsList?.meta?.pagination?.pageCount}
                onPageChange={(newPage) => visitorsList.setPage(newPage + 1)}
            />
        </>
    );
};

export default Vsitors;
