import React, {useEffect, useState} from "react";
import get from "lodash";
import {PageHeading, Table, Pagination, InputSearch, HeaderFilters, DropDown} from "components";
import {useTranslation} from "react-i18next";
import {} from 'react-dom'
import {useFetchList, useFetchOne, useGetLanguage, useOverlay} from "hooks";
import { useNavigate } from "react-router-dom";
import {VsxForms} from './VsxForm'
import {useParams} from "react-router-dom";
import '../../styles/prisoners.scss'
const VSXForms = () => {
    const {t} = useTranslation()
    const navLink = useNavigate()
    const {id}= useParams();
    const { getLanguageValue } = useGetLanguage();
    const {setId,data} = useFetchOne({
        url:`/vsxes`,
        urlSearchParams: {
            populate: '*'
        }

    })
    useEffect(()=> {
        if(id !== 'create') {
            setId(id)
        }
    }, [id])
    return (
        <>
            <InputSearch isInput   text={t('VSX-add')}/>
            <div className='forms__wrapper'>
                <VsxForms values={data ?{id: data.id, ...data} : null}/>
            </div>
        </>
    );
};

export default VSXForms;
