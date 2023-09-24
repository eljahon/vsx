import React, {useState} from "react";
import { FastField } from "formik";
import { useSelector } from "react-redux";
import { get } from "lodash";

import { userSelector } from "store/selectors";
import {useGetLanguage,} from "hooks";
import { constants, time, utils } from "services";


import Containers from "containers";
import {
    Fields,
    Button,
    AvatarUpload,
} from "components";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const EForms = (props) => {
    const {
        valuesList,
        handleOverlayClose,
        onAddedNewRecord,
    } = props;
    const { getLanguageValue } = useGetLanguage();
    const [fields, setFields] = useState(
        [
            {
                name: "passport",
                validations: [{ type: "required" }],
                value: get(valuesList, 'passport'),
                onSubmitValue: (value) => {
                    return value
                },
            },
            {
                name: "image",
                value: get(valuesList, 'image'),
                onSubmitValue: (value) => {
                    return value
                },
            },
            {
                name: "birthdate",
                validations: [{ type: "required" }],
                value: get(valuesList, 'birthdate'),
                onSubmitValue: (value) => time.timeFormater(value, 'YYYY-MM-DD'),
            },
            {
                name: "fullName",
                validations: [{ type: "required" }],
                value: get(valuesList, 'fullName'),
                onSubmitValue: (value) => value,
            },
            {
                name: "password",
                validations: [{ type: "required" }],
                value: get(valuesList, 'password'),
                onSubmitValue: (value) => value,
            },{
                name: "confirmPassword",
                validations: [{ type: "required" }],
                value: get(valuesList, 'confirmPassword'),
                onSubmitValue: (value) => value,
            },
            {
                name: "phone",
                validations: [{ type: "required" }],
                value: get(valuesList, 'phone'),
                onSubmitValue: (value) => value,
            },
            {
                name: "login",
                validations: [{ type: "required" }],
                value: get(valuesList, 'login'),
                onSubmitValue: (value) => value
            },
            {
                name: "homePhone",
                validations: [{ type: "required" }],
                value: get(valuesList, 'login'),
                onSubmitValue: (value) => value
            }, {
                name: "fromServiceCame",
                validations: [{ type: "required" }],
                value: get(valuesList, 'login'),
                onSubmitValue: (value) => value
            },
            {
                name: "birthAddress",
                validations: [{ type: "required" }],
                value: get(valuesList, 'birthAddress'),
                onSubmitValue: (value) => value,
            },
            {
                name: "livingAddress",
                validations: [{ type: "required" }],
                value: get(valuesList, 'livingAddress'),
                onSubmitValue: (value) => value,
            },
            {
                name: "address",
                validations: [{ type: "required" }],
                value: get(valuesList, 'address'),
                onSubmitValue: (value) =>value,
            },
            {
                name: "nationality",
                validations: [{ type: "required" }],
                value: get(valuesList, 'nationality') ?? '',
                onSubmitValue: (value) => value,
            },
            {
                name: "citizenship",
                validations: [{ type: "required" }],
                value: get(valuesList, 'citizenship') ?? '',
                onSubmitValue: (value) => value,
            },
            {
                name: "isInvalid",
                validations: [{ type: "required" }],
                value: get(valuesList, 'isInvalid')?? false,
                onSubmitValue: (value) => {
                    return value
                },
            },{
            name: "familyStatus",
            validations: [{ type: "required" }],
            validationType: "object",
            value: get(valuesList, 'familyStatus')?? false,
            onSubmitValue: (value) => {
                return value
            },
        },
            {
                name: "personalCar",
                validations: [{ type: "required" }],
                value: `${get(valuesList, 'personalCar')}` ?? false,
                onSubmitValue: (value) => {
                    // console.log(value)
                    const _item = value === 'yes' ? true :  false
                    return _item;
                }
            },
            {
                name: "gender",
                validations: [{ type: "required" }],
                validationType: "object",
                value:get(valuesList, 'gender.data.id') ?  {label: get(valuesList, 'gender.data.attributes.name'),value:get(valuesList, 'gender.data.id')} : '',
                onSubmitValue: (value) => {
                    return value.value
                }
            },

            {
                name: "responsibleUser",
                validations: [{ type: "required" }],
                validationType: "object",
                value:get(valuesList, 'responsibleUser.data.id') ?  {label: get(valuesList, 'responsibleUser.data.attributes.username'),value:get(valuesList, 'responsibleUser.data.id')} : '',
                onSubmitValue: (value) => {
                    return  value.value
                }
            },
        ]
    )
    const user = useSelector(userSelector);
    const navLink = useNavigate()
    const {region}= useParams();
    const {t} = useTranslation()
    return (
        <>
            <Containers.Form
                method={get(valuesList, "id") ? "put" : "post"}
                url={get(valuesList, "id") ? `/users/${get(valuesList, "id")}` : "/users"}
                onSuccess={({data}) =>{
                     navLink(-1)
                } }
                fields={fields}
            >
                {({ isSubmitting,values }) => {
                    return <>
                        <div className="row g-4">
                            <div className="col-2">
                                <FastField
                                    name="image"
                                    component={AvatarUpload}
                                    className="avatar-upload"
                                />
                            </div>
                            <div className="col-10">
                                <div className="row g-4">
                                    {/*passport*/}
                                    <div className="col-4">
                                        <FastField
                                            name="passport"
                                            component={Fields.InputText}
                                            label={t('series-number-passport')}
                                            placeholder={t('series-number-passport')}
                                            required
                                        />
                                    </div>
                                    {/*birthdate*/}
                                    <div className="col-4">
                                        <FastField
                                            name="birthdate"
                                            component={Fields.DatePicker}
                                            label={t('birthdate')+"*"}
                                            prepend=""
                                            placeholder={t('birthdate')+"*"}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <Button
                                            className="btn btn-primary mt_20"
                                            design="primary"
                                            style={{ width: "100%" }}
                                            text={t('search')}
                                        />
                                    </div>
                                    {/*firstname*/}
                                    <div className="col-4">
                                        <FastField
                                            name="fullName"
                                            component={Fields.InputText}
                                            label={t('fullName')}
                                            placeholder={t('fullName')}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <FastField
                                            name="birthAddress"
                                            component={Fields.InputText}
                                            label={t('birthAddress')}
                                            placeholder={t('birthAddress')}
                                        />
                                    </div>
                                    {/*address*/}
                                    <div className="col-4">
                                        <FastField
                                            name="address"
                                            component={Fields.InputText}
                                            label={t('address')}
                                            placeholder={t('address')}
                                        />
                                    </div>
                                    {/*livingAddress*/}
                                    <div className="col-4">
                                        <FastField
                                            name="livingAddress"
                                            component={Fields.InputText}
                                            label={t('livingAddress')}
                                            placeholder={t('livingAddress')}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <FastField
                                            name="nationality"
                                            component={Fields.InputText}
                                            label={t('nationality')}
                                            placeholder={t('nationality')}
                                        />
                                    </div>
                                    {/*citizenship*/}
                                    <div className="col-4">
                                        <FastField
                                            name="citizenship"
                                            component={Fields.InputText}
                                            label={t('citizenship')}
                                            placeholder={t('citizenship')}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <FastField
                                            name="gender"
                                            component={Fields.AsyncSelect}
                                            loadOptionsUrl={'/genders'}
                                            loadOptionsKey={(data) => data?.data?.map((el) => ({label: el.attributes.name, value:el.id}))}
                                            label={t('gender')}
                                            placeholder={t('gender')}
                                        />
                                    </div>

                                    <div className="col-4">
                                        {values.personalCar === 'yes'&&<FastField
                                            name="citizenship"
                                            component={Fields.InputText}
                                            label={t("Vehicle-category-car-number-model")}
                                            // placeholder="Отасининг исми"
                                        />}
                                    </div>
                                    <div className="col-2  offset-1">
                                        <p className="mb_20">{t('is-personal-car')}</p>
                                        <div className="d-flex justify-content-between">
                                            <FastField
                                                name="personalCar"
                                                component={Fields.RadioButton}
                                                label={t('yes')}
                                                value={'yes'}
                                            />
                                            <FastField
                                                name="personalCar"
                                                component={Fields.RadioButton}
                                                label={t('no')}
                                                value={'no'}
                                            />
                                        </div>
                                    </div>

                                    {/*<div className="row g-4">*/}
                                    <div className="col-4">
                                        <FastField
                                            name="information"
                                            component={Fields.InputText}
                                            label={t('information')}
                                            placeholder={t('information')}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <FastField
                                            name="degree"
                                            component={Fields.InputText}
                                            label={t('degree')+"*"}
                                            placeholder={t('degree')+"*"}
                                            required
                                        />
                                    </div>
                                    <div className={values.familyStatus ? 'col-3' : "col-4"}>
                                        <FastField
                                            name="rank"
                                            component={Fields.InputText}
                                            label={t('rank')+"*"}
                                            placeholder={t('rank')+"*"}
                                        />
                                    </div>
                                    <div className={values.familyStatus ? 'col-3' : "col-4"}>
                                        <FastField
                                            name="familyStatus"
                                            component={Fields.AsyncSelect}
                                            loadOptionsUrl={'/user-family-statuses'}
                                            label={t('family-status')}
                                            loadOptionsKey={(data) => {
                                                // console.log(data)
                                                return data.data?.map((el) => ({label: el.attributes.name, hasChild: el.attributes.hasChild, value:el.id}))
                                            }}
                                            placeholder={t('family-status')}
                                        />
                                    </div>
                                    <div className={values.familyStatus.hasChild
                                        ? 'col-3' : "col-4"}>
                                        <FastField
                                            name="beginWorkingDate"
                                            component={Fields.DatePicker}
                                            placeholder={t('begin-working-date')}
                                            label={t('begin-working-date')}
                                        />
                                    </div>
                                    <div className={values.familyStatus.hasChild
                                        ? 'col-3' : "col-4"}>
                                        <FastField
                                            name="positionNumberDate"
                                            component={Fields.InputText}
                                            placeholder={t('position-number-date')}
                                            label={t('position-number-date')}
                                        />
                                    </div>
                                    {values.familyStatus.hasChild&&<div className={values.familyStatus.hasChild
                                        ? 'col-3' : "col-4"}>
                                        <FastField
                                            name="childrenCount"
                                            component={Fields.InputText}
                                            placeholder={t('children-count')}
                                            label={t('children-count')}
                                        />
                                    </div>}
                                    <div className="col-4">
                                        <FastField
                                            name="fromServiceCame"
                                            component={Fields.InputText}
                                            placeholder={t('from-service-came')}
                                            label={t('from-service-came')}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <FastField
                                            name="phone"
                                            component={Fields.InputMask}
                                            placeholder={t('phone')}
                                            label={t('phone')}
                                        />
                                    </div>


                                    <div className="col-4">
                                        <FastField
                                            name="homePhone"
                                            component={Fields.InputText}
                                            placeholder={t('home-phone')}
                                            label={t('home-phone')}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <FastField
                                            name="login"
                                            component={Fields.InputText}
                                            placeholder={t('login')}
                                            label={t('login')}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <FastField
                                            name="password"
                                            component={Fields.InputText}
                                            placeholder={t('password')}
                                            label={t('password')}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <FastField
                                            name="confirmPassword"
                                            component={Fields.InputText}
                                            placeholder={t('confirm-password')}
                                            label={t('confirm-password')}
                                        />
                                    </div>
                                    {/*</div>*/}
                                </div>
                            </div>


                        </div>
                        <Button
                            design="primary"
                            type="submit"
                            className="modal-btn-end fz_16 btn mt_40"
                            text={get(valuesList, 'id') ?t('updata'):t('save')}
                            isLoading={isSubmitting}
                        />
                    </>
                }}
            </Containers.Form>
        </>
    );
};
