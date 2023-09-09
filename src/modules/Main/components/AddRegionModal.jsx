import React from "react";
import { FastField } from "formik";
import { get } from "lodash";

import Containers from "containers";
import {
  ModalDefault,
  Fields,
  Button,
  FileUpload,
  AvatarUpload,
} from "components";
import { UploadBase } from "components/Upload/UploadBase";

export const AddRegionModal = ({
  isOpen,
  handleOverlayClose,
  handleOverlayOpen,
    values,refetch
}) => {
  return (
    <ModalDefault
      isOpen={isOpen}
      handleModalClose={handleOverlayClose}
      title="Viloyat qo'shish"
      innerClass="max-width_500"
    >
      <Containers.Form
        url="/regions"
        onSuccess={() => {
          handleOverlayClose();
          refetch()
        }}
        fields={[
          {
            name: "name",
            // validationType: "string",
            validations: [{ type: "required" }],
            onSubmitValue: (value) => {
              return value
            },
          },
          // {
          //   name: "files ",
          //   // validationType: "string",
          //   // validations: [{ type: "required" }],
          //   onSubmitValue: (value) => get(value, "img"),
          // },
          {
            name: "vsxes",
            validations: [{ type: "required" }],
            validationType: "object",
            // value:get(values, 'responsibleUser.data.id') ?  {label: get(values, 'responsibleUser.data.attributes.username'),value:get(values, 'responsibleUser.data.id')} : '',
            onSubmitValue: (value) => {
              // console.log(value)
              return value.value
            },
          },
          // {
          //   name: "vsxes",
          //   validations: [{ type: "required" }],
          //   // validationType: "object",
          //   // value:get(values, 'responsibleUser.data.id') ?  {label: get(values, 'responsibleUser.data.attributes.username'),value:get(values, 'responsibleUser.data.id')} : '',
          //   onSubmitValue: (value) => {
          //     // console.log(value)
          //     return value.value
          //   },
          // },
        ]}
      >
        {({ isSubmitting }) => (
          <>
            <div className="row g-4">
              <div className="col-12">
                <FastField
                  name="name"
                  component={Fields.InputText}
                  label="Viloyat nomi"
                  placeholder="Viloyat nomi"
                />
              </div>
              <div className="col-12">
                <FastField
                    name="vsxes"
                    component={Fields.AsyncSelect}
                    loadOptionsUrl={'/vsxes'}
                    loadOptionsKey={(data) => data?.data?.map((el) => ({label: el.attributes.name, value:el.id}))}
                    label="vsx"
                />
              </div>
              {/*<div className="col-12">*/}
              {/*  <FastField*/}
              {/*    name="files"*/}
              {/*    component={FileUpload}*/}
              {/*    title="Viloyat rasmi"*/}
              {/*  />*/}
              {/*</div>*/}

            </div>

            <Button
              design="primary"
              type="submit"
              className="modal-btn fz_16 btn mt_40"
              text="Сохранить"
              isLoading={isSubmitting}
            />
          </>
        )}
      </Containers.Form>
    </ModalDefault>
  );
};
