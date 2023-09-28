import React from "react";
import {ErrorMessage, FastField, Field, FieldArray} from "formik";
import { useSelector } from "react-redux";
import { get } from "lodash";
import { userSelector } from "store/selectors";
import { useGetLanguage } from "hooks";
import { constants, time, utils } from "services";
import { useNavigate } from "react-router-dom";
import Containers from "containers";
import { Fields, Button, AvatarUpload, AttachFile } from "components";
import { useTranslation } from "react-i18next";
import {ReactComponent as IconDelete} from "../../../../assets/icons/delete.svg";
import dayjs from "dayjs";
const FieldArrays = ({products, t}) => {
  return<FieldArray name={'items'}>
      {({insert, remove, push}) => (
         <>
            {products.map((product, index, arr) => (
        <div className='row'>
                <div className='col-2 col-md-2 col-sm-12 mt_20 d-flex align-items-center ' key={index}>

               <div className='d-flex'>
                 <Field
                     style={{borderRight: 'none'}}
                     name={`items.${index}.key`}
                     component={Fields.InputText}
                 /><Field
                   name={`items.${index}.value`}
                   component={Fields.InputText}

               />
               </div>
                  <ErrorMessage
                      name={`items.${index}.name`}
                      component="span"
                      className="field-error"
                  />
                  <div className='ml_10'>{index + 1 === arr.length && index !== 0 && (
                      <Button
                          className="color_primary-red product__btn"
                          onClick={() => remove(index)}
                      ><IconDelete/></Button>
                  )}</div>
                  {/*</div>*/}
                </div>
        </div>
            ))}
            <Button
                className='w_30 mt_20 '
                style={{padding: 0, borderRadius: 5 + "px"}}
                design={"primary"}
                onClick={() => push({name: ''})}
            >+</Button>
              </>
      )
      }
    </FieldArray>

}
export const VForms = (props) => {
  const { values, handleOverlayClose, onAddedNewRecord } = props;
  // console.log(get(values, 'responsibleUser.data.attributes.username'), isUpdate)
  const { getLanguageValue } = useGetLanguage();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const filter={};
  let maxbus;
  if(userData.region) {
      filter['region'] =userData.region.id
  }
  if(userData.vsx) {
    filter['vsx'] =userData.vsx.id
    maxbus=userData.vsx.id
  }

  const user = useSelector(userSelector);
  const navLink = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <Containers.Form
        method={get(values, "id") ? "put" : "post"}
        url={get(values, "id") ? `/visitor/create-visitor-and-visit${get(values, "id")}` : "/visitor/create-visitor-and-visit"}
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
            name: "items",
            validationType: "array",
            value: [{key: '', value: ''},],
            lazy: (validator, yup) => validator.of(
                yup.object().shape({
                  name: yup.string(),
                })
            ),
            onSubmitValue: (value) => value.map((item) => (item)),
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
            name: "date",
            value: get(values, "date"),
            onSubmitValue: () => {
              return dayjs()
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
            validations: [{ type: "required" }],
            value: get(values, "phone"),
            onSubmitValue: (value) => value,
          },
          {
            name: "nationality",
            validations: [{ type: "required" }],
            validationType: "object",
            value: get(values, 'id') ?  {label: get(values, 'nationality.name'),value:get(values, 'nationality.id')} : "",
            onSubmitValue: (value) => value.value,
          },
          {
            name: "responsibleOfficer",
            validations: [{ type: "required" }],
            validationType: "object",
            value: get(values, 'id') ?  {label: get(values, 'responsibleOfficer.username'),value:get(values, 'responsibleOfficer.id')} : "",
            onSubmitValue: (value) => value.value,
          },
          {
            name: "prisoner",
            validations: [{ type: "required" }],
            validationType: "object",
            value: get(values, 'id') ?  {label: get(values, 'prisoner.name'),value:get(values, 'prisoner.id')} : "",
            onSubmitValue: (value) => value.value,
          },
          {
            name: "document",
            // validations: [{type: "required"}],
            value: get(values, 'searchDocument'),
            onSubmitValue: (value) => {
              if(!value) return null;
              return  value
            },
          },
          {
            name: "citizenship",
            validations: [{ type: "required" }],
            validationType: "object",
            value: get(values, 'id') ?  {label: get(values, 'citizenship.name'),value:get(values, 'citizenship.id')} : "",
            onSubmitValue: (value) => value.value,
          },
        ]}
      >
        {({ isSubmitting, values }) => (
          <>
            <div className="row g-5 mb_25">
              <div className="col-5">
                <div className="">
                  <FastField
                    name="responsibleOfficer"
                    component={Fields.AsyncSelect}
                    loadOptionsParams={() => ({filters: {...filter}})}
                    loadOptionsUrl={"/users"}
                    loadOptionsKey={(data) =>
                      data?.map((el) => ({
                        label: el.username,
                        value: el.id,
                      }))
                    }
                    label={t("responsible-person")}
                    // placeholder="Отасининг исми"
                  />
                </div>
              </div>
              <div className="col-5">
                {/*<p className="mb_10">{}</p>*/}
                <div className="">
                  <FastField
                    name="prisoner"
                    component={Fields.AsyncSelect}
                    loadOptionsUrl={"/prisoners"}

                    loadOptionsParams={(searchText) => ({
                      filters:{room:{vsx:{id: maxbus}}},
                      populate: '*'
                    })}
                    loadOptionsKey={(data) =>
                      data?.data?.map((el) => ({
                        label:
                          el?.person?.firstName + " " + el?.person?.sureName,
                        value: el.id,
                      }))
                    }
                    label={t("responsible-prisoner")}
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
                      label={t('passport')}
                      // placeholder="Серия ва рақам *"
                      required
                    />
                  </div>
                  {/*birthdate*/}
                  <div className="col-4">
                    <FastField
                      name="birthDate"
                      component={Fields.DatePicker}
                      label={t('birthdate')}
                      format="YYYY-MM-DD"
                      prepend=""
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
                      label={t('first-name')}
                      // placeholder="Исми"
                    />
                  </div>
                  {/*sureName*/}
                  <div className="col-4">
                    <FastField
                      name="sureName"
                      component={Fields.InputText}
                      label={t('sure-name')}
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
                      label={t('birthaddress')}
                      // placeholder="Тугилган жойи"
                    />
                  </div>
                  {/*middlename*/}
                  <div className="col-4">
                    <FastField
                      name="middleName"
                      component={Fields.InputText}
                      label={t('middle-name')}
                      // placeholder="Отасининг исми"
                    />
                  </div>
                  {/*address*/}
                  <div className="col-4">
                    <FastField
                      name="phone"
                      component={Fields.InputMask}
                      label={t('phone')}
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
                      label={t('nationality')}
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
                  <div className="col-4">
                    <h2 className='search_label mb_10'>{t('aplication')}</h2>
                    <div className='file-upload'>
                      <FastField
                          name="searchDocument"
                          title={t('file')}
                          component={AttachFile}
                          label={t('aplication')}
                      />
                    </div>
                  </div>
                  <div>
                    <h3>{t('get-out-thing')}</h3>
                    <FieldArrays t={t} products={values?.items?.length ? values.items : [{key: "", value: ''}] }/>
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
