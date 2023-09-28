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
                // region: {
                    id: userData?.vsx?.id
                // }
            }
        }
    }
    const visitorsList = useFetchList({
        url: "/visits",
        urlSearchParams:{
            filters:filter,
            populate: 'responsibleOfficer,visitor,vsx,prisoner,prisoner.person,prisoner.room'

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
                        render: (value, item, index) => {
                            return index+1;
                        },
                    },
                    {
                        title: t('photo'),
                        dataKey: "",
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
                            return Span({sureName:item?.visitor?.sureName, firstName:item?.visitor?.firstName, middleName:item?.visitor?.middleName})
                        }
                    },

                    {
                        title: t('who-prisoner'),
                        dataKey: "amount",
                        className: "white-space_no-wrap",
                        render: (value,item) => {
                            return Span({sureName:item?.prisoner?.person?.sureName, firstName:item?.prisoner?.person?.firstName, middleName:item?.prisoner?.person?.middleName})
                        },

                    },
                    {
                        title: t("passport"),
                        dataKey: "currency",
                        render: (value,item) => item?.prisoner?.person?.passport,
                    },
                    {
                        title: t("visit-time"),
                        dataKey: "patient",
                        className: "white-space_no-wrap",
                        render: (value, item) =>
                            time.timeFormater(item.date, 'YYYY-MM-DD HH:mm:ss'),
                    },


                    {
                        title: t('products-give'),
                        dataKey: "user",
                        render: (value,item) => item.items.length > 0 ? t('yes') : t('no'),
                    },
                    {
                        title: t("camera"),
                        dataKey: "camera",
                        render: (value, item) => item?.prisoner?.room?.name ,
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
