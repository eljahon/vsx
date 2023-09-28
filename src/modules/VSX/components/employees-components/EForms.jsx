import React, {useState} from "react";
import {ErrorMessage, FastField, Field, FieldArray} from "formik";
import {useSelector} from "react-redux";
import {get} from "lodash";

import {userSelector} from "store/selectors";
import {useFetchList, useGetLanguage,} from "hooks";
import {time} from "services";
// import './styleds/tintuv.scss'
import {ReactComponent as IconDelete} from "../../../../assets/icons/delete.svg";
import Containers from "containers";
import {
    Fields,
    Button,
    AvatarUpload, AttachFile,
} from "components";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import dayjs from "dayjs";
import {ControlLabel} from "../../../../components/Common";
export const EForms = (props) => {
    const {values} = props;
    const {getLanguageValue} = useGetLanguage();
    const user = useSelector(userSelector);
    const navLink = useNavigate()
    const {region} = useParams();
    const {t} = useTranslation()
    const [childpartId, setPartId] = useState(null)
    const handleFormOptions = (values, setFields) => {
        if (values.basisDocument?.value) {
            setPartId(values.basisDocument.value)
        }
    }
    const doclist = useFetchList({url: 'prisoner-basis-documents'});
    return (
        <>
            <Containers.Form
                validate={(event) => {}}
                method={get(values, "id") ? "put" : "post"}
                url={get(values, "id") ? `/users-permissions/create-user/${get(values, "id")}` : "/users-permissions/create-user"}
                onSuccess={({data}) => {
                    navLink(-1)
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
                        name: "passport",
                        validations: [{type: "required"}],
                        value: get(values, 'passport'),
                        onSubmitValue: (value) => {
                            return value
                        },
                    },
                    {
                        name: "birthDate",
                        validations: [{type: "required"}],
                        value: get(values, 'birthDate'),
                        onSubmitValue: (value) => time.timeFormater(value, 'YYYY-MM-DD'),
                    },
                    {
                        name: "jobStartDate",
                        validations: [{type: "required"}],
                        value: get(values, 'jobStartDate'),
                        onSubmitValue: (value) => time.timeFormater(value, 'YYYY-MM-DD'),
                    },
                    {
                        name: "comeFrom",
                        validations: [{type: "required"}],
                        value: get(values, 'comeFrom'),
                        onSubmitValue: (value) => value,
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
                        name: "positionAssign",
                        validations: [{type: "required"}],
                        value: get(values, 'positionAssign'),
                        onSubmitValue: (value) => value,
                    },
                    {
                        name: "middleName",
                        validations: [{type: "required"}],
                        value: get(values, 'middleName'),
                        onSubmitValue: (value) => value
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
                        name: "livingAddress",
                        validations: [{type: "required"}],
                        value: get(values, 'livingAddress'),
                        onSubmitValue: (value) => value,
                    },
                    {
                        name: "carInfo",
                        // validations: [{type: "required"}],
                        value: get(values, 'livingAddress'),
                        onSubmitValue: (value) => {
                            if(!value) return null;
                            return  value
                        },
                    },
                    {
                        name: "childrenCount",
                        // validations: [{type: "required"}],
                        value: get(values, 'childrenCount'),
                        onSubmitValue: (value) => {
                            if(!value) return 0;
                            return  Number(value)
                        },
                    },
                    {
                        name: "anotherReasonText",
                        // validations: [{type: "required"}],
                        value: get(values, 'anotherReasonText'),
                        onSubmitValue: (value) => {
                            if(!value)  return null;
                            return  value
                        },
                    },
                    {
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
                        name: "reason",
                        validations: [{type: "required"}],
                        validationType: "object",
                        value: get(values, 'reason.data.id') ? {
                            label: get(values, 'reason.data.name'),
                            value: get(values, 'reason.data.id')
                        } : '',
                        onSubmitValue: (value) => {
                            return value.value
                        }
                    },
                    {
                        name: "rank",
                        validations: [{type: "required"}],
                        validationType: "object",
                        value: get(values, 'rank.data.id') ? {
                            label: get(values, 'rank.data.name'),
                            value: get(values, 'rank.data.id')
                        } : '',
                        onSubmitValue: (value) => {
                            return value.value
                        }
                    },
                    {
                        name: "position",
                        validations: [{type: "required"}],
                        validationType: "object",
                        value: get(values, 'position.data.id') ? {
                            label: get(values, 'position.data.name'),
                            value: get(values, 'position.data.id')
                        } : '',
                        onSubmitValue: (value) => {
                            return value.value
                        }
                    },
                    {
                        name: "graduation",
                        validations: [{type: "required"}],
                        validationType: "object",
                        value: get(values, 'graduation.data.id') ? {
                            label: get(values, 'graduation.data.name'),
                            value: get(values, 'graduation.data.id')
                        } : '',
                        onSubmitValue: (value) => {
                            return value.value
                        }
                    },
                    {
                        name: "familyStatus",
                        validations: [{type: "required"}],
                        validationType: "object",
                        value: get(values, 'familyStatus.data.id') ? {
                            label: get(values, 'familyStatus.data.name'),
                            value: get(values, 'familyStatus.data.id')
                        } : '',
                        onSubmitValue: (value) => {
                            delete value.label;
                            return { id: value.value, hasChild: value.hasChild }
                        }
                    },
                    {
                        name: "hasCar",
                        value: `${get(values, 'hasCar')}` ?? false,
                        onSubmitValue: (value) => {
                            const _item = value === 'Ha' ? true : false
                            return _item;
                        }
                    }

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
                                    {/*sureName*/}
                                    <div className="col-4 col-sm-6 col-md-4">
                                        <FastField
                                            name="sureName"
                                            component={Fields.InputText}
                                            label={t('sure-name')}
                                            // placeholder="Фамилия"
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
                                    {/*birthDate*/}
                                    <div className="col-4 col-sm-6 col-md-4">
                                        <FastField
                                            name="birthDate"
                                            component={Fields.DatePicker}
                                            hasTimeSelect
                                            label={t('birthdate')+"*"}
                                            placeholder={t('birthdate')+"*"}
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
                                    {/*middlename*/}
                                    <div className="col-4 col-sm-6 col-md-4">
                                        <FastField
                                            name="middleName"
                                            component={Fields.InputText}
                                            label={t('middle-name')}
                                            // placeholder="Отасининг исми"
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
                                    <div className='col-4 col-md-6 col-xl-4 col-lg-4'>
                                        <ControlLabel label={t('personal-car')}/> <br/>
                                        <div className="d-flex">
                          <span>
                            <FastField
                                name="hasCar"
                                component={Fields.RadioButton}
                                label={t('yes')}
                                value={t('yes')}
                            />
                          </span>
                                            <span className='ml_10'>
                            <FastField
                                name="hasCar"
                                component={Fields.RadioButton}
                                label={t("no")}
                                value={t("no")}
                            />
                       </span>
                                        </div>
                                    </div>
                                    {values.hasCar === t('yes') &&<div className="col-4 col-sm-6 col-md-4">
                                        <FastField
                                            name="carInfo"
                                            component={Fields.InputText}
                                            label={t('car-number-data')}
                                            // placeholder="Тугилган жойи"
                                        />
                                    </div>}
                                </div>
                            </div>
                            <div className="col-12">
                                <div className='row g-4'>
                                    {/*graduation*/}
                                    <div className="col-3 col-md-4 col-lg-4 col-xl-4 col-lg-3 col-sm-6">
                                        <FastField
                                            name="graduation"
                                            component={Fields.AsyncSelect}
                                            loadOptionsUrl={'/user-graduations'}
                                            loadOptionsKey={(data) => data?.data?.map((el) => ({
                                                label: el.name,
                                                value: el.id
                                            }))}
                                            label={t('graduation')}
                                            // placeholder="Исми"
                                        />
                                    </div>
                                    {/*rank*/}
                                    <div className="col-3 col-md-4 col-lg-4 col-xl-4 col-lg-3 col-sm-6">
                                        <FastField
                                            name="rank"
                                            component={Fields.AsyncSelect}
                                            loadOptionsUrl={'/user-ranks'}
                                            loadOptionsKey={(data) => data?.data?.map((el) => ({
                                                label: el.name,
                                                value: el.id
                                            }))}
                                            label={t('rank')}
                                            // placeholder="Исми"
                                        />
                                    </div>
                                    {/*position*/}
                                    <div className="col-3 col-md-4 col-lg-4 col-xl-4 col-lg-3 col-sm-6">
                                        <FastField
                                            name="position"
                                            component={Fields.AsyncSelect}
                                            loadOptionsUrl={'/user-positions'}
                                            loadOptionsKey={(data) => data?.data?.map((el) => ({
                                                label: el.name,
                                                value: el.id
                                            }))}
                                            label={t('positions')}
                                            // placeholder="Исми"
                                        />
                                    </div>
                                    {/*familyStatus*/}
                                    <div className="col-3 col-md-4 col-lg-4 col-xl-4 col-lg-3 col-sm-6">
                                        <FastField
                                            name="familyStatus"
                                            component={Fields.AsyncSelect}
                                            loadOptionsUrl={'/user-family-statuses'}
                                            loadOptionsKey={(data) => data?.data?.map((el) => ({
                                                label: el.name,
                                                value: el.id,
                                                hasChild: el.hasChild
                                            }))}
                                            label={t('family-status')}
                                            // placeholder="Исми"
                                        />
                                    </div>
                                    {(values?.familyStatus?.hasChild)&&<div className="col-3 col-md-4 col-lg-4 col-xl-4 col-lg-3 col-sm-6">
                                        <FastField
                                            name="childrenCount"
                                            component={Fields.InputText}
                                            label={t('child-count')}
                                            // placeholder="Исми"
                                        />
                                    </div>}
                                    {/*jobStartDate*/}
                                    <div className="col-3 col-md-4 col-lg-4 col-xl-4 col-lg-3 col-sm-6">
                                        <FastField
                                            name="jobStartDate"
                                            component={Fields.DatePicker}
                                            label={t('working-time')}
                                            placeholder={t('working-time')}
                                        />
                                    </div>
                                    {/*positionAssign*/}
                                    <div className="col-3 col-md-4 col-lg-4 col-xl-4 col-lg-3 col-sm-6">
                                        <FastField
                                            name="positionAssign"
                                            component={Fields.InputText}
                                            label={t('positions-assign')}
                                            // placeholder="Исми"
                                        />
                                    </div>
                                    {/*comeFrom*/}
                                    <div className="col-3 col-md-4 col-lg-4 col-xl-4 col-lg-3 col-sm-6">
                                        <FastField
                                            name="comeFrom"
                                            component={Fields.InputText}
                                            label={t('field-get')}
                                            // placeholder="Исми"
                                        />
                                    </div>
                                    {/*reason*/}
                                    <div className="col-3 col-md-4 col-lg-4 col-xl-4 col-lg-3 col-sm-6">
                                        <FastField
                                            name="reason"
                                            component={Fields.AsyncSelect}
                                            loadOptionsUrl={'/user-reasons'}
                                            loadOptionsKey={(data) => data?.data?.map((el) => ({
                                                label: el.name,
                                                value: el.id,
                                                list: el.isDiff
                                            }))}
                                            label={t('user-reason')}
                                            // placeholder="Исми"
                                        />
                                    </div>
                                    {/*anotherReasonText*/}
                                    {values.reason.list&&<div className="col-3 col-md-4 col-lg-4 col-xl-4 col-lg-3 col-sm-6">
                                        <FastField
                                            name="anotherReasonText"
                                            component={Fields.InputText}
                                            label={t('reason')}
                                            // placeholder="Исми"
                                        />
                                    </div>}

                                </div>
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

