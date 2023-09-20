import React from 'react';
import './styles/userInfo.scss'
import {ReactComponent as UserInfoIcon } from '../../../../assets/icons/userInfo.svg'
import {ReactComponent as BirthdayIcon } from '../../../../assets/icons/birthdayIcon.svg'
import {ReactComponent as Gendor } from '../../../../assets/icons/gendor.svg'
import {ReactComponent as Nation } from '../../../../assets/icons/nation.svg'
import {ReactComponent as Passport } from '../../../../assets/icons/passport.svg'
const list =
    [
        {
            userName: 'Шохжахон',
            key: 'Исм',
            icon: "user"
        },
        {
            userName: 'Усмоналиев',
            key: 'Фамилия',
            icon: "user"
        },
        {
            userName: 'Замоналиевич',
            key: 'Отасининг исми',
            icon: "user"
        },
        {
            userName: '14.04.1998',
            key: 'Тугилган сана',
            icon: "user"
        },
        {
            userName: 'Эркак',
            key: 'Жинси',
            icon: "birthday"
        },
        {
            userName: 'Ўзбек',
            key: 'Миллати',
            icon: "gendor"
        },
        {
            userName: 'Ўзбекистон',
            key: 'Фуқаролиги',
            icon: "passpor"
        },
        {
            userName: 'AD 1234567',
            key: 'Пасспорт / ID',
            icon: "passpor"
        },
        {
            userName: '1234567123123123',
            key: 'ПИНФЛ',
            icon: "passpor"
        }
    ]
    const iconList = {
        user: <UserInfoIcon/>,
        birthday: <BirthdayIcon/>,
        nation: <Nation/>,
        passpor: <Passport/>,
        gendor: <Gendor/>
    }
const  UserInfo = (props) => {
    const {item} = props;
    console.log(item)
        return (
            <div className='user'>
                <div className="user_title p_d">Шахсий маълумотлар</div>
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
