import React, {useState} from "react";
import get from "lodash";
import {PageHeading, Table, Pagination, InputSearch, HeaderFilters, ConfirmModal} from "components";
import {useTranslation} from "react-i18next";
import {} from 'react-dom'
import {useDelete, useFetchList, useGetLanguage, useOverlay, useDeleteWithConfirm} from "hooks";
import {useNavigate, useParams} from "react-router-dom";
import {formatters} from "../../../services/utils";
import {time} from '../../../services/time'
import {Avatar,Span, IsInvalid,ActionDropDown} from '../components/visotors-components'
import '../styles/prisoners.scss'
import userimg from '../../../assets/images/user.png'

const Vsitors = () => {
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
    const removeVisitorsModal = useOverlay({ uniqueName: "removePrisoner" });
    const visitorsList = useFetchList({
        url: "/visitors",
        urlSearchParams:{
            pageSize: 10,
        }
    });
    const prisonerDelete = useDeleteWithConfirm({
        uniqueName: "removeVisitorsModal",
        url: "/visitors",
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
            // case 'see': return navLink(`/prisoner-detail/${itemdata.id}`);
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
                isOpen={removeVisitorsModal.isOverlayOpen}
                cancelAction={removeVisitorsModal.handleOverlayClose}
                successAction={() => {
                    removeVisitorsModal.mutateAsync(removeVisitorsModal.id).then(() => visitorsList.refetch());
                    removeVisitorsModal.handleOverlayClose();
                }}
            />
            <HeaderFilters
                setFieldValue={setFilters}
                items={regionList?.data?.map((el) => ({id:el.id, name: el.attributes.name}))}
            />
            <InputSearch
                placeholder={t('search')}
                setValue={setFilters}
                text={'ВСХда йўқловдаги фуқаролар'}
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
                        title: t('phone'),
                        dataKey: "attributes",
                        className: "white-space_no-wrap",
                        render: (value, item) => Avatar(item.attributes.image)
                        // time?.timeFormater(item?.attributes?.createdAt, "DD.MM.YYYY"),
                    },
                    {
                        title: t('fullName'),
                        className: "white-space_no-wrap",
                        dataKey: "attributes.sureName",
                        render: (value, item) =>
                        {
                            return Span(item.attributes)
                        }
                    },
                    {
                        title: t('birthdate'),
                        dataKey: "amount",
                        className: "white-space_no-wrap",
                        render: (value,items) => time.timeFormater(items.attributes.birthdate, "DD.MM.YYYY"),
                    },
                    {
                        title: t("passport"),
                        dataKey: "currency",
                        render: (value,items) => items.attributes.passport,
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
                        render: (value,item) => IsInvalid(item.attributes.isInvalid),
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
                items={visitorsList.data}
            />
            {/*<span>salom</span>*/}
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
