import React, {useEffect, useState} from "react";
import get from "lodash";
import {PageHeading, Table, Pagination, InputSearch, HeaderFilters} from "components";
import {useTranslation} from "react-i18next";
import {} from 'react-dom'
import {useFetchList, useFetchOne, useGetLanguage, useOverlay} from "hooks";
import { useNavigate } from "react-router-dom";
import {VForms} from '../../components/visotors-components'
import {useParams} from "react-router-dom";
import '../../styles/prisoners.scss'
const VisitorsForms = () => {
    const {t} = useTranslation()
    const navLink = useNavigate()
    const {id}= useParams();
    const { getLanguageValue } = useGetLanguage();
    const {setId,data} = useFetchOne({
        url:`/visitors`,
        urlSearchParams: {
            populate: '*'
        }

    })
    useEffect(()=> {
        if(id !== 'create') {
            // setUpdate(true)
            setId(id)
        }
    }, [id])
    return (
        <>

            <InputSearch isInput   text={'ВСХда йўқловдаги фуқаролар'}/>
            <div className='forms__wrapper'>
                <VForms values={data ?{id: data.id, ...data.attributes} : null}/>
            </div>
        </>
    );
};

export default VisitorsForms;
