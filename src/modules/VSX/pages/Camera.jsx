import React from "react";
import get from "lodash";
import {
  PageHeading,
  ConfirmModal,
} from "components";
import {
  useDeleteWithConfirm,
  useFetchList,
  useGetLanguage,
  useOverlay,
} from "hooks";
import { AddRoomsModal, DrogDrop } from "../components/camera-compronents";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const Prisoners = () => {
  const { getLanguageValue } = useGetLanguage();
  const navLink = useNavigate();
  const { region } = useParams();
  const addRooms = useOverlay({ uniqueName: "addRooms" });
  const { t } = useTranslation();
  const removeRoomModal = useDeleteWithConfirm({
    uniqueName: "removeRoomModal",
    url: "/rooms",
  });
  // console.log(cameraList)
  const cameraList = useFetchList({
    url: "/rooms",
    urlSearchParams: {
      sort: { id: "desc" },
        // filters: {
        //     prisoners: {
        //         isLeftRoom: false
        //     }
        // },
        populate: "prisoners, prisoners.person"
    },
  });
  const handaleRouter = (itemId) => {
    navLink(`/${region}/cameras/${itemId}`);
  };
  const removeRoom = (item) => {
    removeRoomModal.setId(item.id);
    removeRoomModal.handleOverlayOpen();
  };
  return (
    <>
      <AddRoomsModal
        isOpen={addRooms.isOverlayOpen}
        handleModalClose={addRooms.handleOverlayClose}
        onSuccess={cameraList.refetch}
      />
      <ConfirmModal
        isOpen={removeRoomModal.isOverlayOpen}
        cancelAction={removeRoomModal.handleOverlayClose}
        successAction={() => {
          removeRoomModal
            .mutateAsync(removeRoomModal.id)
            .then(() => cameraList.refetch());
          removeRoomModal.handleOverlayClose();
        }}
      />
      <PageHeading
        links={[
          { link: "/", label: "Bosh sahifa" },
          { link: "/", label: "Toshkent" },
          { label: "Shaxslarni ro'yxatga olish" },
        ]}
        title={t("camera-add")}
        mainAction={() => {
          addRooms.handleOverlayOpen();
        }}
        btnText={t("camera-add")}
      />
      <DrogDrop
        routerPush={handaleRouter}
        draggable={true}
        boardItemRemove={removeRoom}
        boardItemUpdata={(item) => {}}
        boardsList={cameraList?.data}
        refetch={cameraList.refetch}
      />
    </>
  );
};

export default Prisoners;
