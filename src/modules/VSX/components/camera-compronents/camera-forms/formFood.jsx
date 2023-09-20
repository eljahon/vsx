import React from 'react';
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Containers from "../../../../../containers";
import {get} from "lodash";
import {time} from "../../../../../services";
import {Button, Fields} from "../../../../../components";
import {FastField} from "formik";

function FormFood(props) {
    const navLink =useNavigate()
    const {values, customData, method} = props;
    const {t} =useTranslation()
    return (
        <div>
            <Containers.Form
                customData={customData}
                validate={(event) => {
                    console.log(event)}}
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
                    },
                    {
                        name: "responsibleOfficer",
                        validations: [{type: "required"}],
                        validationType: "object",
                        value: get(values, 'nationality') ?? '',
                        onSubmitValue: (value) => value.value,
                    },
                    {
                        name: "mealType",
                        validations: [{type: "required"}],
                        validationType: "object",
                        value: get(values, 'nationality') ?? '',
                        onSubmitValue: (value) => value.value,
                    },
                ]}

            >
                {({isSubmitting, values, setFieldValue, ...rest}) => {
                    console.log(values, rest)
                    return <>
                        <div className="row g-4">
                            <div className="col-xl-10 col-lg-10 col-md-12 col-sm-12">
                                <div className="row g-4">

                                    {/*birthdate*/}
                                    <div className="col-6 col-sm-12 col-md-12 col-xl-4 col-lg-6">
                                        <FastField
                                            name="responsibleOfficer"
                                            component={Fields.AsyncSelect}
                                            loadOptionsUrl={'/users'}
                                            loadOptionsKey={(data) => data?.map((el) => ({
                                                label: el.username,
                                                value: el.id
                                            }))}
                                            label={t('food-give-employees')}
                                            // placeholder="Миллати"
                                        />
                                    </div>
                                    <div className="col-6 col-sm-12 col-md-12 col-xl-4 col-lg-6">
                                        <FastField
                                            name="mealType"
                                            component={Fields.AsyncSelect}
                                            loadOptionsUrl={'/prisoner-meal-types'}
                                            loadOptionsKey={(data) => data?.data?.map((el) => ({
                                                label: el.name,
                                                value: el.id
                                            }))}
                                            label={t('food-give-type')}
                                            // placeholder="Миллати"
                                        />
                                    </div>
                                    <div className="col-6 col-sm-12 col-md-12 col-xl-4 col-lg-6">
                                        <FastField
                                            name="time"
                                            component={Fields.DatePicker}
                                            hasTimeSelect
                                            maskformat={'####-##-## ##:##'}
                                            format={'YYYY-MM-DD HH:mm'}
                                            label={t('food-give-time')}
                                            placeholder="Tug'ilgan Sanasi *"
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
                                text={t('walk-out')}
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

export default FormFood;
