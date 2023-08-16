import React, {useEffect, useState} from "react";
import get from "lodash";
import {PageHeading, Table, Pagination, InputSearch, HeaderFilters} from "components";
import {useTranslation} from "react-i18next";
import {} from 'react-dom'
import {useFetchList, useFetchOne, useGetLanguage, useOverlay} from "hooks";
import { useNavigate } from "react-router-dom";
import {PForms} from '../../components/prisoners-components'
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
                {/*<PForms*/}
                {/*    isUpdata={isUpdate}*/}
                {/*    values={data ?{id: data.id, ...data.attributes} : null}*/}
                {/*/>*/}
                <EForms/>
            </div>
        </>
    );
};

export default EmployessForms;
