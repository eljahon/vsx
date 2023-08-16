import React from "react";
import { FastField } from "formik";
import { useSelector } from "react-redux";
import { get } from "lodash";
import { userSelector } from "store/selectors";
import {useGetLanguage,} from "hooks";
import { constants, time, utils } from "services";
import {useNavigate} from "react-router-dom";
import Containers from "containers";
import {
  Fields,
  Button,
  AvatarUpload,
} from "components";
export const VForms = (props) => {
  const {
    values,
    handleOverlayClose,
    onAddedNewRecord,
  } = props;
  // console.log(get(values, 'responsibleUser.data.attributes.username'), isUpdate)
  const { getLanguageValue } = useGetLanguage();
  const user = useSelector(userSelector);
  const navLink = useNavigate()
  return (
    <>
        <Containers.Form
            method={get(values, "id") ? "put" : "post"}
            url={get(values, "id") ? `/visitors/${get(values, "id")}` : "/visitors"}
          onSuccess={() => {
            navLink(-1)
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
              name: "birthDate",
              validations: [{ type: "required" }],
              value: get(values, 'birthDate'),
              onSubmitValue: (value) => {
                return time.timeFormater(value, 'YYYY-MM-DD')
              },
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
              name: "phone",
              validations: [{ type: "phone" }],
              value: get(values, 'phone'),
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
              name: "isConvicted",
              validations: [{ type: "required" }],
              value: get(values, 'isConvicted')?? false,
              onSubmitValue: (value) => {
                return value
              },
            },
          ]}
        >
          {({ isSubmitting }) => (
            <>
              <div className="row g-4">
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
                        name="birthDate"
                        component={Fields.DatePicker}
                        label="Туғилган санаси *"
                        format = "YYYY-MM-DD"
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
                        name="phone"
                        component={Fields.InputMask}
                        label="Phone"
                        // placeholder="Доимий рўйхатга олинган манзил"
                      />
                    </div>
                    {/*livingAddress*/}
                    {/*<div className="col-4">*/}
                    {/*  <FastField*/}
                    {/*    name="livingAddress"*/}
                    {/*    component={Fields.InputText}*/}
                    {/*    label="Яшаш жойи"*/}
                    {/*    // placeholder="Яшаш жойи"*/}
                    {/*  />*/}
                    {/*</div>*/}
                    {/*conviction*/}
                    {/*<div className="col-4">*/}
                    {/*  <FastField*/}
                    {/*    name="conviction"*/}
                    {/*    component={Fields.InputText}*/}
                    {/*    label="Судланганлиги"*/}
                    {/*    // placeholder="Фамилия"*/}
                    {/*  />*/}
                    {/*</div>*/}
                    {/*nationality*/}
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

                    {/*<div className="col-4">*/}
                    {/*  <FastField*/}
                    {/*      name=""*/}
                    {/*      component={Fields.InputText}*/}
                    {/*      label="Қайси хизмат ходими"*/}
                    {/*      // placeholder="Отасининг исми"*/}
                    {/*  />*/}
                    {/*</div>*/}
                    {/*gender*/}
                    {/*<div className="col-4">*/}
                    {/*  <FastField*/}
                    {/*      name="gender"*/}
                    {/*      component={Fields.AsyncSelect}*/}
                    {/*      loadOptionsUrl={'/genders'}*/}
                    {/*      loadOptionsKey={(data) => data?.data?.map((el) => ({label: el.attributes.name, value:el.id}))}*/}
                    {/*      label="Жинси"*/}
                    {/*      // placeholder="Отасининг исми"*/}
                    {/*  />*/}
                    {/*</div>*/}
                    {/*room*/}
                    {/*<div className="col-4">*/}
                    {/*  <FastField*/}
                    {/*      name="room"*/}
                    {/*      loadOptionsUrl={'/rooms'}*/}
                    {/*      component={Fields.AsyncSelect}*/}
                    {/*      loadOptionsKey={(data) => data?.data?.map((el) => ({label: el.attributes.name, value:el.id}))}*/}
                    {/*      label="Камера"*/}
                    {/*      // placeholder="Отасининг исми"*/}
                    {/*  />*/}
                    {/*</div>*/}
                    {/*responsibleUser*/}
                    {/*<div className="col-4">*/}
                    {/*  <FastField*/}
                    {/*      name="responsibleUser"*/}
                    {/*      loadOptionsUrl={'/users'}*/}
                    {/*      component={Fields.AsyncSelect}*/}
                    {/*      loadOptionsKey={(data) => data?.map((el) => ({label: el.username, value:el.id}))}*/}
                    {/*      label="Mасъул фойдаланувчи"*/}
                    {/*      // placeholder="Отасининг исми"*/}
                    {/*  />*/}
                    {/*</div>*/}
                    <div className="col-3">
                      <p className="mb_20">Холати</p>
                      <FastField
                        name="isConvicted"
                        component={Fields.CheckBox}
                        label="Ногирон"
                      />
                    </div>

                    {/*<div className="col-2">*/}
                    {/*  <p className="mb_20">Жинси</p>*/}
                    {/*  <div className="d-flex justify-content-between">*/}
                    {/*    <FastField*/}
                    {/*      name="gender"*/}
                    {/*      component={Fields.RadioButton}*/}
                    {/*      label="Эркак"*/}
                    {/*    />*/}
                    {/*    <FastField*/}
                    {/*      name="gender"*/}
                    {/*      component={Fields.RadioButton}*/}
                    {/*      label="Аёл"*/}
                    {/*    />*/}
                    {/*  </div>*/}
                    {/*</div>*/}
                    {/*<div className="col-2  offset-1">*/}
                    {/*  <p className="mb_20">LGBTQ+</p>*/}
                    {/*  <div className="d-flex justify-content-between">*/}
                    {/*    <FastField*/}
                    {/*      name="isLGBT"*/}
                    {/*      component={Fields.RadioButton}*/}
                    {/*      label="Ha"*/}
                    {/*    />*/}
                    {/*    <FastField*/}
                    {/*      name="isLGBT"*/}
                    {/*      component={Fields.RadioButton}*/}
                    {/*      label="Yo'q"*/}
                    {/*    />*/}
                    {/*  </div>*/}
                    {/*</div>*/}
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
