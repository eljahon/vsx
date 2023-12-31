

import React, {useEffect, useState} from "react";
import get from "lodash";
import {PageHeading, Table, Pagination, InputSearch, HeaderFilters, ConfirmModal, TabBase, Button} from "components";
import {useTranslation} from "react-i18next";
import {} from 'react-dom'
import {useDelete, useFetchList, useGetLanguage, useOverlay, useDeleteWithConfirm} from "hooks";
import { useNavigate, useParams } from "react-router-dom";
import {Avatar,Span, IsInvalid,ActionDropDown} from '../../VSX/components/prisoners-components'
import {ReactComponent as User} from '../../../assets/icons/outsidedisibleuser.svg'
import {ReactComponent as Boshqa} from '../../../assets/icons/boshqa.svg'
import {ReactComponent as Advakat} from '../../../assets/icons/advakat.svg'
import {ReactComponent as Etap} from '../../../assets/icons/etap.svg'
import {ReactComponent as Ozodetish} from '../../../assets/icons/ozodetish.svg'
import {ReactComponent as MaxsusPalata} from '../../../assets/icons/maxsusPalata.svg'
import {ReactComponent as Tergovdisibel} from '../../../assets/icons/tergovdisibel.svg'
import {ReactComponent as Food} from '../../../assets/icons/outsidedisiblefood.svg'
import '../styles/prisoners.scss'
import {httpClient} from "../../../services";
import {PrisonersPlaceNow} from "../components/camera-compronents";
const iconRender =  (name) => {
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
    let Icon  = iconName[name]
    return <Icon/>
}
const CameraInsedeReverese = () => {
    const {t} = useTranslation()
    const navLink = useNavigate()
    const {region, id} = useParams()
    const { getLanguageValue } = useGetLanguage();
    const [checkedList , setcheckedList] = useState([])
    const userData = JSON.parse(localStorage.getItem('userData'))
    const [filters, setFilters] = useState({
        start: '',
        end: '',
        search: '',
        region_id: null
    })
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
    const StatusList = useFetchList({
        url: `/prisoner-room-leave-reasons`,
        urlSearchParams:{
            sort: {id: 'asc'},
            // filters:filter
        }
    });
    const [reason,setReason] = useState(1)
    const prisonerList = useFetchList({
        url: "/prisoners",
        urlSearchParams:{
            filters: {
                roomLeave:{reason:{id: reason}},
                room:{
                    ...filter
                }
            },
            populate: 'person, room, search, roomLeave, roomLeave.reason,basisDocument,basisDocumentPart, medExam'
        },

    });
    useEffect(() =>{} ,[StatusList.data])
    const [isHeaderChecked, setIsHeaderCheaked] = useState(false)
    const tabLabels =[StatusList?.data];
    const [currentLables, setCurrentTabLabel]= useState('Sayrga olib chiqish')
    const prisonerDelete = useDeleteWithConfirm({
        uniqueName: "removePrisonerModal",
        url: "/prisoners",

    });
    // let count =prisonerList?.meta?.pagination?.page;
    const handlaAction=  (items) => {
        tableCheckItemClick(items)

    }
    const handeleReversToRoom = async () => {
      try {
          const reversToRoomData = await httpClient.post('/prisoner/leave-room',{data: {prisoners:checkedList}})
          if(reversToRoomData) {
              prisonerList.refetch()
          }
          return  reversToRoomData
      } catch (err) {
          throw new Error(err)
      }
    }
    const remove = (id) => {
        prisonerDelete.setId(id);
        prisonerDelete.handleOverlayOpen();

    }
    const handelchecked = (items) => {
        // console.log(prisonerList.data);
        const prisoners = prisonerList.data
        if(items.isCheckedAll && items.id === 'all') {
            setIsHeaderCheaked(true)
            setcheckedList(prisoners.map(el=> el.id))
        }
        else if (!items.isCheckedAll && items.id === 'all') {
            setIsHeaderCheaked(false)
            setcheckedList([])
        }
        else if (items.isCheckedAll && items.id) {
            setcheckedList(old => [...old, items.id])
        }
        else if (!items.isCheckedAll && items.id) {
            setcheckedList(checkedList.filter(el => el !== items.id))
        }
        else {
            setIsHeaderCheaked(false)
            setcheckedList([])
        }


    }
    const handleTab =  (items) => {
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
    const regionList = useFetchList({url:'/regions'});
    const handelStatus =  (element) => {
        console.log(element)
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

                items={regionList?.data?.map((el) => ({id:el.id, name: el.name}))}
            />
            <InputSearch
                setValue={setFilters}
                text={t('prisoners-insede')}
            />
            <TabBase
                labels={StatusList?.data}
                className={'prisoner__tab__item'}
                currentLabel={currentLables}
                isObjeckt
                onPaneChange={(active,envt)=> {
                    console.log(active)
                    setReason(active.id)
                    setCurrentTabLabel(active.name)
                }}
            /> <br/>

            <Table
                emptyUiText={t('camera-list-emptey')}
                isLoading={prisonerList.isLoading}
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
                            // console.log(value, item, index)
                            return index+1
                        },
                    },
                    {
                        title: t('photo'),
                        dataKey: "attributes",
                        className: "white-space_no-wrap",
                        render: (value, item) => {
                            return Avatar(item.person.image)
                        }
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
                        title: t('camera'),
                        dataKey: "amount",
                        className: "white-space_no-wrap",
                        render: (value,items) => {
                            const _ = items?.room?.name ? items?.room?.name : '-'
                            return _;
                        }
                    },
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
                        render: (value,item) => item?.room?.name ?? '--',
                    },
                    {
                        title: t("where-is-now"),
                        dataKey: "camera",
                        render: (value, items, index) => {
                            return <PrisonersPlaceNow key={index+1} text={items.roomLeave.reason.name}/>
                        },
                    },
                    // {
                    //     title: t('action'),
                    //     dataKey: "expired_at",
                    //     className: "white-space_no-wrap",
                    //     render: (value, items) => <ActionDropDown setMethod={handlaAction}  itemdata={items}/>,
                    // },
                ]}
                items={prisonerList?.data?.length ? prisonerList.data : []}
            />
            {/*<span>salom</span>*/}
            {/*<span>{get(prisonerList, "meta.pagination.pageCount")}</span>*/}
            <Pagination
                currentPage={prisonerList?.meta?.pagination?.page}
                pageCount={prisonerList?.meta?.pagination?.pageCount}
                onPageChange={(newPage) => prisonerList.setPage(newPage + 1)}
            />
            <div className='d-flex justify-content-end mt_20'>
                <Button isDisabled={checkedList.length <= 0} onClick={handeleReversToRoom} className='btn' design='greey' text={'Belgilanganlarni qaytarish'}/>
            </div>
        </>
    );
};

export default CameraInsedeReverese;


