
import React, {useState} from "react";
import get from "lodash";
import {Avatar, Button, TabBase, Typography} from "../../../../components";
import '../../styles/prisoners.scss'
import {useTranslation} from "react-i18next";
import userAva from "../../../../assets/images/user.png";
import {IsInvalid} from "../../components/prisoners-components";

 const PrisonerDetail =() => {
     const {t} = useTranslation()
    const tabLabels =[t('prisoner-data'),t('visitor-history'),t('documents-type') ];
     const [currentLables, setLables] = useState(tabLabels[0])
     const tabBtnList =[
         {
         text: t('extension-of-time'),
         class: 'prisoner__item__btn'
     },
         {
             text: t('medical'),
             class: 'prisoner__item__btn',
             icon:false
         },  {
             text: t('absence'),
             class: 'prisoner__item__btn',
             icon:false
         }, {
             text: t('edit'),
             class: 'prisoner__item__btn bg-edit',
             icon:<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
                 <path d="M11.7167 7.51667L12.4833 8.28333L4.93333 15.8333H4.16667V15.0667L11.7167 7.51667ZM14.7167 2.5C14.5083 2.5 14.2917 2.58333 14.1333 2.74167L12.6083 4.26667L15.7333 7.39167L17.2583 5.86667C17.5833 5.54167 17.5833 5.01667 17.2583 4.69167L15.3083 2.74167C15.1417 2.575 14.9333 2.5 14.7167 2.5ZM11.7167 5.15833L2.5 14.375V17.5H5.625L14.8417 8.28333L11.7167 5.15833Z" fill="black"/>
             </svg>
         }, {
             text: t('expelling'),
             class: 'prisoner__item__btn bg-expelling',
             icon:false
         }
     ];
        return (
            <div>
<div className="prisoner__item">
    {/*item user */}
   <div className="prisoner__header">
       <div className="sidebar__admin d-flex align-items-center justify-content-between">
        <div className="prisoner__data">
            <Avatar size="md" borderColor="white" className="mr_10" src={userAva} />
            <div className="sidebar__admin-info">
                {/*<Typography Type="p" className="sidebar__role" text={"Инспектор"} />*/}
                <Typography
                    Type="h4"
                    className="prisoner__name"

                    append={IsInvalid(true)}
                    text={"Маърупов Олимжон"}
                >
                </Typography>
                <Typography
                    Type="p"
                    className="prisoner__pnfl "
                    text={"Жойлаштирил 04.04.2023 16:30"}
                />
            </div>
        </div>
           <div className="prisoner__btn__wrapper">
               {tabBtnList.map((el, index) => (
                   <Button key={index} onClick={(event) => {console.log(event, el)}} prepend={el.icon} text={el.text} className={el.class}/>
               ))}
           </div>
       </div>
       <div className="prisoner__tab__wrapper">
<TabBase
    labels={tabLabels}
    currentLabel={currentLables}
    className={'prisoner__tab__item'}
    onPaneChange={(event)=> setLables(event)}
/>

       </div>
   </div>
</div>
            </div>
        );
    };
export default PrisonerDetail
