import React from 'react';
import './styles/userInfo.scss'
import {ReactComponent as UserInfoIcon } from '../../../../assets/icons/userInfo.svg'
import {ReactComponent as BirthdayIcon } from '../../../../assets/icons/birthdayIcon.svg'
import {ReactComponent as Gendor } from '../../../../assets/icons/gendor.svg'
import {ReactComponent as Nation } from '../../../../assets/icons/nation.svg'
import {ReactComponent as Passport } from '../../../../assets/icons/passport.svg'
import { useTranslation } from 'react-i18next';

    const iconList = {
        user: <UserInfoIcon/>,
        birthday: <BirthdayIcon/>,
        nation: <Nation/>,
        passpor: <Passport/>,
        gendor: <Gendor/>
    }
const  UserInfo = (props) => {
    const { t } = useTranslation();
    const {item} = props;
    const list =
    [
        {
            userName: item?.person?.firstName,
            key: 'Исм',
            icon: "user"
        },
        {
            userName: item?.person?.sureName,
            key: 'Фамилия',
            icon: "user"
        },
        {
            userName: item?.person?.middleName,
            key: 'Отасининг исми',
            icon: "user"
        },
        {
            userName: item?.person?.birthAddress,
            key: `Tug'ilgan joyi`,
            icon: "user"
        },
        {
            userName: item?.person?.birthAddress,
            key: `Tug'ilgan joyi`,
            icon: "user"
        },
        {
            userName: item?.person?.birthdate,
            key: 'Тугилган сана',
            icon: "user"
        },
        {
            userName: item?.person?.gender?.name,
            key: 'Жинси',
            icon: "birthday"
        },
        {
            userName: item?.person?.nationality?.name,
            key: 'Миллати',
            icon: "gendor"
        },
        {
            userName: item?.person?.nationality?.name,
            key: 'Фуқаролиги',
            icon: "passpor"
        },
        {
            userName: item?.person?.passport,
            key: 'Пасспорт / ID',
            icon: "passpor"
        },
        {
            userName: '--',
            key: 'ПИНФЛ',
            icon: "passpor"
        }
    ]
    console.log("s",item)
        return (
            <div className='user'>
                <div className="user_title p_d">{t('personal-data')}</div>
                {list.map((el, index) => (
                    <div className="user_item p_d" key={index}>
                        <div className='item'>
                            {iconList[el.icon]}
                            <div className='user_item_text'>
                                <div className="user_item_text_title">
                                    {el.key}
                                </div>
                                <div className="user_item_text_value">
                                    {el.userName}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        );
}

export default UserInfo;
