import React from 'react';
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Containers from "../../../../../containers";
import {get} from "lodash";
import {time} from "../../../../../services";
import {FastField} from "formik";
import {AttachFile, Button,Fields} from "../../../../../components";

function FormEtap(props) {
    const navLink = useNavigate()
    const {values, customData, method, title} = props;
    const {t} = useTranslation()
    return (
        <div>
            <Containers.Form
                customData={customData}
                validate={(event) => {
                    // console.log(event)
                }}
                method={"post"}
                url={"/prisoner/leave-room"}
                onSuccess={({data}) => {
                    method()
                }}
                onError={() => {
                    method()
                }}
                fields={[
                    {
                        name: "time",
                        validations: [{type: "required"}],
                        value: get(values, 'birthdate'),
                        onSubmitValue: (value) => time.timeFormater(value, 'YYYY-MM-DD'),
                    }, {
                        name: "medicalDiagnosis",
                        validations: [{type: "required"}],
                        value: get(values, 'medicalDiagnosis'),
                        onSubmitValue: (value) => value,
                    },
                    {
                        name: "worker",
                        validations: [{type: "required"}],
                        value: get(values, 'worker'),
                        onSubmitValue: (value) => value,
                    },
                    {
                        name: "responsibleOfficer",
                        validations: [{type: "required"}],
                        validationType: "object",
                        value: get(values, 'nationality') ?? '',
                        onSubmitValue: (value) => value.value,
                    },
                    {
                        name: "document",
                        value: get(values, 'worker') ?? '',
                        onSubmitValue: (value) => {
                            if(!value)  return null;
                            return value;
                        },
                    },
                ]}

            >
                {({isSubmitting, values, setFieldValue, ...rest}) => {
                    // console.log(values, rest)
                    return <>
                        <div className="row g-4">
                            <div className="col-xl-10 col-lg-10 col-md-12 col-sm-12">
                                <div className="row g-4">

                                    {/*birthdate*/}
                                    <div className="col-6 col-sm-12 col-md-12 col-xl-4 col-lg-4">
                                        <FastField
                                            name="responsibleOfficer"
                                            component={Fields.AsyncSelect}
                                            loadOptionsUrl={'/users'}
                                            loadOptionsKey={(data) => data?.map((el) => ({
                                                label: el.username,
                                                value: el.id
                                            }))}
                                            label={t('check-employees')}
                                            // placeholder="Миллати"
                                        />
                                    </div>
                                    <div className="col-6 col-sm-12 col-md-12 col-xl-4 col-lg-4">
                                        <FastField
                                            name="worker"
                                            component={Fields.InputText}
                                            hasTimeSelect
                                            label={t('con-employees')}
                                        />
                                    </div>
                                    <div className="col-6 col-sm-12 col-md-12 col-xl-4 col-lg-4">
                                        <h2 className='search_label'>{t('main-doc')}</h2>
                                        <div className='file-upload'>
                                            <FastField
                                                name="document"
                                                title={t('file')}
                                                component={AttachFile}
                                                label={t('minutes')}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6 col-sm-12 col-md-12 col-xl-4 col-lg-4">
                                        <FastField
                                            name="time"
                                            component={Fields.DatePicker}
                                            hasTimeSelect
                                            maskformat={'####-##-## ##:##'}
                                            format={'YYYY-MM-DD HH:mm'}
                                            label={t('inquest-out-time')}
                                            placeholder={t('inquest-out-time')}
                                        />
                                    </div>
                                    {/*nationality*/}


                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <Button
                                design="primary"
                                type="submit"
                                className="modal-btn-end fz_16 btn mt_40"
                                text={title.name}
                                isLoading={isSubmitting}
                            />
                        </div>
                    </>
                }

                }

            </Containers.Form>
        </div>
    );
}

export default FormEtap;
