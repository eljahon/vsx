import React, {useState} from 'react';
import {InputSearch, TabBase} from "../../../../components";
import '../../styles/prisoners.scss'
import {useTranslation} from "react-i18next";
import {DrogDrop} from "../../components/camera-compronents";
import {useFetchList} from "../../../../hooks";
function PrisonerMadicalForms(props) {
    const {t} = useTranslation()
    const {isUpdata} = props;
    const userData = JSON.parse(localStorage.getItem('userData'));
    const tabLabels =[t('prisoner-medical'),t('prisoner-serach'),t('prisoner-camera')];
    const [currentLables, setLables] = useState(tabLabels[0])
    const filter={}

    if(userData.vsx) {
        filter['vsx'] =userData.vsx.id
    }
    const cameraList = useFetchList({
        url: "/rooms",
        urlSearchParams: {
            sort: { id: "desc" },
            populate: "prisoners, prisoners.person",
            filters:filter
        },
    });
    return (
        <div>
            <InputSearch isInput   text={t('prisoner-get-data-add')}/>
            <div className='formsm__wrapper'>
                <DrogDrop boardsList={cameraList.data} refetch={cameraList.refetch} isNewPrsonerAdd/>
            </div>
        </div>
    );
}

export default PrisonerMadicalForms;
