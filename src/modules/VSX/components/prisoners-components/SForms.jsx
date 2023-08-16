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

export const SForms = (props) => {
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
                url={get(values, "id") ? `/searches/${get(values, "id")}` : "/searches"}
                customData={{prisoner: pr_id}}
                onSuccess={() => {
                    handleTab(tablist)

                }}
                onError={() => {
                    handleTab(tablist)

                }}
                fields={[
                    {
                        name: "date",
                        validations: [{ type: "required" }],
                        value: get(values, 'date'),
                        onSubmitValue: (value) => time.timeFormater(value, 'YYYY-MM-DD'),
                    },

                    {
                        name: "items",
                        validations: [{ type: "required" }],
                        value: get(values, 'date'),
                        onSubmitValue: (value) => time.timeFormater(value, 'YYYY-MM-DD'),
                    },


                    {
                        name: "hasItems",
                        validations: [{ type: "required" }],
                        value: `${get(values, 'hasItems')}` ?? false,
                        onSubmitValue: (value) => {
                            const _item = value === 'yes' ? true :  false
                            return _item;
                        }
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
                ]}
            >
                {(formick) => {
                    return   <>
                        <div className="row g-4">

                            <div className="col-10">
                                <div className="row g-4">
                                    <div className='col-12'><h1>{t('to-search')}</h1></div>
                                    <div className="col-4">
                                        <FastField
                                            name="date"
                                            component={Fields.DatePicker}
                                            label={t('to-search-date')+"*"}
                                            placeholder={t('to-search-date')}
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
                                    <div className="col-2">
                                        <p className="mb_20">{t('available-items')}</p>
                                        <div className="d-flex justify-content-between">
                                            <FastField
                                                name="hasItems"
                                                component={Fields.RadioButton}
                                                label={t('yes')}
                                                value={t('yes')}
                                            />
                                            <FastField
                                                name="hasItems"
                                                component={Fields.RadioButton}
                                                label={t('now')}
                                                value={t('now')}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <FastField
                                            name="items"
                                            component={Fields.InputText}
                                            label={t('that-came')}
                                            // placeholder="Яшаш жойи"
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
                            isLoading={formick.isSubmitting}
                        />
                    </>
                }

                }
            </Containers.Form>
        </>
    );
};
