import React from "react";
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

export const PForms = (props) => {
  const {
    values,
    handleOverlayClose,
    onAddedNewRecord,
  } = props;
  const { getLanguageValue } = useGetLanguage();
  const user = useSelector(userSelector);
  const navLink = useNavigate()
    const {region}= useParams();
  const {t} = useTranslation()
  return (
    <>
        <Containers.Form
            method={get(values, "id") ? "put" : "post"}
            url={get(values, "id") ? `/prisoners/${get(values, "id")}` : "/prisoners"}
          onSuccess={({data}) =>{
            get(values, "id") ? navLink(-1):navLink(`/${region}/prisoner/medical/${data.id}/create`)
          } }
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
                // console.log(value)
                const _item = value === 'yes' ? true :  false
                return _item;
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
                        label="Серия ва рақам *"
                        // placeholder="Серия ва рақам *"
                        required
                      />
                    </div>
                    {/*birthdate*/}
                    <div className="col-4">
                      <FastField
                        name="birthdate"
                        component={Fields.DatePicker}
                        label="Туғилган санаси *"
                        prepend=""
                        placeholder="Туғилган санаси *"
                      />
                    </div>
                    <div className="col-4">
                      <Button
                        className="btn btn-primary mt_20"
                        design="primary"
                        style={{ width: "100%" }}
                        text={"Излаш"}
                      />
                    </div>
                    {/*firstname*/}
                    <div className="col-4">
                      <FastField
                          name="firstName"
                          component={Fields.InputText}
                          label="Исми *"
                          // placeholder="Исми"
                      />
                    </div>
                    {/*sureName*/}
                    <div className="col-4">
                      <FastField
                        name="sureName"
                        component={Fields.InputText}
                        label="Фамилия *"
                        // placeholder="Фамилия"
                      />
                    </div>
                    {/*middlename*/}
                    <div className="col-4">
                      <FastField
                        name="middleName"
                        component={Fields.InputText}
                        label="Отасининг исми *"
                        // placeholder="Отасининг исми"
                      />
                    </div>
                    {/*birthAddress*/}
                    <div className="col-4">
                      <FastField
                        name="birthAddress"
                        component={Fields.InputText}
                        label="Тугилган жойи"
                        // placeholder="Тугилган жойи"
                      />
                    </div>
                    {/*address*/}
                    <div className="col-4">
                      <FastField
                        name="address"
                        component={Fields.InputText}
                        label="Доимий рўйхатга олинган манзил"
                        // placeholder="Доимий рўйхатга олинган манзил"
                      />
                    </div>
                    {/*livingAddress*/}
                    <div className="col-4">
                      <FastField
                        name="livingAddress"
                        component={Fields.InputText}
                        label="Яшаш жойи"
                        // placeholder="Яшаш жойи"
                      />
                    </div>
                    <div className="col-4">
                      <FastField
                        name="nationality"
                        component={Fields.InputText}
                        label="Миллати"
                        // placeholder="Исми"
                      />
                    </div>
                    {/*citizenship*/}
                    <div className="col-4">
                      <FastField
                        name="citizenship"
                        component={Fields.InputText}
                        label="Фуқаролиги"
                        // placeholder="Отасининг исми"
                      />
                    </div>
                    <div className="col-4">
                      <FastField
                          name="gender"
                          component={Fields.AsyncSelect}
                          loadOptionsUrl={'/genders'}
                          loadOptionsKey={(data) => data?.data?.map((el) => ({label: el.attributes.name, value:el.id}))}
                          label="Жинси"
                          // placeholder="Отасининг исми"
                      />
                    </div>
                    <div className="col-4">
                      <FastField
                          name="responsibleUser"
                          loadOptionsUrl={'/users'}
                          component={Fields.AsyncSelect}
                          loadOptionsKey={(data) => data?.map((el) => ({label: el.username, value:el.id}))}
                          label="Mасъул фойдаланувчи"
                          // placeholder="Отасининг исми"
                      />
                    </div>
                    <div className="col-3">
                      <p className="mb_20">Холати</p>
                      <FastField
                        name="isInvalid"
                        component={Fields.CheckBox}
                        label="Ногирон"
                      />
                    </div>

                    <div className="col-2  offset-1">
                      <p className="mb_20">LGBTQ+</p>
                      <div className="d-flex justify-content-between">
                        <FastField
                          name="isLGBT"
                          component={Fields.RadioButton}
                          label={t('yes')}
                          value={t('yes')}
                        />
                        <FastField
                          name="isLGBT"
                          component={Fields.RadioButton}
                          label={t('no')}
                          value={t('no')}
                        />
                      </div>
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
