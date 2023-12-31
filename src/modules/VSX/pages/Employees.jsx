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

const Employees = () => {
    const {t} = useTranslation()
    const navLink = useNavigate()
    const { getLanguageValue } = useGetLanguage();
    const userData = JSON.parse(localStorage.getItem('userData'))
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
    const [page, setPage] = useState(1)
    const systemAccessModal = useOverlay({ uniqueName: "systemAccessModal" });
    const removePrisonerModal = useOverlay({ uniqueName: "removePrisoner" });
    const filter={
        id: {
            $ne: userData.id
        }
    }
    if(userData.region) {
        filter['region'] =userData.region.id
    }
    if(userData.vsx) {
        filter['vsx'] =userData.vsx.id
    }
    const prisonerList = useFetchList({
        url: "/users",
        urlSearchParams:{
            populate: "*",
            filters:filter
        }
    });
    const prisonerDelete = useDeleteWithConfirm({
        uniqueName: "removePrisonerModal",
        url: "/users",
    });

    const remove = (item) => {
        prisonerDelete.setId(item.id);
        prisonerDelete.handleOverlayOpen();
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
                            return Span({person: {
                                     sureName: item?.sureName,
                                    firstName:item?.firstName
                                }})
                        }
                    },
                    {
                        title: t('birthdate'),
                        dataKey: "amount",
                        className: "white-space_no-wrap",
                        render: (value,items) => time.timeFormater(items?.birthdate, "DD.MM.YYYY"),
                    },
                    // {
                    //     title: t("passport"),
                    //     dataKey: "currency",
                    //     render: (value,items) => items?.passport,
                    // },
                    {
                        title: t("working-time"),
                        dataKey: "patient",
                        className: "white-space_no-wrap",
                        render: (value, item) => {
                           return  time.timeFormater(item.jobStartDate, 'YYYY-MM-DD')
                        }


                    },
                    //
                    {
                      title: t("graduation"),
                      dataKey: "comment",
                      render: (value, item) => item?.graduation?.name,
                    },
                    {
                        title: t('rank'),
                        dataKey: "user",
                        render: (value,item) => item?.rank?.name,
                    },
                    {
                        title: t("Job"),
                        dataKey: "camera",
                        render: (value,item) => item?.position?.name
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

export default Employees;
