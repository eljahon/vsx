import {Fields,Typography, Button} from "../../../components";
import './index.scss';
import {utils} from '../../../services'
import {ReactComponent as NotificationIcon} from "../../../assets/icons/notification.svg";
import {ReactComponent as MessageIcon} from "../../../assets/icons/message.svg";
import React from "react";
import {RegionDropDown} from "../RegionDropDown/RegionDropdown";
import {useFetchList} from "../../../hooks";
export const HeaderFilters = (props) => {
  const {setFieldValue,items, setFilter, setValue, notification,handleMenuToggle} = props
    return (
        <div className='header__filters__main'>
        <div className='header__data__pciker'>
            <Fields.RangePicker
                size="xsm"
                className="filter__control mr_15"
                value={setValue}
                onDateChange={(date) => {
                    const { start_at, end_at } = utils.formatters.getRange(date);
                    setFieldValue((old) => ({...old, start: start_at, end: end_at}));
                }}/>
        </div>
        <div className='header__drop__down'>
            {items?.length&&<RegionDropDown setFieldValue={setFieldValue} items={items}/>}
        </div>
        </div>
    )
}
