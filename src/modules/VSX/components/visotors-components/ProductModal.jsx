import React, {useState} from "react";
import { FastField } from "formik";
import { get } from "lodash";
import '../prisoners-components/styleds/tintuv.scss'
import Containers from "containers";
import {
    ModalDefault,
    Fields,
    Button,
    FileUpload,
    AvatarUpload, AttachFile,
} from "components";
import { UploadBase } from "components/Upload/UploadBase";
import {useTranslation} from "react-i18next";
import dayjs from "dayjs";

export const ProductModal = ({
                                   isOpen,
                                   handleOverlayClose,
                                   handleOverlayOpen,
                                   values,refetch,
    setValueClear
                               }) => {
    const {t} = useTranslation()
    const [isRej, setRej] = useState(false)
    const handleReject = () => {
        setRej(true)
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
    return (
        <ModalDefault
            isOpen={isOpen}
            handleModalClose={handleOverlayClose}
            title={t('give-access')}
            innerClass="max-width_500"
        >
            <Containers.Form
                method={'put'}
                url={`/visits/${values?.id}`}
                onSuccess={() => {
                    handleOverlayClose();
                    refetch()
                    setValueClear([])
                }}
                fields={[

                    {
                        name: "isNew",
                        // validations: [{ type: "required" }],
                        // validationType: "object",
                        onSubmitValue: (value) => {
                            return false
                        },
                    },

                    {
                        name: "isRejected",
                        onSubmitValue: (value) => {
                            return isRej ?? false
                        },
                    },
                    {
                        name: "receiptDoc",
                        // validations: [{type: "required"}],
                        value: get(values, 'receiptDoc'),
                        onSubmitValue: (value) => {
                            if(!value) return null;
                            return  value
                        },
                    },

                    // {
                    //   name: "vsxes",
                    //   validations: [{ type: "required" }],
                    //   // validationType: "object",
                    //   // value:get(values, 'responsibleUser.data.id') ?  {label: get(values, 'responsibleUser.data.attributes.username'),value:get(values, 'responsibleUser.data.id')} : '',
                    //   onSubmitValue: (value) => {
                    //     // console.log(value)
                    //     return value.value
                    //   },
                    // },
                ]}
            >
                {({ isSubmitting, ...rest}) =>{
                    return   <>
                        <div className="row g-4">


                            <div className="col-12 col-md-12 col-lg-6 col-xl-6 col-sm-12">
                                <h4>{t('visit-give-emploer')}</h4> <br/>
                                <Info
                                    className='w_full'
                                    label={t('fullname')}
                                    data={values?.responsibleOfficer?.firstName+" "+values?.responsibleOfficer?.sureName
                                    }/>
                            </div><div className="col-12 col-md-12 col-lg-6 col-xl-6 col-sm-12">
                            <h4>{t('visit-give-person')}</h4> <br/>
                                <Info
                                    className='w_full'
                                    label={t('fullname')}
                                    data={values?.visitor?.firstName+" "+values?.visitor?.sureName}/>
                            </div><div className="col-12 col-md-12 col-lg-6 col-xl-6 col-sm-12">
                                <Info
                                    className='w_full'
                                    label={t('visit-time')}
                                    icon
                                    data={dayjs(values?.date).format('DD.MM.YYYY HH:mm')}/>
                            </div>
                            <div className="col-12 col-md-12 col-lg-6 col-xl-6 col-sm-12">
                                <Info
                                    className='w_full'
                                    label={t('give-product-time')}
                                    icon
                                    data={dayjs().format('DD.MM.YYYY HH:mm')}/>
                            </div>



                            <div className="col-12 col-md-12 col-lg-12 col-xl-12 col-sm-12">
                                <h4>{t('give-product')}</h4> <br/>
                            <div className='row'>
                                {values?.items?.length&&values?.items?.map(el=> {
                                    return (
                                        <>
                                        <div className='col-6'>
                                            <Info
                                                className='w_full'
                                                data={el.key}/>
                                        </div>
                                        <div className='col-6'>
                                            <Info
                                                className='w_full'
                                                data={el.value}/>
                                        </div>
                                        </>
                                    )
                                })}

                            </div>
                            </div>
                            {isRej&&
                                <div className="col-12 col-md-12 col-lg-6 col-xl-6 col-sm-12">
                                    <h2 className='search_label'>{t('minutes')}</h2>
                                    <div className='file-upload'>
                                        <FastField
                                            name="receiptDoc"
                                            title={t('file')}
                                            component={AttachFile}
                                            label={t('minutes')}
                                        />
                                    </div>
                                </div>}
                        </div>

                        <div className='d-flex g_10'>
                            {!isRej &&  <Button
                                design="cancel"
                                onClick={handleReject}
                                className="modal-btn fz_16 btn mt_40"
                                text={t('reject')}
                                isLoading={isSubmitting}
                            />}
                            <Button
                            design="primary"
                            type="submit"
                            className="modal-btn fz_16 btn mt_40"
                            text={t('save')}
                            isLoading={isSubmitting}
                        />
                        </div>
                    </>
                }}
            </Containers.Form>
        </ModalDefault>
    );
};
