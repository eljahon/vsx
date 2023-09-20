import React, {useState} from "react";
import get from "lodash";
import {PageHeading, Table, Pagination, InputSearch, HeaderFilters, ConfirmModal, TabBase, Button} from "components";
import {useTranslation} from "react-i18next";
import {} from 'react-dom'
import {useDelete, useFetchList, useGetLanguage, useOverlay, useDeleteWithConfirm} from "hooks";
import {useNavigate, useParams} from "react-router-dom";
import {formatters} from "../../../../services/utils";
import {time} from '../../../../services/time'
import {Avatar, Span, IsInvalid, ActionDropDown} from '../../components/prisoners-components'
import {returnForms} from "../../components/camera-compronents/camera-forms";
import {ReactComponent as User} from '../../../../assets/icons/outsidedisibleuser.svg'
import {ReactComponent as Boshqa} from '../../../../assets/icons/boshqa.svg'
import {ReactComponent as Advakat} from '../../../../assets/icons/advakat.svg'
import {ReactComponent as Etap} from '../../../../assets/icons/etap.svg'
import {ReactComponent as Ozodetish} from '../../../../assets/icons/ozodetish.svg'
import {ReactComponent as MaxsusPalata} from '../../../../assets/icons/maxsusPalata.svg'
import {ReactComponent as Tergovdisibel} from '../../../../assets/icons/tergovdisibel.svg'
import {ReactComponent as Food} from '../../../../assets/icons/outsidedisiblefood.svg'
import '../../styles/prisoners.scss'
import userimg from '../../../../assets/images/user.png'

const iconRender = (name) => {
    let iconName = {
        'Sayrga olib chiqish': User,
        "Boshqa sabab": Boshqa,
        "Advokat bilan uchrashuv": Advakat,
        "Etap asosida yuborish": Etap,
        "Ozod etish": Ozodetish,
        "Махсус палата": MaxsusPalata,
        "Tergov": Tergovdisibel,
        "Ovqat berish": Food
    }
    let Icon = iconName[name]
    return <Icon/>
}
const ItemCamera = () => {
    const {t} = useTranslation()
    const navLink = useNavigate()
    const {region, id} = useParams()
    const {getLanguageValue} = useGetLanguage();
    const [checkedList, setcheckedList] = useState([])
    const [currenName, setcurrenName] = useState('')
    const [filters, setFilters] = useState({
        start: '',
        end: '',
        search: '',
        region_id: null
    })
    // const removePrisonerModal = useOverlay({ uniqueName: "removePrisoner" });
    const ItemCamera = useFetchList({
        url: `/rooms/${id}`,
        urlSearchParams: {
            sort: {id: 'desc'},
            populate: "prisoners, prisoners.person"
        }
    });
    const StatusList = useFetchList({
        url: `/prisoner-room-leave-reasons`,
        urlSearchParams: {
            sort: {id: 'asc'}
        }
    });
    const tabLabels = [ItemCamera?.data?.data?.name];
    // const [currentLables, setCurrentTabLabel] = useState(tabLabels[0])
    const prisonerDelete = useDeleteWithConfirm({
        uniqueName: "removePrisonerModal",
        url: "/prisoners",
    });
    // let count =prisonerList?.meta?.pagination?.page;
    const handlaAction = (items) => {
        tableCheckItemClick(items)

    }
    const remove = (id) => {
        prisonerDelete.setId(id);
        prisonerDelete.handleOverlayOpen();

    }
    const handelchecked = (items) => {
        console.log(items)
        setcheckedList(items)
    }
    const handleTab = (items) => {
        console.log(items)
    }
    const tableCheckItemClick = (item) => {
        const {actionType, itemdata} = item;
        switch (actionType) {
            case 'see':
                return navLink(`/${region}/prisoner/detail/${itemdata.id}`);
            case 'updata':
                return navLink(`/${region}/prisoner/${itemdata.id}`)
            case 'delete':
                return remove(itemdata.id)
        }
    }
    const regionList = useFetchList({url: '/regions'});
    console.log(StatusList)
    const handelStatus = (element) => {
        console.log(element)
        setcurrenName(element.id)
    }
    const clear = () => {
        handelchecked([])
        setcurrenName('')
    }
    return (
        <>
            {/*<ConfirmModal*/}
            {/*    isOpen={prisonerDelete.isOverlayOpen}*/}
            {/*    cancelAction={prisonerDelete.handleOverlayClose}*/}
            {/*    successAction={() => {*/}
            {/*        prisonerDelete.mutateAsync(prisonerDelete.id).then(() => prisonerList.refetch());*/}
            {/*        prisonerDelete.handleOverlayClose();*/}
            {/*    }}*/}
            {/*/>*/}
            <HeaderFilters
                setFieldValue={setFilters}
                items={regionList?.data?.map((el) => ({id: el.id, name: el.name}))}
            />
            <InputSearch
                setValue={setFilters}
                text={ItemCamera?.data?.data?.name}
            />
            {/*<PageHeading*/}
            {/*    links={[*/}
            {/*        { link: "/", label: "Bosh sahifa" },*/}
            {/*        { link: "/", label: "Toshkent" },*/}
            {/*        { label: "Shaxslarni ro'yxatga olish" },*/}
            {/*    ]}*/}
            {/*    title={t("prisoner-list-add")}*/}
            {/*    mainAction={() => navLink(`/${region}/prisoner/create`)}*/}
            {/*    btnText={t("prisoner-list-add")}*/}
            {/*/>*/}
            <TabBase
                labels={tabLabels}
                currentLabel={ItemCamera?.data?.data?.name}
                className={'prisoner__tab__item'}
                onPaneChange={(active, envt) => {
                    handleTab(active)
                }}
            /> <br/>

            <Table
                emptyUiText="Afsuski hozirda shaxslarni ro'yxatga olish bo'yicha ma'lumot yo'q"
                isLoading={ItemCamera.isLoading}
                isCheckedSee
                setChecked={handelchecked}
                columns={[
                    {
                        title: t('number'),
                        dataKey: "id",
                        render: (value, item) => {
                            return 1
                        },
                    },
                    {
                        title: t('photo'),
                        dataKey: "attributes",
                        className: "white-space_no-wrap",
                        render: (value, item) => Avatar(item.image)
                        // time?.timeFormater(item?.attributes?.createdAt, "DD.MM.YYYY"),
                    },
                    {
                        title: t('fullname'),
                        className: "white-space_no-wrap",
                        dataKey: "attributes.sureName",
                        render: (value, item) => {
                            return Span(item)
                        }
                    },
                    // {
                    //     title: t('birthdate'),
                    //     dataKey: "amount",
                    //     className: "white-space_no-wrap",
                    //     render: (value,items) => time.timeFormater(items.attributes.birthdate, "DD.MM.YYYY"),
                    // },
                    // {
                    //     title: t("passport"),
                    //     dataKey: "currency",
                    //     render: (value,items) => items.attributes.passport,
                    // },
                    {
                        title: t("camera-out-time"),
                        dataKey: "patient",
                        className: "white-space_no-wrap",
                        render: (value) => '--',
                    },
                    //
                    // {
                    //   title: "Комментарий",
                    //   dataKey: "comment",
                    //   render: (value) => value,
                    // },
                    {
                        title: t('camera-get-time'),
                        dataKey: "user",
                        align: 'center',
                        render: (value, item) => item?.room?.name ?? '--',
                    },
                    {
                        title: t("where-is-now"),
                        dataKey: "camera",
                        render: (value, items) => {
                            // console.log(value,items)
                            // formatters.showDegree(value)
                            return items?.room?.data?.name
                        },
                    },
                    // {
                    //     title: t('action'),
                    //     dataKey: "expired_at",
                    //     className: "white-space_no-wrap",
                    //     render: (value, items) => <ActionDropDown setMethod={handlaAction}  itemdata={items}/>,
                    // },
                ]}
                items={ItemCamera?.data?.data?.prisoners}
            />
            {/*<span>salom</span>*/}
            {/*<span>{get(prisonerList, "meta.pagination.pageCount")}</span>*/}
            <Pagination
                currentPage={ItemCamera?.meta?.pagination?.page}
                pageCount={ItemCamera?.meta?.pagination?.pageCount}
                onPageChange={(newPage) => ItemCamera.setPage(newPage + 1)}
            />
            <div className='statusItem mt_20'>
                {StatusList?.data?.map((el, index) => (
                    <span onClick={() => handelStatus(el)} key={index}
                          className={checkedList.length ? `statusItem-isdisible statusItem-status ${el.id === currenName ? 'statusItem_bg-add' : ''}` : 'statusItem-status statusItem-disible'}>{iconRender(el.name)}{el.name}</span>
                ))}
            </div>
            <div className='mt_20'>
                {
                    currenName && returnForms(currenName, {prisoners: checkedList, reason: currenName}, clear)
                }
            </div>
        </>
    );
};

export default ItemCamera;

