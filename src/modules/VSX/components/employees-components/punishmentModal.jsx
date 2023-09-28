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
import {useTranslation} from "react-i18next";

export const PunishmentModal= ({
                                   isOpen,
                                   handleOverlayClose,
                                   values,refetch
                               }) => {
    const {t} = useTranslation()
    return (
        <ModalDefault
            isOpen={isOpen}
            handleModalClose={handleOverlayClose}
            title={t('punishments')}
            innerClass="max-width_500"
        >
            <Containers.Form
                method={'post'}
                url="/users-permissions/make-officer"
                onSuccess={() => {
                    handleOverlayClose();
                    refetch()
                }}
                fields={[

                    {
                        name: "vsxes",
                        // validations: [{ type: "required" }],
                        // validationType: "object",
                        // value:get(values, 'responsibleUser.data.id') ?  {label: get(values, 'responsibleUser.data.attributes.username'),value:get(values, 'responsibleUser.data.id')} : '',
                        onSubmitValue: (value) => {
                            // console.log(value)
                            return value.value
                        },
                    },
                    {
                        name: "role",
                        // validations: [{ type: "required" }],
                        validationType: "object",
                        // value:get(values, 'responsibleUser.data.id') ?  {label: get(values, 'responsibleUser.data.attributes.username'),value:get(values, 'responsibleUser.data.id')} : '',
                        onSubmitValue: (value) => {
                            return value.value
                        },
                    },
                    {
                        name: "region",
                        // validations: [{ type: "required" }],
                        validationType: "object",
                        // value:get(values, 'responsibleUser.data.id') ?  {label: get(values, 'responsibleUser.data.attributes.username'),value:get(values, 'responsibleUser.data.id')} : '',
                        onSubmitValue: (value) => {
                            return value.value
                        },
                    },
                    {
                        name: "vsx",
                        // validations: [{ type: "required" }],
                        validationType: "object",
                        // value:get(values, 'responsibleUser.data.id') ?  {label: get(values, 'responsibleUser.data.attributes.username'),value:get(values, 'responsibleUser.data.id')} : '',
                        onSubmitValue: (value) => {
                            return value.value
                        },
                    },
                    {
                        name: "login",
                        validations: [{ type: "required" }],
                        // value:get(values, 'responsibleUser.data.id') ?  {label: get(values, 'responsibleUser.data.attributes.username'),value:get(values, 'responsibleUser.data.id')} : '',
                        onSubmitValue: (value) => {
                            return value
                        },
                    },
                    {
                        name: "password",
                        validations: [{ type: "required" }],
                        // value:get(values, 'responsibleUser.data.id') ?  {label: get(values, 'responsibleUser.data.attributes.username'),value:get(values, 'responsibleUser.data.id')} : '',
                        onSubmitValue: (value) => {
                            return value
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
                {({ isSubmitting,values, ...rest}) =>{
                    console.log(rest)
                    return   <>
                        <div className="row g-4">
                            {
                                localStorage.getItem('roleName') !== 'vsxmanager'&&
                                <div className="col-12 col-md-12 col-lg-6 col-xl-6 col-sm-12">
                                    <FastField
                                        name="role"
                                        component={Fields.AsyncSelect}
                                        loadOptionsUrl={'/users-permissions/get-user-roles'}
                                        loadOptionsKey={(data) => {
                                            console.log(data)
                                            return data?.allowedRoles?.map((el) => ({label: t(el.name), value:el.id, keys:el.keys}))
                                        }}
                                        label={t('role')}
                                    />
                                </div>
                            }

                            {values?.role?.keys?.includes('region')&&<div className="col-12 col-md-12 col-lg-6 col-xl-6 col-sm-12">
                                <FastField
                                    name="region"
                                    component={Fields.AsyncSelect}
                                    loadOptionsUrl={'/regions'}
                                    loadOptionsKey={(data) => data?.data?.map((el) => ({label: el.name, value: el.id}))}
                                    label={t('region')}
                                />
                            </div>}

                            {values?.role?.keys?.includes('vsx')&&<div className="col-12 col-md-12 col-lg-6 col-xl-6 col-sm-12">
                                <FastField
                                    name="vsx"
                                    component={Fields.AsyncSelect}
                                    loadOptionsUrl={'/vsxes'}
                                    loadOptionsKey={(data) => data?.data?.map((el) => ({label: el.name, value:el.id}))}
                                    label={t('vsx')}
                                />
                            </div>}
                            <div className="col-12 col-md-12 col-lg-6 col-xl-6 col-sm-12">
                                <FastField
                                    name="login"
                                    component={Fields.InputText}
                                    label={t('login')}
                                    placeholder={t('login')}
                                />
                            </div>
                            <div className="col-12 col-md-12 col-lg-6 col-xl-6 col-sm-12">
                                <FastField
                                    name="password"
                                    component={Fields.InputText}
                                    label={t('password')}
                                    placeholder={t('password')}
                                />
                            </div>
                        </div>

                        <Button
                            design="primary"
                            type="submit"
                            className="modal-btn fz_16 btn mt_40"
                            text="Сохранить"
                            isLoading={isSubmitting}
                        />
                    </>
                }}
            </Containers.Form>
        </ModalDefault>
    );
};
