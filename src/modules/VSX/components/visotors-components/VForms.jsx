import React from "react";
import { FastField } from "formik";
import { useSelector } from "react-redux";
import { get } from "lodash";
import { userSelector } from "store/selectors";
import { useGetLanguage } from "hooks";
import { constants, time, utils } from "services";
import { useNavigate } from "react-router-dom";
import Containers from "containers";
import { Fields, Button, AvatarUpload, AttachFile } from "components";
import { useTranslation } from "react-i18next";
export const VForms = (props) => {
  const { values, handleOverlayClose, onAddedNewRecord } = props;
  // console.log(get(values, 'responsibleUser.data.attributes.username'), isUpdate)
  const { getLanguageValue } = useGetLanguage();
  const user = useSelector(userSelector);
  const navLink = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <Containers.Form
        method={get(values, "id") ? "put" : "post"}
        url={get(values, "id") ? `/visitors/${get(values, "id")}` : "/visitors"}
        onSuccess={() => {
          navLink(-1);
        }}
        fields={[
          {
            name: "passport",
            validations: [{ type: "required" }],
            value: get(values, "passport"),
            onSubmitValue: (value) => {
              return value;
            },
          },
          {
            name: "birthDate",
            validations: [{ type: "required" }],
            value: get(values, "birthDate"),
            onSubmitValue: (value) => {
              return time.timeFormater(value, "YYYY-MM-DD");
            },
          },
          {
            name: "firstName",
            validations: [{ type: "required" }],
            value: get(values, "firstName"),
            onSubmitValue: (value) => value,
          },
          {
            name: "sureName",
            validations: [{ type: "required" }],
            value: get(values, "sureName"),
            onSubmitValue: (value) => value,
          },
          {
            name: "middleName",
            validations: [{ type: "required" }],
            value: get(values, "middleName"),
            onSubmitValue: (value) => value,
          },
          {
            name: "birthAddress",
            validations: [{ type: "required" }],
            value: get(values, "birthAddress"),
            onSubmitValue: (value) => value,
          },
          {
            name: "phone",
            validations: [{ type: "phone" }],
            value: get(values, "phone"),
            onSubmitValue: (value) => value,
          },
          {
            name: "nationality",
            validations: [{ type: "required" }],
            value: get(values, "nationality") ?? "",
            onSubmitValue: (value) => value,
          },
          {
            name: "citizenship",
            validations: [{ type: "required" }],
            value: get(values, "citizenship") ?? "",
            onSubmitValue: (value) => value,
          },
          {
            name: "isConvicted",
            validations: [{ type: "required" }],
            value: get(values, "isConvicted") ?? false,
            onSubmitValue: (value) => {
              return value;
            },
          },
        ]}
      >
        {({ isSubmitting }) => (
          <>
            <div className="row g-5 mb_25">
              <div className="col-5">
                <p className="mb_10">{t("responsible-person")}</p>
                <div className="">
                  <FastField
                    name="users"
                    component={Fields.AsyncSelect}
                    loadOptionsUrl={"/users"}
                    loadOptionsKey={(data) =>
                      data?.map((el) => ({
                        label: el.username,
                        value: el.id,
                      }))
                    }
                    label={t("fullname")}
                    // placeholder="Отасининг исми"
                  />
                </div>
              </div>
              <div className="col-5">
                <p className="mb_10">{t("responsible-person")}</p>
                <div className="">
                  <FastField
                    name="prisoners"
                    component={Fields.AsyncSelect}
                    loadOptionsUrl={"/prisoners"}
                    loadOptionsParams={(searchText) => ({
                      populate: "*",
                    })}
                    loadOptionsKey={(data) =>
                      data?.data?.map((el) => ({
                        label:
                          el?.person?.firstName + " " + el?.person?.sureName,
                        value: el.id,
                      }))
                    }
                    label={t("fullname")}
                    // placeholder="Отасининг исми"
                  />
                </div>
              </div>
            </div>
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
                      format="YYYY-MM-DD"
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
                  {/*courted person*/}
                  <div className="col-4">
                    <FastField
                      name="conviction"
                      component={Fields.AsyncSelect}
                      loadOptionsUrl={"/convictions"}
                      loadOptionsKey={(data) =>
                        data?.data?.map((el) => ({
                          label: el.name,
                          value: el.id,
                        }))
                      }
                      label="Sudlanganligi*"
                      // placeholder="Миллати"
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
                  {/*middlename*/}
                  <div className="col-4">
                    <FastField
                      name="middleName"
                      component={Fields.InputText}
                      label="Отасининг исми *"
                      // placeholder="Отасининг исми"
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
                  {/*nationality*/}
                  <div className="col-4">
                    <FastField
                      name="nationality"
                      component={Fields.AsyncSelect}
                      loadOptionsUrl={"/nationalities"}
                      loadOptionsKey={(data) =>
                        data?.data?.map((el) => ({
                          label: el.name,
                          value: el.id,
                        }))
                      }
                      label="Millati"
                      // placeholder="Миллати"
                    />
                  </div>

                  <div className="col-4">
                    <FastField
                      name="citizenship"
                      component={Fields.AsyncSelect}
                      loadOptionsUrl={"/citizenships"}
                      loadOptionsKey={(data) =>
                        data?.data?.map((el) => ({
                          label: el.name,
                          value: el.id,
                        }))
                      }
                      label={t("citizenship") + "*"}
                      // placeholder="Отасининг исми"
                    />
                  </div>
                  <p>Ариза</p>
                  <div className="file-upload d-flex justify-content-center col-4 p__5">
                    <FastField
                      name="searchDocument"
                      title={t("file")}
                      component={AttachFile}
                      label={t("minutes")}
                    />
                  </div>
                  <div className="col-3">
                    <p className="mb_20">Холати</p>
                    <FastField
                      name="isConvicted"
                      component={Fields.CheckBox}
                      label="Ногирон"
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
