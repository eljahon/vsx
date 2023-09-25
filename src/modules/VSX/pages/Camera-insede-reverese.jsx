// import React from 'react';
//
// function CameraInsedeReverese(props) {
//     return (
//         <div>CameraReverese</div>
//     );
// }
//
// export default CameraInsedeReverese;

import React, {useEffect, useState} from "react";
import get from "lodash";
import {PageHeading, Table, Pagination, InputSearch, HeaderFilters, ConfirmModal, TabBase, Button} from "components";
import {useTranslation} from "react-i18next";
import {} from 'react-dom'
import {useDelete, useFetchList, useGetLanguage, useOverlay, useDeleteWithConfirm} from "hooks";
import { useNavigate, useParams } from "react-router-dom";
// import {formatters} from "../../../../services/utils";
// import {time} from '../../../../services/time'
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
import userimg from '../../../assets/images/user.png'
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
    const [filters, setFilters] = useState({
        start: '',
        end: '',
        search: '',
        region_id: null
    })
    // const removePrisonerModal = useOverlay({ uniqueName: "removePrisoner" });

    const StatusList = useFetchList({
        url: `/prisoner-room-leave-reasons`,
        urlSearchParams:{
            sort: {id: 'asc'}
        }
    });
    const [reason,setReason] = useState(StatusList?.data)
    const prisonerList = useFetchList({
        url: "/prisoners",
        urlSearchParams:{
            pageSize: 10,
            filters: {
                roomLeave:{reason: 1}
            }
        },

    });
    useEffect(() =>{} ,[StatusList.data])

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
    const remove = (id) => {
        prisonerDelete.setId(id);
        prisonerDelete.handleOverlayOpen();

    }
    let setItemsEmptiy;
    const handelchecked =  (items) => {
        setcheckedList(items)
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
                    handleTab(active)
                    setCurrentTabLabel(active.name)
                }}
            /> <br/>

            <Table
                emptyUiText={t('camera-list-emptey')}
                isLoading={prisonerList.isLoading}
                isCheckedSee
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
                        render: (value, item) => Avatar(item.image)
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
                        render: (value, items) => {
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
                items={prisonerList?.data}
            />
            {/*<span>salom</span>*/}
            {/*<span>{get(prisonerList, "meta.pagination.pageCount")}</span>*/}
            <Pagination
                currentPage={prisonerList?.meta?.pagination?.page}
                pageCount={prisonerList?.meta?.pagination?.pageCount}
                onPageChange={(newPage) => prisonerList.setPage(newPage + 1)}
            />
            <div className='d-flex justify-content-end mt_20'>
                <Button className='btn' design='greey' text={'Belgilanganlarni qaytarish'}/>
            </div>
        </>
    );
};

export default CameraInsedeReverese;


