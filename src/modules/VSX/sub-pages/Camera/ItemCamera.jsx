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

const IconRender = (props) => {
    const {name} = props
    switch (name) {
        case 'Sayrga olib chiqish': return <User/>;
        case 'Boshqa sabab': return <Boshqa/>;
        case 'Advokat bilan uchrashuv': return <Advakat/>;
        case 'Etap asosida yuborish': return <Etap/>;
        case 'Ozod etish': return <Ozodetish/>;
        case 'Maxsus palata': return <MaxsusPalata/>;
        case 'Tergov': return <Tergovdisibel/>;
        case 'Ovqat berish': return <Food/>;
        default: return <User/>
    }
    // let iconName = {
    //     "Boshqa sabab": Boshqa,
    //     "Advokat bilan uchrashuv": Advakat,
    //     "Etap asosida yuborish": Etap,
    //     "Ozod etish": Ozodetish,
    //     "Maxsus palata": MaxsusPalata,
    //     "Tergov": Tergovdisibel,
    //     "Ovqat berish": Food
    // }
    // let Icon = iconName[name]
    // return <Icon/>
}
const ItemCamer = () => {
    const {t} = useTranslation()
    const navLink = useNavigate()

    const {region, id,name} = useParams()
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
    const ItemCameraData = useFetchList({
        url: `/prisoners`,
        urlSearchParams: {
            sort: {id: 'desc'},
            filters: {
                room:{id},
                isLeftRoom: {
                    $eq: false
                }
            },
            populate: "person, room"
        }
    });
    const StatusList = useFetchList({
        url: `/prisoner-room-leave-reasons`,
        urlSearchParams: {
            sort: {id: 'asc'}
        }
    });
    const tabLabels = [StatusList?.data];
    console.log(StatusList?.data)
    const handelchecked = (items) => {
        const prisoners = ItemCameraData?.data;
        if(items.isCheckedAll && items.id === 'all') {
            setIsHeaderCheaked(true)
             setcheckedList(prisoners.map(el=> el.person.id))
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
    return<>
        <HeaderFilters
            setFieldValue={setFilters}
            items={regionList?.data?.map((el) => ({id: el.id, name: el.name}))}
        />
        <InputSearch
            setValue={setFilters}
            text={name}
        />

        <Table
            emptyUiText="Afsuski hozirda shaxslarni ro'yxatga olish bo'yicha ma'lumot yo'q"
            isLoading={ItemCameraData?.isLoading}
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
                    render: (value, item) => Avatar(item.person.image)
                    // time?.timeFormater(item?.attributes?.createdAt, "DD.MM.YYYY"),
                },
                {
                    title: t('fullname'),
                    className: "white-space_no-wrap",
                    dataKey: "attributes.sureName",
                    render: (value, item) => {
                        // console.log('dalomomoo===>>', item)
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
                // {
                //     title: t("camera-out-time"),
                //     dataKey: "patient",
                //     className: "white-space_no-wrap",
                //     render: (value) => '--',
                // },
                //
                // {
                //   title: "Комментарий",
                //   dataKey: "comment",
                //   render: (value) => value,
                // },
                // {
                //     title: t('camera-get-time'),
                //     dataKey: "user",
                //     align: 'center',
                //     render: (value, item) => item?.room?.name ?? '--',
                // },
                {
                    title: t("where-is-now"),
                    dataKey: "camera",
                    render: (value, items) => {
                        // console.log(value,items)
                        // formatters.showDegree(value)
                        return items?.room?.name
                    },
                },
                // {
                //     title: t('action'),
                //     dataKey: "expired_at",
                //     className: "white-space_no-wrap",
                //     render: (value, items) => <ActionDropDown setMethod={handlaAction}  itemdata={items}/>,
                // },
            ]}
            items={ItemCameraData?.data}
        />
        <Pagination
            currentPage={ItemCameraData?.meta?.pagination?.page}
            pageCount={ItemCameraData?.meta?.pagination?.pageCount}
            onPageChange={(newPage) => ItemCameraData.setPage(newPage + 1)}
        />
        <div className='statusItem mt_20'>
            {StatusList?.data?.map((el, index) => (
                <span onClick={() => handelStatus(el)} key={index}
                      className={checkedList?.length ? `statusItem-isdisible statusItem-status ${el.id === currenName.id ? 'statusItem_bg-add' : ''}` : 'statusItem-status statusItem-disible'}><IconRender name={el.name}/>{el?.name}</span>
            ))}
        </div>
        <div className='mt_20'>
            {
                currenName?.id && returnForms(currenName?.id, {prisoners: checkedList, reason: currenName?.id}, clear, currenName)
            }
        </div>
        </>
};

export default ItemCamer;

