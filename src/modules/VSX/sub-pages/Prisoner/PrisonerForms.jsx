import React, {useEffect, useState} from "react";
import get from "lodash";
import {InputSearch}  from "components";
import {useTranslation} from "react-i18next";
import {} from 'react-dom'
import {useFetchOne, useGetLanguage} from "hooks";
import {PForms} from '../../components/prisoners-components'
import {useParams} from "react-router-dom";
import '../../styles/prisoners.scss'
const PrisonerForms = () => {
    const {t} = useTranslation()
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

            <InputSearch isInput   text={t('prisoner-list-add')}/>
               <PForms
                   isUpdata={isUpdate}
                   values={data ?{id: data.id, ...data.attributes} : null}
               />
        </>
    );
};

export default PrisonerForms;
