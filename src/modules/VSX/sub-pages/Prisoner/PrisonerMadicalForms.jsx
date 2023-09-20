import React, {useState} from 'react';
import {DropDown, InputSearch, TabBase} from "../../../../components";
import {MForms} from "../../components/prisoners-components";
import '../../styles/prisoners.scss'
import {useTranslation} from "react-i18next";
import {SForms} from "../../components/prisoners-components/SForms";
import {DrogDrop} from "../../components/camera-compronents";
import {useFetchList} from "../../../../hooks";
function PrisonerMadicalForms(props) {
    const {t} = useTranslation()

    const {isUpdata} = props;
    const tabLabels =[t('prisoner-medical'),t('prisoner-serach'),t('prisoner-camera')];
    const [currentLables, setLables] = useState(tabLabels[0])
    const [active, setActive] = useState({
        isMadical: true,
        isSearch: false,
        isCamera: false
    })
    // console.log(cameraList)
    const cameraList = useFetchList({
        url: "/rooms",
        // urlSearchParams: {
        //   include: "patient",
        //     page:'1',
        //     pageSize: 10
        // },
    });
    // const handleTab = (evetn) => {
    //     setLables(evetn)
    //     const _currentIndex = tabLabels.indexOf(evetn)
    //     if(_currentIndex === 0) {
    //         setActive((old) => ({isSearch: false, isMadical: true, isCamera: false}))
    //     } else if (_currentIndex ===1) {
    //         setActive((old )=> ({isMadical: false, isSearch: true, isCamera: false}))
    //     } else if(_currentIndex ===2 ) {
    //         setActive((old )=> ({isMadical: false, isSearch: false, isCamera: true}))
    //     }
    //
    // }
    return (
        <div>
            <InputSearch isInput   text={'ВСХга олиб келинган шахсни  маълумотларини қўшиш Тиббий кўрик'}/>
            {/*<TabBase*/}
            {/*    labels={tabLabels}*/}
            {/*    currentLabel={currentLables}*/}
            {/*    className={'prisoner__tab__item'}*/}
            {/*    onPaneChange={(active,envt)=> {*/}
            {/*        handleTab(active)*/}
            {/*    }}*/}
            {/*/>*/}
            <div className='formsm__wrapper'>
                {/*{active.isMadical&&<MForms handleTab={handleTab} tablist={tabLabels[1]}/>}*/}
                {/*{active.isSearch&& <SForms  handleTab={handleTab} tablist={tabLabels[2]}/>}*/}
                <DrogDrop boardsList={cameraList.data} refetch={cameraList.refetch} isNewPrsonerAdd/>
            </div>
        </div>
    );
}

export default PrisonerMadicalForms;
