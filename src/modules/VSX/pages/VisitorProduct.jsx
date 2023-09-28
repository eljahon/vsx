import React, {useState} from "react";
import get from "lodash";
import {PageHeading, Table, Pagination, InputSearch, HeaderFilters, ConfirmModal, Button} from "components";
import {useTranslation} from "react-i18next";
import { useFetchList, useGetLanguage, useOverlay, useDeleteWithConfirm} from "hooks";
import { useNavigate, useParams } from "react-router-dom";
import {formatters} from "../../../services/utils";
import {time} from '../../../services/time'
import {Avatar,Span, IsInvalid,ActionDropDown} from '../components/prisoners-components'
import '../styles/prisoners.scss'
import {httpClient} from "../../../services";
import {SystemAccessModal} from "../components/employees-components/SystemAccessModal";

const VisotorProduct = () => {
    const {t} = useTranslation()
    const navLink = useNavigate()
    const { getLanguageValue } = useGetLanguage();
    const {region} = useParams()
    const [isUpdate, setUpdate] = useState(false)
    const [checkedList, setcheckedList] = useState([])
    const [isHeaderChecked, setIsHeaderCheaked] = useState(false)
    const [values, setValues] = useState({})
    const [filters, setFilters] = useState({
        start: '',
        end: '',
        search: '',
        region_id: null
    })
    const systemAccessModal = useOverlay({ uniqueName: "systemAccessModal" });
    const removePrisonerModal = useOverlay({ uniqueName: "removePrisoner" });
    const prisonerList = useFetchList({
        url: "/users",
        urlSearchParams:{
            pageSize: 10,
            populate: "*",
            filters: {
                id: {
                    $ne: JSON.parse(localStorage.getItem('userData')).id
                }
            }
        }
    });
    const prisonerDelete = useDeleteWithConfirm({
        uniqueName: "removePrisonerModal",
        url: "/users",
    });
    const handlaAction=  (items) => {
        tableCheckItemClick(items)

    }
    const remove = (item) => {
        prisonerDelete.setId(item.id);
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
    const handeleReversToRoom = async () => {
        // try {
        //     const reversToRoomData = await httpClient.post('/prisoner/leave-room',{data: {prisoners:checkedList}})
        //     if(reversToRoomData) {
        //         prisonerList.refetch()
        //     }
        //     return  reversToRoomData
        // } catch (err) {
        //     throw new Error(err)
        // }
    }
    const handelchecked = (items) => {
        const prisoners= prisonerList.data;
        if (items.isCheckedAll && (items.id !== 'all')) {
            setcheckedList( [items.id])
        }else if (!items.isCheckedAll && (items.id !== 'all')) {
            setcheckedList(checkedList.filter(el => el !== items.id))
        } else {
            setIsHeaderCheaked(false)
            setcheckedList([])
        }


    }
    const regionList = useFetchList({url:'/regions'});
    return (
        <>
            <ConfirmModal
                cancelText={t('cancel-text')}
                successText={t('remove')}
                title={t('employees-remove-modal-title')}
                isOpen={prisonerDelete.isOverlayOpen}
                cancelAction={prisonerDelete.handleOverlayClose}
                successAction={() => {
                    prisonerDelete.mutateAsync(prisonerDelete.id).then(() => prisonerList.refetch());
                    prisonerDelete.handleOverlayClose();
                }}
            />
            <SystemAccessModal
                checkUserId={checkedList}
                setcheckedList={setcheckedList}
                isOpen={systemAccessModal.isOverlayOpen}
                handleOverlayOpen={systemAccessModal.handleOverlayOpen}
                handleOverlayClose={systemAccessModal.handleOverlayClose}/>
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
                btnText={t("employees-add")}
            />

            <Table
                emptyUiText="Afsuski hozirda shaxslarni ro'yxatga olish bo'yicha ma'lumot yo'q"
                isLoading={prisonerList.isLoading}
                editAction={(row) => {navLink(`/${region}/prisoner/${row.id}`)}}
                deleteAction={remove}
                seeAction={(row) => { navLink(`/${region}/employees/detail/${row.id}`)}}
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
                    // {
                    //     title: t('action'),
                    //     dataKey: "expired_at",
                    //     className: "white-space_no-wrap",
                    //     render: (value, items) => <ActionDropDown setMethod={handlaAction}  itemdata={items}/>,
                    // },
                ]}
                isCheckedSee
                // isHeaderChecked={isHeaderChecked}
                // setIsHeaderCheaked={setIsHeaderCheaked}
                checkedList={checkedList}
                setChecked={handelchecked}
                items={prisonerList.data}
            />
            <span>{get(prisonerList, "meta.pagination.pageCount")}</span>
            <Pagination
                currentPage={prisonerList?.meta?.pagination?.page}
                pageCount={prisonerList?.meta?.pagination?.pageCount}
                onPageChange={(newPage) => prisonerList.setPage(newPage + 1)}
            />
            <div className='d-flex justify-content-end mt_20'>
                <Button isDisabled={checkedList?.length <=0} onClick={() => systemAccessModal.handleOverlayOpen()} className='btn' design='greey' text={t('system-access')}/>
            </div>
        </>
    );
};

export default VisotorProduct;
