import React from "react";
import { FastField } from "formik";
import { get } from "lodash";

import { time, utils } from "services";

import Containers from "containers";
import {ModalDefault, Fields, Button, Typography, FileUpload} from "components";
import {useTranslation} from "react-i18next";

export const AddRoomsModal = ({ isOpen, handleModalClose, onSuccess,values }) => {
const {t } = useTranslation()
    return (
        <ModalDefault
            isOpen={isOpen}
            handleModalClose={handleModalClose}
            title={t('room-add')}
            innerClass="max-width_500"
        >
            <Containers.Form
                url="/rooms"
                method={'post'}
                onSuccess={() => {
                    handleModalClose();
                    onSuccess()
                }}
                fields={[
                    {
                        name: "name",
                        validations: [{ type: "required" }],
                        onSubmitValue: (value) => {
                            return value
                        },
                    },   {
                        name: "capacity",
                        validations: [{ type: "required" }],
                        onSubmitValue: (value) => {
                            return value
                        },
                    },
                    {
                        name: "freePlace",
                        validations: [{ type: "required" }],
                        onSubmitValue: (value) => {
                            return value
                        },
                    },
                    // {
                    //     name: "prisoners",
                    //     validations: [{ type: "required" }],
                    //     validationType: 'array',
                    //     onSubmitValue: (value) => {
                    //         const _items =[]
                    //             value.forEach(el => {
                    //                 _items.push(el.value)
                    //             })
                    //         return _items
                    //     },
                    // },
                    {
                        name: "vsx",
                        validations: [{ type: "required" }],
                        validationType: "object",
                        // value:get(values, 'responsibleUser.data.id') ?  {label: get(values, 'responsibleUser.data.attributes.username'),value:get(values, 'responsibleUser.data.id')} : '',
                        onSubmitValue: (value) => {
                            // console.log(value)
                            return value.value
                        },
                    },
                    {
                        name: "responsibleUser",
                        validations: [{ type: "required" }],
                        validationType: "object",
                        value:get(values, 'responsibleUser.data.id') ?  {label: get(values, 'responsibleUser.data.attributes.username'),value:get(values, 'responsibleUser.data.id')} : '',
                        onSubmitValue: (value) => {
                            return  value.value
                        }
                    },
                ]}
            >
                {({ isSubmitting }) => (
                    <>
                        <div className="row g-4">
                            <div className="col-6">
                                <FastField
                                    name="name"
                                    component={Fields.InputText}
                                    label={t('room-name')}
                                    placeholder="room-name"
                                />
                            </div>
                            <div className="col-6">
                                <FastField
                                    name="capacity"
                                    component={Fields.InputText}
                                    label={t('capacity')}
                                    placeholder={t('capacity')}
                                />
                            </div>
                            <div className="col-6">
                                <FastField
                                    name="freePlace"
                                    component={Fields.InputText}
                                    label={t('freePlace')}
                                    placeholder={t('freePlace')}
                                />
                            </div>
                            <div className="col-6">
                                <FastField
                                    name="vsx"
                                    component={Fields.AsyncSelect}
                                    loadOptionsUrl={'/vsxes'}
                                    loadOptionsKey={(data) => data?.data?.map((el) => ({label: el.attributes.name, value:el.id}))}
                                    label="vsx"
                                />
                            </div>
                            <div className="col-6">
                                <FastField
                                    name="responsibleUser"
                                    loadOptionsUrl={'/users'}
                                    component={Fields.AsyncSelect}
                                    loadOptionsKey={(data) => data?.map((el) => ({label: el.username, value:el.id}))}
                                    label={t('responsible-employees')}
                                    placeholder={t('responsible-employees')}
                                />
                            </div>
                            {/*<div className="col-6">*/}
                            {/*    <FastField*/}
                            {/*        name="prisoners"*/}
                            {/*        loadOptionsUrl={'/prisoners'}*/}
                            {/*        component={Fields.AsyncSelect}*/}
                            {/*        isMulti={true}*/}
                            {/*        loadOptionsKey={(data) => {*/}
                            {/*            // console.log(data)*/}
                            {/*            return data.data?.map((el) => ({label: el.attributes.sureName+" " +el.attributes.firstName, value:el.id}))*/}
                            {/*        }}*/}
                            {/*        label={t('prisoners')}*/}
                            {/*        placeholder={t('prisoners')}*/}
                            {/*    />*/}
                            {/*</div>*/}
                            {/*<div className="col-12">*/}
                            {/*    <FastField*/}
                            {/*        name="files"*/}
                            {/*        component={FileUpload}*/}
                            {/*        title="Viloyat rasmi"*/}
                            {/*    />*/}
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
