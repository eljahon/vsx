import React from "react";
import { FastField } from "formik";
import { useSelector } from "react-redux";
import { get } from "lodash";

import { userSelector } from "store/selectors";
import {useGetLanguage,} from "hooks";
import { constants, time, utils } from "services";
// import TimePicker from "react-multi-date-picker/plugins/time_picker";
import {useTranslation} from "react-i18next";
import Containers from "containers";
import {
    Fields,
    Button,
    AvatarUpload,
} from "components";
import {useParams} from "react-router-dom";

export const MForms = (props) => {
    const {
        values,
        handleOverlayClose,
        onAddedNewRecord,
        setActive,
        handleTab,
        tablist
    } = props;
    const {t} = useTranslation()
    // console.log(get(values, 'responsibleUser.data.attributes.username'), isUpdate)
    const { getLanguageValue } = useGetLanguage();
    const user = useSelector(userSelector);
    const {pr_id} = useParams()

    return (
        <>
            <Containers.Form
                method={get(values, "id") ? "put" : "post"}
                url={get(values, "id") ? `/med-exams/${get(values, "id")}` : "/med-exams"}
                customData={{prisoner: Number(pr_id)}}
                onSuccess={() => {
                    handleTab(tablist)
                }}
                onError={(err) => {
                    // console.log(err)

                }}
                fields={[
                    {
                        name: "date",
                        validations: [{ type: "required" }],
                        value: get(values, 'passport'),
                        onSubmitValue: (value) => {
                            return time.timeFormater(value, 'YYYY-MM-DD HH:mm')
                        },
                    },
                    {
                        name: "responsibleEmployee",
                        validations: [{ type: "required" }],
                        validationType: "object",
                        value:get(values, 'responsibleEmployee.data.id') ?  {label: get(values, 'responsibleEmployee.data.attributes.username'),value:get(values, 'responsibleEmployee.data.id')} : '',
                        onSubmitValue: (value) => {
                            return  value.value
                        }
                    },
                    {
                        name: "responsibleMedEmployees",
                        validations: [{ type: "required" }],
                        value: get(values, 'responsibleMedEmployees'),
                        onSubmitValue: (value) => value,
                    },
                    {
                        name: "additionalNotes",
                        validations: [{ type: "required" }],
                        value: get(values, 'additionalNotes'),
                        onSubmitValue: (value) => value,
                    },
                    {
                        name: "isInjured",
                        value:get(values, 'isInjured'),
                        onSubmitValue: (value) => {
                            const _item = value === 'yes' ? true :  false
                            return _item;
                        }
                    },

                ]}
            >
                {({ isSubmitting }) => (
                    <>
                        <div className="row g-4">

                            <div className="col-10">
                                <div className="row g-4">
                                    <div className="col-4">
                                        <FastField
                                            name="date"
                                            component={Fields.DatePicker}
                                            label={t('medical-date')+"*"}
                                            placeholder={t('medical-date')}
                                            maskformat={'####-##-## ##:##'}
                                            format={'YYYY-MM-DD HH:mm'}
                                            hasTimeSelect
                                        />
                                    </div>
                                    <div className="col-4">
                                        <FastField
                                            name="responsibleEmployee"
                                            loadOptionsUrl={'/users'}
                                            component={Fields.AsyncSelect}
                                            loadOptionsKey={(data) => data?.map((el) => ({label: el.username, value:el.id}))}
                                            label={t('responsible-employees')}
                                            placeholder={t('responsible-employees')}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <FastField
                                            name="responsibleMedEmployees"
                                            component={Fields.InputText}
                                            label={t('medical-staff')}
                                            placeholder={t('medical-staff')}
                                        />
                                    </div>
                                    {/*address*/}
                                    <div className="col-2">
                                        <p className="mb_20">{t('Injuries')}</p>
                                        <div className="d-flex justify-content-between">
                                            <FastField
                                                name="isInjured"
                                                component={Fields.RadioButton}
                                                label={t('yes')}
                                                value={'yes'}
                                            />
                                            <FastField
                                                name="isInjured"
                                                component={Fields.RadioButton}
                                                label={t('no')}
                                                value={'no'}
                                            />
                                        </div>
                                    </div>
                                    {/*livingAddress*/}
                                    <div className="col-8">
                                        <FastField
                                            name="additionalNotes"
                                            component={Fields.Textarea}
                                            label={t('additional-notes')}
                                            // placeholder="Исми"
                                        />
                                    </div>
                                    {/*<div className='col-12'><h1>{t('to-search')}</h1></div>*/}
                                    {/*<div className="col-4">*/}
                                    {/*    <FastField*/}
                                    {/*        name="birthdate"*/}
                                    {/*        component={Fields.DatePicker}*/}
                                    {/*        label={t('to-search-date')+"*"}*/}
                                    {/*        placeholder={t('to-search-date')}*/}
                                    {/*        maskformat={'####-##-## ##:##'}*/}
                                    {/*        format={'YYYY-MM-DD HH:mm'}*/}
                                    {/*        hasTimeSelect*/}
                                    {/*    />*/}
                                    {/*</div>*/}
                                    {/*<div className="col-4">*/}
                                    {/*    <FastField*/}
                                    {/*        name="responsibleUser"*/}
                                    {/*        loadOptionsUrl={'/users'}*/}
                                    {/*        component={Fields.AsyncSelect}*/}
                                    {/*        loadOptionsKey={(data) => data?.map((el) => ({label: el.username, value:el.id}))}*/}
                                    {/*        label={t('responsible-employees')}*/}
                                    {/*        placeholder={t('responsible-employees')}*/}
                                    {/*    />*/}
                                    {/*</div>*/}
                                    {/*<div className="col-2">*/}
                                    {/*    <p className="mb_20">{t('available-items')}</p>*/}
                                    {/*    <div className="d-flex justify-content-between">*/}
                                    {/*        <FastField*/}
                                    {/*            name="isLGBT"*/}
                                    {/*            component={Fields.RadioButton}*/}
                                    {/*            label={t('yes')}*/}
                                    {/*        />*/}
                                    {/*        <FastField*/}
                                    {/*            name="isLGBT"*/}
                                    {/*            component={Fields.RadioButton}*/}
                                    {/*            label={t('now')}*/}
                                    {/*        />*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    {/*<div className="col-4">*/}
                                    {/*    <FastField*/}
                                    {/*        name="livingAddress"*/}
                                    {/*        component={Fields.InputText}*/}
                                    {/*        label={t('that-came')}*/}
                                    {/*        // placeholder="Яшаш жойи"*/}
                                    {/*    />*/}
                                    {/*</div>*/}
                                    {/*<div className="col-4">*/}
                                    {/*    <FastField*/}
                                    {/*        name="gender"*/}
                                    {/*        component={Fields.InputText}*/}
                                    {/*        label={''}*/}
                                    {/*        // placeholder="Отасининг исми"*/}
                                    {/*    />*/}
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
