import React, {useEffect, useState} from "react";
import get from "lodash";
import {InputSearch} from "components";
import {useTranslation} from "react-i18next";
import {} from 'react-dom'
import {useFetchOne, useGetLanguage} from "hooks";
import { useNavigate } from "react-router-dom";
import {useParams} from "react-router-dom";
import '../../styles/prisoners.scss'
import {EForms} from "../../components/employees-components";
const EmployessForms = () => {
    const {t} = useTranslation()
    const navLink = useNavigate()
    const {id}= useParams();
    const { getLanguageValue } = useGetLanguage();
    const [isUpdate, setUpdate] = useState(false)
    const [values, setValues] = useState({})
    const {setId,data} = useFetchOne({
        url:`prisoners`,
        urlSearchParams: {
            populate: '*'
        }

    })
    useEffect(()=> {
        if(id !== 'create') {
            setUpdate(true)
            setId(id)
        }
    }, [id])
    return (
        <>

            <InputSearch isInput   text={t('employees-list-add')}/>
            <div className='forms__wrapper'>
                <EForms/>
            </div>
        </>
    );
};

export default EmployessForms;
