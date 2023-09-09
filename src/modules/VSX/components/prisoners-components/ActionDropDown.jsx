import React, {useState} from "react";
import {Button, DropDown} from "../../../../components";
import {ReactComponent as Arrow} from "../../../../assets/icons/drop-down-arrow-thin.svg";
import cn from "classnames";
import {useTranslation} from "react-i18next";
import './styleds/ActionDropDown.scss'

export const ActionDropDown = (props) => {
    const {t} = useTranslation()
     const {itemdata, setMethod} = props;
    const [actionList, setActionList]=useState([
        {name: t('see'), type: 'see'},
        {name: t('updata'), type: 'updata'},
        {name: t('delete'), type: 'delete'},
        {name: t('cheack'), type: 'cheack'},
        {name: t('medical'), type: 'medical'},
        {name: t('walk'), type: 'walk'},
        {name: t('list-remove'), type: 'list-remove'},
    ])
    const handleLngChange = (item, handleMenuClose, event) => {
        handleMenuClose();
        // console.log(item, itemdata)
        setMethod({actionType: item.type, itemdata})
    };
    return (
        <DropDown
            renderTrigger={(handleMenuToggle, isVisible) => (
                <Button
                    className='items'
                    onClick={handleMenuToggle}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 11 11" fill="none">
                        <circle cx="5.02734" cy="5.50146" r="5" fill="#7C7C7C"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 11 11" fill="none">
                        <circle cx="5.02734" cy="5.50146" r="5" fill="#7C7C7C"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 11 11" fill="none">
                        <circle cx="5.02734" cy="5.50146" r="5" fill="#7C7C7C"/>
                    </svg>
                </Button>
            )}
            outerClass="mr_40"
        >
            {(handleMenuClose) =>
                actionList
                    .map((item) => (
                        <Button
                            key={item.type}
                            text={item.name}
                            className="aciton__item"
                            onClick={(event) => handleLngChange(item, handleMenuClose,event)}
                        />
                    ))
            }
        </DropDown>
    );

}
