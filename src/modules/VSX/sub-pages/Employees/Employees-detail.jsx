import React, {useState} from "react";
import get from "lodash";
import {
    Avatar,
    Button,
    Pagination,
    TabBase,
    Table,
    Typography,
} from "../../../../components";
import "../../styles/prisoners.scss";
import {useTranslation} from "react-i18next";
import userAva from "../../../../assets/images/user.png";
import {
    ActionDropDown,
    IsInvalid,
    Span,
} from "../../components/prisoners-components";
import {time} from "../../../../services";
import {formatters} from "../../../../services/utils";
import {useFetchList, useOverlay} from "../../../../hooks";
import {useNavigate, useParams} from "react-router-dom";
import UserInfo from "../../components/components/userInfo";
import {PunishmentModal} from "../../components/employees-components/punishmentModal"
import {MeasuresModal} from "../../components/employees-components/measuresModal"
const EmployeesDetail= () => {
    const {t} = useTranslation();
    const tabLabels = [
        t("prisoner-data"),
        t("search-medical"),
        t("visitor-history"),
        t("documents-type"),
    ];
    const navLink = useNavigate();
    const {region, id} = useParams();
    const punishmentModal = useOverlay({ uniqueName: "punishmentModal" });
    const measuresModal = useOverlay({ uniqueName: "measuresModal" });
    const [currentLables, setLables] = useState(tabLabels[0]);
    const {data, isLoading, meta, refetch} = useFetchList({
        url: `/users/${id}`,
        urlSearchParams: {
            pageSize: 10,
            populate: "*",
        },

    });
    const tabBtnList = [
        {
            text: t("measures"),
            class: "prisoner__item__btn",
            icon: false,
            id: 1
        },
        {
            text: t("disciplinary-measures"),
            class: "prisoner__item__btn",
            icon: false,
            id: 2
        },
        {
            text: t("edit"),
            class: "prisoner__item__btn bg-edit",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 20 20"
                    fill="none"
                >
                    <path
                        d="M11.7167 7.51667L12.4833 8.28333L4.93333 15.8333H4.16667V15.0667L11.7167 7.51667ZM14.7167 2.5C14.5083 2.5 14.2917 2.58333 14.1333 2.74167L12.6083 4.26667L15.7333 7.39167L17.2583 5.86667C17.5833 5.54167 17.5833 5.01667 17.2583 4.69167L15.3083 2.74167C15.1417 2.575 14.9333 2.5 14.7167 2.5ZM11.7167 5.15833L2.5 14.375V17.5H5.625L14.8417 8.28333L11.7167 5.15833Z"
                        fill="black"
                    />
                </svg>
            ),
            id: 3
        },
        {
            text: t("remove"),
            class: "prisoner__item__btn bg-red",
            icon: false,
            id: 4
        },
    ];
     const handleButton = (item) => {
       switch (item) {
           case 1: return measuresModal.handleOverlayOpen() ;
           case 2: return  punishmentModal.handleOverlayOpen();
           case 3: return   ;
           case 4: return ;
       }
     }
    return (
        <div>
            <MeasuresModal
                isOpen={measuresModal.isOverlayOpen}
                handleOverlayOpen={measuresModal.handleOverlayOpen}
                handleOverlayClose={measuresModal.handleOverlayClose}
                onSuccess={refetch}/>
            <div className="prisoner__item">
                <div className="prisoner__header">
                    <PunishmentModal
                        isOpen={punishmentModal.isOverlayOpen}
                        handleModalClose={punishmentModal.handleOverlayClose}
                        handleOverlayOpen={punishmentModal.handleOverlayOpen}
                        onSuccess={refetch}/>
                    <div className="sidebar__admin d-flex align-items-center justify-content-between">
                        <div className="prisoner__data">
                            <Avatar
                                size="md"
                                borderColor="white"
                                className="mr_10"
                                src={userAva}
                            />
                            <div className="sidebar__admin-info">
                                <Typography Type="p" className="sidebar__role" text={t("position")}/>
                                <Typography
                                    Type="h4"
                                    className="prisoner__name"
                                    append={IsInvalid(true)}
                                    text={
                                        data?.data?.person?.firstName + " " + data?.data?.person?.sureName
                                    }
                                ></Typography>
                                <Typography
                                    Type="p"
                                    className="prisoner__pnfl "
                                    text={`${t("added")}: ${
                                        data?.data?.person?.createdAt?.split("T")[0]
                                    } ${data?.data?.person?.createdAt?.split("T")[1].split(".")[0]}`}
                                />
                            </div>
                        </div>
                        <div className="prisoner__btn__wrapper">
                            {tabBtnList.map((el, index) => (
                                <Button
                                    key={index}
                                    onClick={(event) => handleButton(el.id)}
                                    prepend={el.icon}
                                    text={el.text}
                                    className={el.class}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="prisoner__tab__wrapper">
                        <TabBase
                            labels={tabLabels}
                            currentLabel={currentLables}
                            className={"prisoner__tab__item"}
                            onPaneChange={(event) => setLables(event)}
                        />{" "}
                        <br/>
                        <div
                            className={
                                currentLables === t("prisoner-data")
                                    ? "row"
                                    : currentLables === t("documents-type")
                                        ? "row"
                                        : ""
                            }
                        >
                            {currentLables === t("prisoner-data") &&
                                [1].map((el,index) =>
                                    <UserInfoF key={index} data={{id: data?.data?.id, ...data?.data}}/>
                                )}
                        </div>
                        {currentLables === t("visitor-history") && (
                            <>
                                <Table
                                    emptyUiText={t("empty")}
                                    isLoading={isLoading}
                                    columns={[
                                        {
                                            title: t("number"),
                                            dataKey: "id",
                                            render: (value, item) => {
                                                return 1;
                                            },
                                        },
                                        {
                                            title: t("photo"),
                                            dataKey: "attributes",
                                            className: "white-space_no-wrap",
                                            render: (value, item) => Avatar(item.attributes.image),
                                            // time?.timeFormater(item?.attributes?.createdAt, "DD.MM.YYYY"),
                                        },
                                        {
                                            title: t("fullName"),
                                            className: "white-space_no-wrap",
                                            dataKey: "attributes.sureName",
                                            render: (value, item) => {
                                                return Span(item.attributes);
                                            },
                                        },
                                        {
                                            title: t("birthdate"),
                                            dataKey: "amount",
                                            className: "white-space_no-wrap",
                                            render: (value, items) =>
                                                time.timeFormater(
                                                    items.attributes.birthdate,
                                                    "DD.MM.YYYY"
                                                ),
                                        },
                                        {
                                            title: t("passport"),
                                            dataKey: "currency",
                                            render: (value, items) => items.attributes.passport,
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
                                            title: t("isInvalid"),
                                            dataKey: "user",
                                            render: (value, item) =>
                                                IsInvalid(item.attributes.isInvalid),
                                        },
                                        {
                                            title: t("camera"),
                                            dataKey: "camera",
                                            render: (value, items) => {
                                                // console.log(value,items)
                                                // formatters.showDegree(value)
                                                return items.attributes?.room?.data?.attributes?.name;
                                            },
                                        },
                                        {
                                            title: t("action"),
                                            dataKey: "expired_at",
                                            className: "white-space_no-wrap",
                                            render: (value, items) => (
                                                <ActionDropDown
                                                    setMethod={handlaAction}
                                                    itemdata={items}
                                                />
                                            ),
                                        },
                                    ]}
                                    items={data}
                                />
                                <Pagination
                                    currentPage={meta?.pagination?.page}
                                    pageCount={meta?.pagination?.pageCount}
                                    onPageChange={(newPage) => setPage(newPage + 1)}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
function UserInfoF(data) {
    return (
        <div className="col-3 col-md-6 col-sm-12 col-xl-4">
            <UserInfo key={data.id} item={data}/>
        </div>
    );
}

export default EmployeesDetail;
