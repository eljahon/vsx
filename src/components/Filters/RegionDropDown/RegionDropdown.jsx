import React, { useState } from "react";
import { useDispatch } from "react-redux";
import cn from "classnames";

import { Button, DropDown } from "../../index";

import { ReactComponent as Arrow } from "../../../assets/icons/drop-down-arrow-thin.svg";
import './regiondropdown.scss'

export const RegionDropDown = (props) => {
    const {items, setFieldValue} = props;
    const [currentRegion, setCurrentRegion] = useState(items[0]);

    const handleLngChange = (item, handleMenuClose, event) => {
        setCurrentRegion(item);
        handleMenuClose();
        setFieldValue((old)=>({...old, region_id:item.id }))
    };

    return (
        <DropDown
            renderTrigger={(handleMenuToggle, isVisible) => (
                <Button
                    text={currentRegion.name}
                    className="region__item__current"
                    append={
                        <Arrow className={cn("transition-default", { rotate_180: isVisible })} />
                    }
                    onClick={handleMenuToggle}
                />
            )}
            innerClass="language"
            outerClass="mr_30"
        >
            {(handleMenuClose) =>
                items
                    .filter((item) => item.name !== currentRegion.name)
                    .map((item) => (
                        <Button
                            key={item.id}
                            text={item.name}
                            className="region__item"
                            onClick={(event) => handleLngChange(item, handleMenuClose, event)}
                        />
                    ))
            }
        </DropDown>
    );
};
