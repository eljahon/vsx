import React, {useState} from "react";
import {PageHeading, Table, Pagination, InputSearch, HeaderFilters, ConfirmModal} from "components";
import {useTranslation} from "react-i18next";
import {useFetchList, useGetLanguage, useOverlay, useDeleteWithConfirm} from "hooks";
import { useNavigate, useParams } from "react-router-dom";
import {time} from '../../../services/time'
import {Avatar,Span, IsInvalid} from '../components/prisoners-components'
import '../styles/prisoners.scss'
const Prisoners = () => {
      const {t} = useTranslation()
      const navLink = useNavigate()
      const {region} = useParams()
      const { getLanguageValue } = useGetLanguage();
      const [checkedList , setcheckedList] = useState([])
      const [filters, setFilters] = useState({
          start: '',
          end: '',
          search: '',
          region_id: null
      })
  const removePrisonerModal = useOverlay({ uniqueName: "removePrisoner" });
  const prisonerList = useFetchList({
    url: "/prisoners",
      urlSearchParams:{
        pageSize: 10,
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
                prisonerDelete.mutateAsync(prisonerDelete.id).then(() => prisonerList.refetch());
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
            text={t('inspection')}
        />
      <PageHeading
        links={[
          { link: "/", label: "Bosh sahifa" },
          { link: "/", label: "Toshkent" },
          { label: "Shaxslarni ro'yxatga olish" },
        ]}
        title={t("prisoner-list-add")}
        mainAction={() => navLink(`/${region}/prisoner/create`)}
        btnText={t("prisoner-list-add")}
      />

      <Table
          emptyUiText={t('prisoner-list-emptey')}
        isLoading={prisonerList.isLoading}
        setChecked={handelchecked}
        editAction={(row) => {navLink(`/${region}/prisoner/${row.id}`)}}
        deleteAction={remove}
        seeAction={(row) => { navLink(`/${region}/prisoner/detail/${row.id}`)}}
        columns={[
            {
                title: t('number'),
                dataKey: "id",
                render: (value, item) => {
                    return ++count;
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
            dataKey: "sureName",
            render: (value, item) =>
            {
                return Span(item)
            }
          },
          {
            title: t('birthdate'),
            dataKey: "amount",
            className: "white-space_no-wrap",
            render: (value,items) => time.timeFormater(items.birthdate, "DD.MM.YYYY"),
          },
          {
            title: t("passport"),
            dataKey: "currency",
            render: (value,items) => items?.person?.passport,
          },
          {
            title: t("to-account"),
            dataKey: "patient",
            className: "white-space_no-wrap",
            render: (value, item) => item?.basisDocumentPart?.name
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
                render: (value,item) => IsInvalid(item?.person?.isInvalid),
            },
          {
            title: t("camera"),
            dataKey: "camera",
            render: (value, items) => {
                // console.log(value,items)
                // formatters.showDegree(value)
                return items?.room?.name
            },
          },
          // {
          //   title: t('action'),
          //   dataKey: "expired_at",
          //   className: "white-space_no-wrap",
          //   render: (value, items) => <ActionDropDown setMethod={handlaAction}  itemdata={items}/>,
          // },
        ]}
        items={prisonerList.data}
      />
{/*<span>salom</span>*/}
{/*        <span>{get(prisonerList, "meta.pagination.pageCount")}</span>*/}
       <Pagination
        currentPage={prisonerList?.meta?.pagination?.page}
        pageCount={prisonerList?.meta?.pagination?.pageCount}
        onPageChange={(newPage) => prisonerList.setPage(newPage + 1)}
      />
    </>
  );
};

export default Prisoners;
