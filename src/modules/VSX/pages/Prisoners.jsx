import React, {useState} from "react";
import get from "lodash";
import {PageHeading, Table, Pagination, InputSearch, HeaderFilters, ConfirmModal} from "components";
import {useTranslation} from "react-i18next";
import {} from 'react-dom'
import {useDelete, useFetchList, useGetLanguage, useOverlay, useDeleteWithConfirm} from "hooks";
import { useNavigate, useParams } from "react-router-dom";
import {formatters} from "../../../services/utils";
import {time} from '../../../services/time'
import {Avatar,Span, IsInvalid,ActionDropDown} from '../components/prisoners-components'
import '../styles/prisoners.scss'
import userimg from '../../../assets/images/user.png'

const Prisoners = () => {
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
      let count =0;
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
    const remove = (id) => {
        prisonerDelete.setId(id);
        prisonerDelete.handleOverlayOpen();

    }
const tableCheckItemClick = (item) =>{
    const {actionType, itemdata} = item;
    switch (actionType) {
        case 'see': return navLink(`/${region}/prisoner/detail/${itemdata.id}`);
        case 'updata': return navLink(`/${region}/prisoner/${itemdata.id}`)
        case 'delete': return remove(itemdata.id)
    }
}
  //   const prisonerList = fetchPrisonersList({pagination:{page:1, pageSize:10}})
    // console.log(prisonerList)
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
      {/*    prisonerList.refetch();*/}
      {/*  }}*/}
      {/*/>*/}
        <ConfirmModal
            isOpen={prisonerDelete.isOverlayOpen}
            cancelAction={prisonerDelete.handleOverlayClose}
            successAction={() => {
                prisonerDelete.mutateAsync(prisonerDelete.id).then(() => prisonerList.refetch());
                prisonerDelete.handleOverlayClose();
            }}
        />
        <HeaderFilters
            setFieldValue={setFilters}
            items={regionList?.data?.map((el) => ({id:el.id, name: el.attributes.name}))}
        />
        <InputSearch
            setValue={setFilters}
            text={t('prisoners-list-get')}
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
        emptyUiText="Afsuski hozirda shaxslarni ro'yxatga olish bo'yicha ma'lumot yo'q"
        isLoading={prisonerList.isLoading}
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
        items={prisonerList.data}
      />
{/*<span>salom</span>*/}
        <span>{get(prisonerList, "meta.pagination.pageCount")}</span>
       <Pagination
        currentPage={prisonerList?.meta?.pagination?.page}
        pageCount={prisonerList?.meta?.pagination?.pageCount}
        onPageChange={(newPage) => prisonerList.setPage(newPage + 1)}
      />
    </>
  );
};

export default Prisoners;
