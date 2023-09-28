import React, {useState} from "react";
import {PageHeading, Table, Pagination, InputSearch, HeaderFilters, ConfirmModal} from "components";
import {useTranslation} from "react-i18next";
import {useFetchList, useGetLanguage, useOverlay, useDeleteWithConfirm} from "hooks";
import { useNavigate, useParams } from "react-router-dom";
import {time} from '../../../services/time'
import {Avatar,Span, IsInvalid} from '../components/prisoners-components'
import '../styles/prisoners.scss'
const VSXList = () => {
    const {t} = useTranslation()
    const navLink = useNavigate()
    const {region} = useParams()
    const { getLanguageValue } = useGetLanguage();
    const [filters, setFilters] = useState({
        start: '',
        end: '',
        search: '',
        region_id: null
    })
    const removePrisonerModal = useOverlay({ uniqueName: "removePrisoner" });
    const vsxesList = useFetchList({
        url: "/vsxes",
        urlSearchParams:{
            populate: 'region, rooms'
        }
    });
    const prisonerDelete = useDeleteWithConfirm({
        uniqueName: "removePrisonerModal",
        url: "/prisoners",
    });
    const handlaAction=  (items) => {
        tableCheckItemClick(items)

    }
    const remove = (row, event) => {
        prisonerDelete.setId(row.id);
        prisonerDelete.handleOverlayOpen();

    }
    const handelchecked =  (items) => {
        // console.log(items)
    }
    const tableCheckItemClick = (item) =>{
        const {actionType, itemdata} = item;
        switch (actionType) {
            case 'see': return navLink(`/${region}/prisoner/detail/${itemdata.id}`);
            case 'updata': return navLink(`/${region}/prisoner/${itemdata.id}`)
            case 'delete': return remove(itemdata.id)
        }
    }
    let count=0;
    const regionList = useFetchList({url:'/regions'});
    return (
        <>
            <ConfirmModal
                cancelText={t('cancel-text')}
                successText={t('remove')}
                title={t('prison-remove-modal-title')}
                isOpen={prisonerDelete.isOverlayOpen}
                cancelAction={prisonerDelete.handleOverlayClose}
                successAction={() => {
                    prisonerDelete.mutateAsync(prisonerDelete.id).then(() => vsxesList?.refetch());
                    prisonerDelete.handleOverlayClose();
                }}
            />
            <HeaderFilters
                setFieldValue={setFilters}
                items={regionList?.data?.map((el) => ({id:el.id, name: el.name}))}
            />
            <InputSearch
                setValue={setFilters}
                placeholder={t('search')}
                text={t('VSX-list')}
            />
            <PageHeading
                links={[
                    { link: "/", label: "Bosh sahifa" },
                    { link: "/", label: "Toshkent" },
                    { label: "Shaxslarni ro'yxatga olish" },
                ]}
                title={t("prisoner-list-add")}
                mainAction={() => navLink(`/${region}/vsx/create`)}
                btnText={t("VSX-add")}
            />

            <Table
                emptyUiText={t('prisoner-list-emptey')}
                isLoading={vsxesList?.isLoading}
                setChecked={handelchecked}
                editAction={(row) => {navLink(`/${region}/prisoner/${row.id}`)}}
                deleteAction={remove}
                seeAction={(row) => { navLink(`/${region}/vsx/${row.id}`)}}
                columns={[
                    {
                        title: t('number'),
                        dataKey: "id",
                        render: (value, item) => {
                            return ++count;
                        },
                    },
                    {
                        title: t('VSX-name'),
                        dataKey: "name",
                        className: "white-space_no-wrap",
                        render: (value, item) => {
                            return item.name
                        }
                        // time?.timeFormater(item?.attributes?.createdAt, "DD.MM.YYYY"),
                    },
                    {
                        title: t('VSX-camera-count'),
                        className: "white-space_no-wrap",
                        dataKey: "sureName",
                        render: (value, items) =>
                        {
                            return  items?.rooms?.length
                        }
                    },
                    {
                        title: t("VSX-phone"),
                        dataKey: "currency",
                        render: (value,items) => items?.phone,
                    },{
                        title: t("VSX-address"),
                        dataKey: "currency",
                        render: (value,items) => items?.region?.name,
                    },
                ]}
                items={vsxesList?.data}
            />
            {/*<span>salom</span>*/}
            {/*        <span>{get(prisonerList, "meta.pagination.pageCount")}</span>*/}
            <Pagination
                currentPage={vsxesList?.meta?.pagination?.page}
                pageCount={vsxesList?.meta?.pagination?.pageCount}
                onPageChange={(newPage) => vsxesList.setPage(newPage + 1)}
            />
        </>
    );
};

export default VSXList;
