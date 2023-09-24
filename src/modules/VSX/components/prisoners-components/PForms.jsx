import React, {useState} from "react";
import {ErrorMessage, FastField, Field, FieldArray} from "formik";
import {useSelector} from "react-redux";
import {get} from "lodash";

import {userSelector} from "store/selectors";
import {useFetchList, useGetLanguage,} from "hooks";
import {constants, time, utils} from "services";
import './styleds/tintuv.scss'
import {ReactComponent as IconDelete} from "../../../../assets/icons/delete.svg";
import Containers from "containers";
import {
    Fields,
    Button,
    AvatarUpload, Typography, AttachFile,
} from "components";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import dayjs from "dayjs";

const FieldArrays = ({products, t}) => {
    return <div className='row'>
        <FieldArray name={'items'}>
            {({insert, remove, push}) => (
                <>
                    {products.map((product, index, arr) => (

                        <div className='col-3 col-md-4 col-sm-12 mt_20 d-flex align-items-center' key={index}>

                            <Field
                                name={`items.${index}.name`}
                                component={Fields.InputText}
                                placeholder={t('something')}
                            />
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
    </div>
}
const FieldArraysChilds = ({products, t}) => {
    return <FieldArray name={'children'}>
            {({insert, remove, push}) => (
                <>
                    {products.map((product, index, arr) => (
                        <div className='row mt_10 g-4'>
                        <div className='col-6 col-md-6 col-sm-6 col-lg-6 col-xl-3' key={index}>
                            <Field
                                name={`children.${index}.fullName`}
                                component={Fields.InputText}
                                placeholder={t('fullname')}
                                label={t('fullname')}
                            />
                            <ErrorMessage
                                name={`children.${index}.fullName`}
                                component="span"
                                className="field-error"
                            />
                            {/*</div>*/}
                        </div>
                        <div className='col-6 col-md-6 col-sm-6 col-lg-6 col-xl-3' key={index}>
                            <Field
                                name={`children.${index}.birthLisenc`}
                                component={Fields.InputText}
                                placeholder={t('birthlisenc')}
                                label={t('birthlisenc')}
                            />
                            <ErrorMessage
                                name={`children.${index}.birthLisenc`}
                                component="span"
                                className="field-error"
                            />
                            {/*</div>*/}
                        </div>
                        <div className='col-6 col-md-6 col-sm-6 col-lg-6 col-xl-3' key={index}>
                            <Field
                                name={`children.${index}.birthDate`}
                                component={Fields.DatePicker}
                                placeholder={t('birthdate')}
                                label={t('birthdate')}
                            />
                            <ErrorMessage
                                name={`children.${index}.birthdate`}
                                component="span"
                                className="field-error"
                            />
                            {/*</div>*/}
                        </div>
                        <div className='col-6 col-md-6 col-sm-6 col-lg-6 col-xl-3' key={index}>
                            <Field
                                name={`children.${index}.birthPlace`}
                                component={Fields.InputText}
                                placeholder={t('birthplace')}
                                label={t('birthplace')}
                            />
                            <ErrorMessage
                                name={`children.${index}.birthPlace`}
                                component="span"
                                className="field-error"
                            />
                            <div className='ml_10'>{index + 1 === arr.length && index !== 0 && (
                                <Button
                                    className="color_primary-red product__btn mt_10"
                                    style={{float: 'right'}}
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
                        onClick={() => push({fullName: '', birthLisenc: "", birthDate: "", birthPlace: ""})}
                    >+</Button>
                </>
                )
            }
        </FieldArray>

}
const Info = ({icon, data, label}) => {
    return (
        <div className='search'>
            <h2 className='search_label'>{label}</h2>
            <div className='search_data'><span>{data}</span> <span>{icon &&
                <svg width="15" height="15" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16 2.3027H15V1.31029C15 0.764459 14.55 0.317871 14 0.317871C13.45 0.317871 13 0.764459 13 1.31029V2.3027H5V1.31029C5 0.764459 4.55 0.317871 4 0.317871C3.45 0.317871 3 0.764459 3 1.31029V2.3027H2C0.89 2.3027 0.00999999 3.19588 0.00999999 4.28754L0 18.1814C0 19.273 0.89 20.1662 2 20.1662H16C17.1 20.1662 18 19.273 18 18.1814V4.28754C18 3.19588 17.1 2.3027 16 2.3027ZM16 17.189C16 17.7348 15.55 18.1814 15 18.1814H3C2.45 18.1814 2 17.7348 2 17.189V7.26479H16V17.189ZM4 9.24962H6V11.2345H4V9.24962ZM8 9.24962H10V11.2345H8V9.24962ZM12 9.24962H14V11.2345H12V9.24962Z"
                        fill="#414141"/>
                </svg>
            }</span></div>
        </div>
    )
}

export const PForms = (props) => {
    const {
        values,
        handleOverlayClose,
        onAddedNewRecord,
    } = props;
    const {getLanguageValue} = useGetLanguage();
    const user = useSelector(userSelector);
    const navLink = useNavigate()
    const {region} = useParams();
    const {t} = useTranslation()
    const [childpartId, setPartId] = useState(null)
    const handleFormOptions = (values, setFields) => {
        if (values.parentPartId?.value) {
            setPartId(values.parentPartId.value)
        }
    }
    const doclist = useFetchList({url: 'prisoner-basis-documents'});
    const handleAddProduct = (products, setFieldValue) => {
        const newProduct = {
            name: "",
        };
        setFieldValue("items", [...products, newProduct]);
    };
    const handleRemoveProduct = (selectedIndex, values, setFieldValue) => {
        const newProducts = values.items.filter((item, index) => {
            // if (index !== selectedIndex) {
            //   setFieldValue(
            //       "total_price",
            //       values.total_price -
            //       utils.formatters.formatCurrencyApi(item.quantity) *
            //       utils.formatters.formatCurrencyApi(item.price)
            //   );
            // }
            return index !== selectedIndex;
        });
        setFieldValue("items", newProducts);
    };
    const handleNewFild =  (forim) => {

    }
    return (
        <>
            <Containers.Form
                validate={(event) => {
                    console.log(event)}}
                method={get(values, "id") ? "put" : "post"}
                url={get(values, "id") ? `/prisoner/create-prisoner/${get(values, "id")}` : "/prisoner/create-prisoner"}
                onSuccess={({data}) => {
                    get(values, "id") ? navLink(-1) : navLink(`/${region}/prisoner/medical/${data.id}/create`)
                }}
                fields={[
                    {
                        name: "image",
                        value: get(values, 'image'),
                        onSubmitValue: (value) => {
                            if(!value) return  null;
                            return value
                        },
                    },
                    {
                        name: "citizenship",
                        validations: [{type: "required"}],
                        validationType: "object",
                        value: get(values, 'citizenship') ?? '',
                        onSubmitValue: (value) => value.value,
                    },
                    {
                        name: "passport",
                        validations: [{type: "required"}],
                        value: get(values, 'passport'),
                        onSubmitValue: (value) => {
                            return value
                        },
                    },
                    {
                        name: "birthdate",
                        validations: [{type: "required"}],
                        value: get(values, 'birthdate'),
                        onSubmitValue: (value) => time.timeFormater(value, 'YYYY-MM-DD'),
                    },
                    {
                        name: "arestTime",
                        // validations: [{type: "required"}],
                        value: get(values, 'arestTime'),
                        onSubmitValue: (value) => time.timeFormater(value, 'YYYY-MM-DD'),
                    },
                    {
                        name: "organizationArestTime",
                        // validations: [{type: "required"}],
                        value: get(values, 'organizationArestTime'),
                        onSubmitValue: (value) => time.timeFormater(value, 'YYYY-MM-DD'),
                    },
                    {
                        name: "firstName",
                        validations: [{type: "required"}],
                        value: get(values, 'firstName'),
                        onSubmitValue: (value) => value,
                    },
                    {
                        name: "sureName",
                        validations: [{type: "required"}],
                        value: get(values, 'sureName'),
                        onSubmitValue: (value) => value,
                    },
                    {
                        name: "middleName",
                        validations: [{type: "required"}],
                        value: get(values, 'middleName'),
                        onSubmitValue: (value) => value
                    },
                    {
                        name: "hasItems",
                        validations: [{type: "required"}],
                        value: get(values, 'hasItems'),
                        onSubmitValue: (value) => {
                            console.log(value)
                        }
                    },
                    {
                        name: "items",
                        validationType: "array",
                        value: [{name: ''},],
                        lazy: (validator, yup) => validator.of(
                                yup.object().shape({
                                    name: yup.string(),
                                })
                            ),
                        onSubmitValue: (value) => value.map((item) => (item)),
                    },
                    {
                        name: "children",
                        validationType: "array",
                        value: [{name: ''},],
                        lazy: (validator, yup) => validator.of(
                                yup.object().shape({
                                    name: yup.string(),
                                })
                            ),
                        onSubmitValue: (value) => value.map((item) => (item)),
                    },
                    {
                        name: "birthAddress",
                        validations: [{type: "required"}],
                        value: get(values, 'birthAddress'),
                        onSubmitValue: (value) => value,
                    },
                    {
                        name: "address",
                        validations: [{type: "required"}],
                        value: get(values, 'address'),
                        onSubmitValue: (value) => value,
                    },
                    {
                        name: "searchDocument",
                        // validations: [{type: "required"}],
                        value: get(values, 'searchDocument'),
                        onSubmitValue: (value) => {
                            if(!value) return null;
                            return  value
                        },
                    },
                    {
                        name: "medExamInfoDocument",
                        // validations: [{type: "required"}],
                        value: get(values, 'medExamInfoDocument'),
                        onSubmitValue: (value) => {
                            if(!value) return null;
                            return  value;
                        },
                    },
                    {
                        name: "medExamDeedDocument",
                        // validations: [{type: "required"}],
                        value: get(values, 'medExamDeedDocument'),
                        onSubmitValue: (value) => {
                            if(!value) return null;
                            return  value
                        },
                    },
                    {
                        name: "livingAddress",
                        validations: [{type: "required"}],
                        value: get(values, 'livingAddress'),
                        onSubmitValue: (value) => value,
                    },
                    {
                        name: "organizationOfficer",
                        validations: [{type: "required"}],
                        value: get(values, 'organizationOfficer'),
                        onSubmitValue: (value) => value.value,
                    },
                    {
                        name: "arestOrganizationOfficer",
                        // validations: [{type: "required"}],
                        value: get(values, 'arestOrganizationOfficer'),
                        onSubmitValue: (value) => value.value,
                    },
                    {
                        name: "isConvicted",
                        validations: [{type: "required"}],
                        value: get(values, 'isConvicted') ?? false,
                        onSubmitValue: (value) => {
                            return value
                        },
                    },{
                        name: "hasChild",
                        validations: [{type: "required"}],
                        value: get(values, 'hasChild') ?? false,
                        onSubmitValue: (value) => {
                            return value
                        },
                    },
                    {
                        name: "nationality",
                        validations: [{type: "required"}],
                        validationType: "object",
                        value: get(values, 'nationality') ?? '',
                        onSubmitValue: (value) => value.value,
                    },
                    {
                        name: "isInvalid",
                        validations: [{type: "required"}],
                        value: get(values, 'isInvalid') ?? false,
                        onSubmitValue: (value) => {
                            return value
                        },
                    },
                    {
                        name: "gender",
                        validations: [{type: "required"}],
                        validationType: "object",
                        value: get(values, 'gender.data.id') ? {
                            label: get(values, 'gender.data.name'),
                            value: get(values, 'gender.data.id')
                        } : '',
                        onSubmitValue: (value) => {
                            return value.value
                        }
                    },
                    {
                        name: "basisDocumentPart",
                        validations: [{type: "required"}],
                        validationType: "object",
                        value: get(values, 'gender.data.id') ? {
                            label: get(values, 'gender.data.name'),
                            value: get(values, 'gender.data.id')
                        } : '',
                        onSubmitValue: (value) => {
                            return value.value
                        }
                    },
                    {
                        name: "invalidType",
                        validations: [{type: "required"}],
                        validationType: "object",
                        value: get(values, 'gender.data.id') ? {
                            label: get(values, 'gender.data.name'),
                            value: get(values, 'gender.data.id')
                        } : '',
                        onSubmitValue: (value) => {
                            return value.value
                        }
                    },
                    {
                        name: "conviction",
                        validations: [{type: "required"}],
                        validationType: "object",
                        value: get(values, 'conviction.id') ? {
                            label: get(values, 'conviction..name'),
                            value: get(values, 'conviction.id')
                        } : '',
                        onSubmitValue: (value) => {
                            return value.value
                        }
                    },
                    {
                        name: "parentPartId",
                        validations: [{type: "required"}],
                        validationType: "object",
                        value: get(values, 'gender.data.id') ? {
                            label: get(values, 'gender.data.attributes.name'),
                            value: get(values, 'gender.data.id')
                        } : '',
                        onSubmitValue: (value) => {
                            return value.value
                        }
                    },
                    {
                        name: "appearance",
                        validations: [{type: "required"}],
                        validationType: "object",
                        value: get(values, 'appearance.id') ? {
                            label: get(values, 'appearance.name'),
                            value: get(values, 'appearance.id')
                        } : '',
                        onSubmitValue: (value) => {
                            return value.value
                        }
                    },
                    {
                        name: "organization",
                        validations: [{type: "required"}],
                        validationType: "object",
                        value: get(values, 'gender.data.id') ? {
                            label: get(values, 'gender.data.attributes.name'),
                            value: get(values, 'gender.data.id')
                        } : '',
                        onSubmitValue: (value) => {
                            return value.value
                        }
                    },
                    {
                        name: "isLGBT",
                        // validations: [{type: "required"}],
                        value: `${get(values, 'isLGBT')}` ?? false,
                        onSubmitValue: (value) => {
                            // console.log(value)
                            const _item = value === 'Ha' ? true : false
                            return _item;
                        }
                    },
                    // {
                    //     name: "searchDocument",
                    //     onSubmitValue: (value) => {
                    //         return value
                    //     }
                    // },

                ]}
            >
                {({isSubmitting, values, setFieldValue, ...rest}) => {
                    handleFormOptions(values, setFieldValue)
                    console.log(values, rest)
                    return <>
                        <div className="row g-4">
                            <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2">
                                <FastField
                                    name="image"
                                    component={AvatarUpload}
                                    className="avatar-upload"
                                />
                            </div>
                            <div className="col-xl-10 col-lg-10 col-md-12 col-sm-12">
                                <div className="row g-4">

                                    <div className="col-4 col-sm-6 col-md-4">
                                        <FastField
                                            name="citizenship"
                                            component={Fields.AsyncSelect}
                                            loadOptionsUrl={'/citizenships'}
                                            loadOptionsKey={(data) => data?.data?.map((el) => ({
                                                label: el.name,
                                                value: el.id
                                            }))}
                                            label={t('citizenship')+"*"}
                                            // placeholder="Отасининг исми"
                                        />
                                    </div>

                                    {/*passport*/}
                                    <div className="col-4 col-sm-6 col-md-4">
                                        <FastField
                                            name="passport"
                                            component={Fields.InputText}
                                            label={t('passport')}
                                            // placeholder="Серия ва рақам *"
                                            required
                                        />
                                    </div>
                                    {/*birthdate*/}
                                    {/*<div className="col-4 col-sm-6 col-md-4"></div>*/}
                                    <div className="col-4 col-sm-6 col-md-4">
                                        <FastField
                                            name="birthdate"
                                            component={Fields.DatePicker}
                                            hasTimeSelect
                                            label={t('birthdate')+"*"}
                                            placeholder={t('birthdate')+"*"}
                                        />
                                    </div>

                                    {/*firstname*/}
                                    <div className="col-4 col-sm-6 col-md-4">
                                        <FastField
                                            name="firstName"
                                            component={Fields.InputText}
                                            label={t('first-name')}
                                            // placeholder="Исми"
                                        />
                                    </div>
                                    {/*sureName*/}
                                    <div className="col-4 col-sm-6 col-md-4">
                                        <FastField
                                            name="sureName"
                                            component={Fields.InputText}
                                            label={t('sure-name')}
                                            // placeholder="Фамилия"
                                        />
                                    </div>
                                    <div className="col-4 col-sm-6 col-md-4">
                                        <Button
                                            className="btn btn-primary mt_20"
                                            design="primary"
                                            style={{width: "100%"}}
                                            text={t('search')}
                                        />
                                    </div>
                                    {/*middlename*/}
                                    <div className="col-4 col-sm-6 col-md-4">
                                        <FastField
                                            name="middleName"
                                            component={Fields.InputText}
                                            label={t('middle-name')}
                                            // placeholder="Отасининг исми"
                                        />
                                    </div>
                                    {/*birthAddress*/}
                                    <div className="col-4 col-sm-6 col-md-4">
                                        <FastField
                                            name="birthAddress"
                                            component={Fields.InputText}
                                            label={t('birthaddress')}
                                            // placeholder="Тугилган жойи"
                                        />
                                    </div>
                                    {/*address*/}
                                    <div className="col-4 col-sm-6 col-md-4">
                                        <FastField
                                            name="address"
                                            component={Fields.InputText}
                                            label={t('address')}
                                            // placeholder="Доимий рўйхатга олинган манзил"
                                        />
                                    </div>
                                    {/*livingAddress*/}
                                    <div className="col-4 col-sm-6 col-md-4">
                                        <FastField
                                            name="livingAddress"
                                            component={Fields.InputText}
                                            label={t('livingAddress')}
                                            // placeholder="Яшаш жойи"
                                        />
                                    </div>
                                  {/*conviction*/}
                                    <div className="col-4 col-sm-6 col-md-4">
                                        <FastField
                                            name="conviction"
                                            component={Fields.AsyncSelect}
                                            loadOptionsUrl={'/convictions'}
                                            loadOptionsKey={(data) => data?.data?.map((el) => ({
                                                label: el.name,
                                                value: el.id
                                            }))}
                                            label={t('conviction')}
                                            // placeholder="Миллати"
                                        />
                                    </div>
                                  {/*nationality*/}
                                    <div className="col-4 col-sm-6 col-md-4">
                                        <FastField
                                            name="nationality"
                                            component={Fields.AsyncSelect}
                                            loadOptionsUrl={'/nationalities'}
                                            loadOptionsKey={(data) => data?.data?.map((el) => ({
                                                label: el.name,
                                                value: el.id
                                            }))}
                                            label={t('nationality')}
                                            // placeholder="Миллати"
                                        />
                                    </div>
                                  {/*gender*/}
                                    <div className="col-4 col-sm-6 col-md-4">
                                        <FastField
                                            name="gender"
                                            component={Fields.AsyncSelect}
                                            loadOptionsUrl={'/genders'}
                                            loadOptionsKey={(data) => data?.data?.map((el) => ({
                                                label: el.name,
                                                value: el.id
                                            }))}
                                            label={t('gender')}
                                            // placeholder="Отасининг исми"
                                        />
                                    </div>
                                  {/*organization*/}
                                    <div className="col-4 col-sm-6 col-md-4">
                                        <FastField
                                            name="organization"
                                            loadOptionsUrl={'/prisoner-organizations'}
                                            component={Fields.AsyncSelect}
                                            loadOptionsKey={({data}) => data?.map((el) => ({
                                                label: el.name,
                                                value: el.id
                                            }))}
                                            label={t('where-service-employees')}
                                            // placeholder="Отасининг исми"
                                        />
                                    </div>
                                    {/*organizationOfficer*/}
                                    <div className="col-4 col-sm-6 col-md-4">
                                        <FastField
                                            name="organizationOfficer"
                                            component={Fields.InputText}
                                            label={t('service-employees')}
                                            // placeholder="Яшаш жойи"
                                        />
                                    </div>


                                    <div className="col-4 col-sm-6 col-md-4">
                                        {/*<div className="row">*/}
                                        {/*  <div className='col-4'>*/}
                                        <FastField
                                            name="appearance"
                                            component={Fields.AsyncSelect}
                                            loadOptionsUrl={'/genders'}
                                            loadOptionsKey={(data) => data?.data?.map((el) => ({
                                                label: el.name,
                                                value: el.id
                                            }))}
                                            label={t('out-see')}
                                            // placeholder="Отасининг исми"
                                        />
                                        {/*</div>*/}


                                        {/*</div>*/}
                                    </div>
                                    <div className='col-4 col-md-6 col-xl-4 col-lg-4'>
                                        <p className="mb_20" style={{fontSize: 14 + 'px'}}>{t('lgbt')}</p>
                                        <div className="d-flex">
                          <span>
                            <FastField
                                name="isLGBT"
                                component={Fields.RadioButton}
                                label={t('yes')}
                                value={t('yes')}
                            />
                          </span>
                                            <span className='ml_10'>
                            <FastField
                                name="isLGBT"
                                component={Fields.RadioButton}
                                label={t("no")}
                                value={t("no")}
                            />
                       </span>
                                        </div>
                                    </div>
                                    <h2>{t('place-asign-data')}</h2>
                                    <hr style={{marginBottom: 20 + "px"}}/>
                                    <div className="row">
                                        <div className="col-4 cl-md-6 col-sm-6">
                                            <FastField
                                                name="parentPartId"
                                                component={Fields.AsyncSelect}
                                                loadOptionsUrl={'/prisoner-basis-documents'}
                                                loadOptionsKey={(data) => data?.data?.map((el) => ({
                                                    label: el.name,
                                                    value: el.id
                                                }))}
                                                label={t('jk-role')}
                                                // placeholder="Отасининг исми"
                                            />
                                        </div>
                                        <div className="col-4 cl-md-6 col-sm-6">
                                            <h3 className=' mb_20'>{t('child')}</h3>
                                            <FastField
                                                name="hasChild"
                                                component={Fields.CheckBox}
                                                // placeholder="Отасининг исми"
                                            />
                                        </div>
                                        {/*{values}*/}

                                        <div className="col-12">
                                            {childpartId===1 && <div className="row mt_10">
                                                <div className="col-6 col-md-12 col-sm-6 col-lg-6 col-xl-6">
                                                    <FastField
                                                        name="basisDocumentPart"
                                                        component={Fields.AsyncSelect}
                                                        loadOptionsUrl={`/prisoner-basis-document-parts`}
                                                        loadOptionsParams={(searchText) => ({
                                                            filters: {
                                                                basisDocument: childpartId,
                                                            },
                                                        })}
                                                        loadOptionsKey={(data) => data?.data?.map((el) => ({
                                                            label: el.name,
                                                            value: el.id
                                                        }))}
                                                        label={t('jk-role-section')}
                                                        // placeholder="Отасининг исми"
                                                    />
                                                </div>
                                                <div className="col-6 col-md-12 col-sm-6 col-lg-6 col-xl-6">
                                                    <FastField
                                                        name="arestTime"
                                                        component={Fields.DatePicker}
                                                        hasTimeSelect
                                                        label={t("arest-time")}
                                                        placeholder={t('arest-time')}
                                                    />
                                                </div>
                                                <div className="col-6 col-md-12 col-sm-6 col-lg-6 col-xl-6 mt_10">
                                                    <FastField
                                                        name="arestOrganization"
                                                        component={Fields.AsyncSelect}
                                                        loadOptionsUrl={'/prisoner-arest-organizations'}
                                                        loadOptionsKey={(data) => data?.data?.map((el) => ({
                                                            label: el.name,
                                                            value: el.id
                                                        }))}
                                                        label={t('arest-organization')}
                                                        // placeholder="Отасининг исми"
                                                    /></div>
                                                <div className="col-6 col-md-12 col-sm-6 col-lg-6 col-xl-6 mt_10">
                                                    <FastField
                                                        name="arestOrganizationOfficer"
                                                        component={Fields.InputText}
                                                        label={t('arest-organization-officer')}
                                                        // placeholder="Отасининг исми"
                                                    /></div>
                                                <div className="col-6 col-md-12 col-sm-col-lg-6 col-xl-6 mt_10">
                                                    <FastField
                                                        name="organizationArestTime"
                                                        component={Fields.DatePicker}
                                                        hasTimeSelect
                                                        label={t('organization-arest-time')}
                                                        // placeholder="Отасининг исми"
                                                    /></div>
                                            </div>}
                                            {values.hasChild && <FieldArraysChilds t={t} products={values?.children?.length ? values.children : [{fullName: '', birthLisenc: "", birthDate: "", birthPlace: ""}]}/>}

                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-12">
                                <h2 className='title'>{t('search-to')}</h2>
                                <hr/>
                                <br/>
                                <div className="row">

                                    <div className="col-3 col-md-4 col-lg-4 col-xl-4 col-lg-3 col-sm-6"><Info
                                        className='w_full'
                                        label={t('search-data')}
                                        icon
                                        data={dayjs().format('DD.MM.YYYY HH:mm')}/>
                                    </div>
                                    {/*<div className="col-2 col-md-4 col-lg-2"><Info label={'Тинтув вақти'} icon data={dayjs().format('HH:mm')}/></div>*/}
                                    <div className="col-3 col-md-4 col-lg-4 col-xl-4 col-lg-3 col-sm-6"><Info
                                        label={'Masul Xodim'}
                                        data={JSON.parse(localStorage.getItem('userData')).username}/>
                                    </div>
                                    <div className="col-3 col-md-4 col-lg-2 col-xl-2 col-lg-2 col-sm-6">
                                        <h2 className='search_label'>{t('minutes')}</h2>
                                        <div className='file-upload'>
                                            <FastField
                                                name="searchDocument"
                                                title={t('file')}
                                                component={AttachFile}
                                                label={t('minutes')}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-4 col-sm-6 col-md-12'></div>
                                    <br/>
                                    <div className='col-1 col-md-2 col-lg-2 col-xl-2'>
                                        <p className="mb_20 mt_20" style={{fontSize: 14 + 'px'}}>Mavjud narsalar</p>
                                        <div className="d-flex">
                          <span>
                            <FastField
                                name="hasItems"
                                component={Fields.RadioButton}
                                label={t('yes')}
                                value={t('yes')}
                            />
                          </span>
                                            <span className='ml_10'>
                            <FastField
                                name="hasItems"
                                component={Fields.RadioButton}
                                label={t('no')}
                                value={t('no')}
                            />
                       </span>
                                        </div>
                                    </div>
                                    <div className="col-9 col-md-12 col-xl-9 col-sm-12">
                                        {values.hasItems === 'Ha'&&<FieldArrays t={t} products={values?.items?.length ? values.items : [{name: ""}] } />}

                                    </div>


                                </div>
                                {/*<span className='time_now'>{dayjs().format('DD.MM.YYYY')}</span>*/}
                                {/*<span className='time_now'>{dayjs().format('HH:mm')}</span>*/}
                            </div>
                            <div className="col-12">
                                <h2 className='title'>{t('body-to-search')}</h2>
                                <hr/>
                                <br/>
                                <div className="row">

                                    <div className="col-3 col-md-4 col-lg-4 col-xl-4 col-lg-3 col-sm-6"><Info
                                        className='w_full'
                                        label={"Tintuv sanasi va Vaqti"}
                                        icon
                                        data={dayjs().format('DD.MM.YYYY HH:mm')}/>
                                    </div>
                                    {/*<div className="col-2 col-md-4 col-lg-2"><Info label={'Тинтув вақти'} icon data={dayjs().format('HH:mm')}/></div>*/}
                                    <div className="col-3 col-md-4 col-lg-4 col-xl-4 col-lg-3 col-sm-6"><Info
                                        label={'Masul Xodim'}
                                        data={JSON.parse(localStorage.getItem('userData')).username}/>
                                    </div>
                                    <div className="col-3 col-md-4 col-lg-2 col-xl-2 col-lg-2 col-sm-6">
                                        <h2 className='search_label'>{t('medical-data')}</h2>
                                        <div className='file-upload'>
                                            <FastField
                                                name="medExamInfoDocument"
                                                title={t('file')}
                                                component={AttachFile}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-3 col-md-4 col-lg-2 col-xl-2 col-lg-2 col-sm-6">
                                        <h2 className='search_label'>Dalolatnoma</h2>
                                        <div className='file-upload'>
                                            <FastField
                                                name="medExamDeedDocument"
                                                title={t('file')}
                                                component={AttachFile}
                                            />
                                        </div>
                                    </div>
                                    {/*<div className='col-4 col-sm-6 col-md-12'></div> */}
                                    <br/>
                                    <div className="col-4 col-sm-6 mt_10 col-md-4">
                                        <FastField
                                            name="invalidType"
                                            component={Fields.AsyncSelect}
                                            loadOptionsUrl={'/prisoner-invalid-types'}
                                            loadOptionsKey={(data) => data?.data?.map((el) => ({
                                                label: el.name,
                                                value: el.id
                                            }))}
                                            label="Nogironligi *"
                                            // placeholder="Отасининг исми"
                                        />
                                    </div>
                                    <div className="col-4 col-sm-6 mt_10 col-md-4">
                                        <FastField
                                            name="responsibleMedWorkers"
                                            component={Fields.InputText}
                                            label="Masul tibbiy hodimalar F.I.SH.*"
                                            // placeholder="Яшаш жойи"
                                        />
                                    </div>
                                    <div className='col-4 col-md-6 col-xl-4 col-lg-4 mt_10'>
                                        <p className="mb_20 control__label "
                                           style={{fontSize: 14 + 'px'}}>Jarohatlar</p>
                                        <div className="d-flex">
                          <span>
                            <FastField
                                name="isInjured"
                                component={Fields.RadioButton}
                                label={t('yes')}
                                value={t('yes')}
                            />
                          </span>
                                            <span className='ml_10'>
                            <FastField
                                name="isInjured"
                                component={Fields.RadioButton}
                                label={t('no')}
                                value={t('no')}
                            />
                       </span>
                                        </div>
                                    </div>

                                    <div className="col-4 col-sm-6 mt_10 col-md-4">
                                        <FastField
                                            name="additionalNotes"
                                            component={Fields.Textarea}
                                            type={''}
                                            label="Qo'shimcha qaydlar"
                                            // placeholder="Яшаш жойи"
                                        />
                                    </div>


                                </div>
                                {/*<span className='time_now'>{dayjs().format('DD.MM.YYYY')}</span>*/}
                                {/*<span className='time_now'>{dayjs().format('HH:mm')}</span>*/}
                            </div>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <Button
                                design="cancel"
                                type="submit"
                                className="modal-btn-end fz_16 btn mt_40"
                                text={t('cansel')}
                                isLoading={isSubmitting}
                            /> <Button
                            design="primary"
                            type="submit"
                            className="modal-btn-end fz_16 btn mt_40"
                            text={get(values, "id") ? t('updata') :t('save')}
                            isLoading={isSubmitting}
                        />
                        </div>
                    </>
                }

                }
            </Containers.Form>
        </>
    );
};

