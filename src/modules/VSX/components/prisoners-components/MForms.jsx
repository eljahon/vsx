import React from "react";
import { FastField } from "formik";
import { useSelector } from "react-redux";
import { get } from "lodash";

import { userSelector } from "store/selectors";
import {useGetLanguage,} from "hooks";
import { constants, time, utils } from "services";

import {useTranslation} from "react-i18next";
import Containers from "containers";
import {
    Fields,
    Button,
    AvatarUpload,
} from "components";

export const MForms = (props) => {
    const {
        values,
        handleOverlayClose,
        onAddedNewRecord,
    } = props;
    const {t} = useTranslation()
    // console.log(get(values, 'responsibleUser.data.attributes.username'), isUpdate)
    const { getLanguageValue } = useGetLanguage();
    const user = useSelector(userSelector);
    return (
        <>
            <Containers.Form
                method={get(values, "id") ? "put" : "post"}
                url={get(values, "id") ? `/prisoners/${get(values, "id")}` : "/prisoners"}
                onSuccess={() => {
                }}
                fields={[
                    {
                        name: "passport",
                        validations: [{ type: "required" }],
                        value: get(values, 'passport'),
                        onSubmitValue: (value) => {
                            return value
                        },
                    },
                    {
                        name: "image",
                        validations: [{ type: "required" }],
                        value: get(values, 'image'),
                        onSubmitValue: (value) => {
                            return value
                        },
                    },
                    {
                        name: "birthdate",
                        validations: [{ type: "required" }],
                        value: get(values, 'birthdate'),
                        onSubmitValue: (value) => time.timeFormater(value, 'YYYY-MM-DD'),
                    },
                    {
                        name: "firstName",
                        validations: [{ type: "required" }],
                        value: get(values, 'firstName'),
                        onSubmitValue: (value) => value,
                    },
                    {
                        name: "sureName",
                        validations: [{ type: "required" }],
                        value: get(values, 'sureName'),
                        onSubmitValue: (value) => value,
                    },
                    {
                        name: "middleName",
                        validations: [{ type: "required" }],
                        value: get(values, 'middleName'),
                        onSubmitValue: (value) => value
                    },
                    {
                        name: "birthAddress",
                        validations: [{ type: "required" }],
                        value: get(values, 'birthAddress'),
                        onSubmitValue: (value) => value,
                    },
                    {
                        name: "livingAddress",
                        validations: [{ type: "required" }],
                        value: get(values, 'livingAddress'),
                        onSubmitValue: (value) => value,
                    },
                    {
                        name: "address",
                        validations: [{ type: "required" }],
                        value: get(values, 'address'),
                        onSubmitValue: (value) =>value,
                    },
                    {
                        name: "nationality",
                        validations: [{ type: "required" }],
                        value: get(values, 'nationality') ?? '',
                        onSubmitValue: (value) => value,
                    },
                    {
                        name: "citizenship",
                        validations: [{ type: "required" }],
                        value: get(values, 'citizenship') ?? '',
                        onSubmitValue: (value) => value,
                    },
                    {
                        name: "isInvalid",
                        validations: [{ type: "required" }],
                        value: get(values, 'isInvalid')?? false,
                        onSubmitValue: (value) => {
                            return value
                        },
                    },
                    {
                        name: "isLGBT",
                        validations: [{ type: "required" }],
                        value: `${get(values, 'isLGBT')}` ?? false,
                        onSubmitValue: (value) => {
                            if(value === "undefined"||"null") return false;
                            return value
                        }
                    },
                    {
                        name: "gender",

                        validations: [{ type: "required" }],
                        validationType: "object",
                        value:get(values, 'gender.data.id') ?  {label: get(values, 'gender.data.attributes.name'),value:get(values, 'gender.data.id')} : '',
                        onSubmitValue: (value) => {
                            return value.value
                        }
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
                    // {
                    //   name: "room",
                    //   validations: [{ type: "required" }],
                    //   value: get(values, 'room.id'),
                    //   onSubmitValue: (value) => {
                    //     console.log(value)
                    //     return get(value, 'id')
                    //   },
                    // },
                ]}
            >
                {({ isSubmitting }) => (
                    <>
                        <div className="row g-4">

                            <div className="col-10">
                                <div className="row g-4">
                                    <div className="col-4">
                                        <FastField
                                            name="birthdate"
                                            component={Fields.DatePicker}
                                            label={t('medical-date')+"*"}
                                            placeholder={t('medical-date')}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <FastField
                                            name="firstName"
                                            placeholder=''
                                            component={Fields.DatePicker}
                                            label={t('medical-time')+"*"}
                                            // placeholder="Исми"
                                        />
                                    </div>
                                    {/*sureName*/}
                                    <div className="col-4">
                                        <FastField
                                            name="responsibleUser"
                                            loadOptionsUrl={'/users'}
                                            component={Fields.AsyncSelect}
                                            loadOptionsKey={(data) => data?.map((el) => ({label: el.username, value:el.id}))}
                                            label={t('responsible-employees')}
                                            placeholder={t('responsible-employees')}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <FastField
                                            name="sureName"
                                            component={Fields.InputText}
                                            label={t('medical-staff')}
                                            placeholder={t('medical-staff')}
                                        />
                                    </div>
                                    {/*middlename*/}
                                    <div className="col-4">
                                        {/*<FastField*/}
                                        {/*    name="middleName"*/}
                                        {/*    component={Fields.InputText}*/}
                                        {/*    label="Отасининг исми *"*/}
                                        {/*    // placeholder="Отасининг исми"*/}
                                        {/*/>*/}
                                    </div>
                                    {/*birthAddress*/}
                                    <div className="col-4">
                                        {/*<FastField*/}
                                        {/*    name="birthAddress"*/}
                                        {/*    component={Fields.InputText}*/}
                                        {/*    label="Тугилган жойи"*/}
                                        {/*    // placeholder="Тугилган жойи"*/}
                                        {/*/>*/}
                                    </div>
                                    {/*address*/}
                                    <div className="col-2">
                                        <p className="mb_20">{t('Injuries')}</p>
                                        <div className="d-flex justify-content-between">
                                            <FastField
                                                name="Injuries"
                                                component={Fields.RadioButton}
                                                label="Ha"
                                            />
                                            <FastField
                                                name="Injuries"
                                                component={Fields.RadioButton}
                                                label="Yo'q"
                                            />
                                        </div>
                                    </div>
                                    {/*livingAddress*/}
                                    <div className="col-8">
                                        <FastField
                                            name="nationality"
                                            component={Fields.Textarea}
                                            label={t('additional-notes')}
                                            // placeholder="Исми"
                                        />
                                    </div>
                                    <div className='col-12'><h1>{t('to-search')}</h1></div>
                                    <div className="col-4">
                                        <FastField
                                            name="birthdate"
                                            component={Fields.DatePicker}
                                            label={t('to-search-date')+"*"}
                                            placeholder={t('to-search-date')}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <FastField
                                            name="firstName"
                                            placeholder=''
                                            component={Fields.DatePicker}
                                            label={t('to-search-time')}
                                            // placeholder="Исми"
                                        />
                                    </div>
                                    {/*sureName*/}
                                    <div className="col-4">
                                        <FastField
                                            name="responsibleUser"
                                            loadOptionsUrl={'/users'}
                                            component={Fields.AsyncSelect}
                                            loadOptionsKey={(data) => data?.map((el) => ({label: el.username, value:el.id}))}
                                            label={t('responsible-employees')}
                                            placeholder={t('responsible-employees')}
                                        />
                                    </div>
                                    <div className="col-2">
                                        <p className="mb_20">{t('available-items')}</p>
                                        <div className="d-flex justify-content-between">
                                            <FastField
                                                name="isLGBT"
                                                component={Fields.RadioButton}
                                                label="Ha"
                                            />
                                            <FastField
                                                name="isLGBT"
                                                component={Fields.RadioButton}
                                                label="Yo'q"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <FastField
                                            name="livingAddress"
                                            component={Fields.InputText}
                                            label={t('that-came')}
                                            // placeholder="Яшаш жойи"
                                        />
                                    </div>
                                    <div className="col-4">
                                        <FastField
                                            name="gender"
                                            component={Fields.InputText}
                                            label={''}
                                            // placeholder="Отасининг исми"
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>

                        <Button
                            design="primary"
                            type="submit"
                            className="modal-btn-end fz_16 btn mt_40"
                            text="Сохранить"
                            isLoading={isSubmitting}
                        />
                    </>
                )}
            </Containers.Form>
        </>
    );
};
