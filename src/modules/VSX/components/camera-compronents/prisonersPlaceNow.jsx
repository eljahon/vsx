import React from 'react';
import './styles/main.scss'
export const  PrisonersPlaceNow =(props)=> {
    const {text, index} = props
    return (
        <div className={index % 2 === 0 ? 'place__now bg-blue':'place__now bg-gray'}>{text}</div>
    );
}
