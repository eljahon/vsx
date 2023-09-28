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
import {returnForms} from "../../components/camera-compronents/camera-forms";
export const VsxForms = (props) => {
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
                url={get(values, "id") ? `/vsxes/${get(values, "id")}` : "/vsxes"}
                onSuccess={() => {
                    navLink(-1);
                }}
                fields={[
                    {
                        name: "name",
                        validations: [{ type: "required" }],
                        value: get(values, "name"),
                        onSubmitValue: (value) => {
                            return value;
                        },
                    },
                    {
                        name: "phone",
                        validations: [{ type: "required" }],
                        value: get(values, "phone"),
                        onSubmitValue: (value) => value,
                    },
                    {
                        name: "region",
                        validations: [{type: "required"}],
                        validationType: "object",
                        value: get(values, 'id') ?  {label: get(values, 'region.name'),value:get(values, 'region.id')} : "",
                        onSubmitValue: (value) => value.value,
                    }
                ]}
            >
                {({ isSubmitting, values, ...rest}) => {
                    console.log(rest)
                    return <>
                        <div className="row g-4">
                            <div className="col-10">
                                <div className="row g-4">
                                    {/*passport*/}
                                    <div className="col-4 col-md-6 col-lg-6 col-xl-6 col-sm-12">
                                        <FastField
                                            name="region"
                                            component={Fields.AsyncSelect}
                                            loadOptionsUrl={"/regions"}
                                            loadOptionsKey={(data) =>
                                                data?.data?.map((el) => ({
                                                    label: el.name,
                                                    value: el.id,
                                                }))
                                            }
                                            label={t('VSX-address')}
                                            // placeholder="Миллати"
                                        />
                                    </div>
                                    <div className="col-4 col-md-6 col-lg-6 col-xl-6 col-sm-12">
                                        <FastField
                                            name="name"
                                            component={Fields.InputText}
                                            label={t('VSX-name')}
                                            // placeholder="Серия ва рақам *"
                                            required
                                        />
                                    </div>
                                    <div className="col-4 col-md-6 col-lg-6 col-xl-6 col-sm-12">
                                        <FastField
                                            name="phone"
                                            component={Fields.InputMask}
                                            label={t('VSX-phone')}
                                            // placeholder="Доимий рўйхатга олинган манзил"
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
                }}
            </Containers.Form>
        </>
    );
};
