import React, {useState} from "react";
import get from "lodash";
import {Table, Pagination, InputSearch, HeaderFilters, ConfirmModal, TabBase, Button} from "components";
import {useTranslation} from "react-i18next";
import {} from 'react-dom'
import {useFetchList, useGetLanguage, useDeleteWithConfirm} from "hooks";
import {useNavigate, useParams} from "react-router-dom";
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
    const [isHeaderChecked, setIsHeaderCheaked] = useState(false)
    const [checkedList, setcheckedList] = useState([])
    const [currenName, setcurrenName] = useState({})
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
    const prisonerDelete = useDeleteWithConfirm({
        uniqueName: "removePrisonerModal",
        url: "/prisoners",
    });
    const handlaAction = (items) => {
        tableCheckItemClick(items)

    }
    const remove = (id) => {
        prisonerDelete.setId(id);
        prisonerDelete.handleOverlayOpen();

    }
    const handelchecked = (items) => {
        const {data:{prisoners}} = ItemCamera.data;
        if(items.isCheckedAll && items.id === 'all') {
            setIsHeaderCheaked(true)
             setcheckedList(prisoners.map(el=> el.id))
        } else if (!items.isCheckedAll && items.id === 'all') {
            setIsHeaderCheaked(false)
            setcheckedList([])
        } else if (items.isCheckedAll && items.id) {
            setcheckedList(old => [...old, items.id])
        }else if (!items.isCheckedAll && items.id) {
            setcheckedList(checkedList.filter(el => el !== items.id))
        } else {
            setIsHeaderCheaked(false)
            setcheckedList([])
        }


    }
    const handleTab = (items) => {
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
    const handelStatus = (element) => {
        console.log(element)
        setcurrenName(element)
    }
    const clear = () => {
        handelchecked([])
        setcurrenName('')
        navLink(`/${region}/prisoner-insede`)
    }
    return (
        <>

            <HeaderFilters
                setFieldValue={setFilters}
                items={regionList?.data?.map((el) => ({id: el.id, name: el.name}))}
            />
            <InputSearch
                setValue={setFilters}
                text={ItemCamera?.data?.data?.name}
            />

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
                isHeaderChecked={isHeaderChecked}
                setIsHeaderCheaked={setIsHeaderCheaked}
                checkedList={checkedList}
                setChecked={handelchecked}
                columns={[
                    {
                        title: t('number'),
                        dataKey: "id",
                        render: (value, item, index) => {
                            return  index+1
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
            <Pagination
                currentPage={ItemCamera?.meta?.pagination?.page}
                pageCount={ItemCamera?.meta?.pagination?.pageCount}
                onPageChange={(newPage) => ItemCamera.setPage(newPage + 1)}
            />
            <div className='statusItem mt_20'>
                {StatusList?.data?.map((el, index) => (
                    <span onClick={() => handelStatus(el)} key={index}
                          className={checkedList.length ? `statusItem-isdisible statusItem-status ${el.id === currenName.id ? 'statusItem_bg-add' : ''}` : 'statusItem-status statusItem-disible'}>{iconRender(el.name)}{el.name}</span>
                ))}
            </div>
            <div className='mt_20'>
                {
                    currenName?.id && returnForms(currenName.id, {prisoners: checkedList, reason: currenName.id}, clear, currenName)
                }
            </div>
        </>
    );
};

export default ItemCamera;

