import React from 'react';
import {InputSearch} from "../../../../components";
import {MForms} from "../../components/prisoners-components";
import '../../styles/prisoners.scss'
function PrisonerMadicalForms(props) {
    const {isUpdata} = props;
    return (
        <div>
            <InputSearch isInput   text={'ВСХга олиб келинган шахсни  маълумотларини қўшиш Тиббий кўрик'}/>
            <div className='formsm__wrapper'>
                <MForms
                    isUpdata={isUpdata}
                    // values={data ?{id: data.id, ...data.attributes} : null}
                />
            </div>
        </div>
    );
}

export default PrisonerMadicalForms;
