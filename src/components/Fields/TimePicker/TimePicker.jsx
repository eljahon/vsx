import React, {useState} from "react";
import DatePickerComponent from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import "./TImePicker.scss";
import {ControlError, ControlLabel} from "../../Common";
import {ReactComponent as CalendarIcon} from "../../../assets/icons/calendar.svg";
import {DateInput} from "../DatePicker/components/DateInput";
import {time} from "../../../services";
export const TimePickers = (props) =>  {
    const {format='HH:mm', className, label, form, field,isDisabled, placeholder='not placeholder', innerClass,prepend=true} = props;
    const handleChange =(date) => {
        form.setFieldValue(field.name, time.timeFormater(date?.toDate(), 'YYYY-MM-DD HH:mm'));

    }
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={className}>
            <ControlLabel label={label} />
            <DatePickerComponent
                className='date-picker__inner'
                disableDayPicker
                onChange={handleChange}
                value={field.value}
                format={format}
                render={
                    <DateInput
                        prepend={prepend}
                        placeholder={placeholder}
                        isDisabled={isDisabled}
                        isOpen={isOpen}
                        format={'##:##'}
                        className={innerClass}
                    />
                }
                plugins={[
                    <TimePicker hideSeconds/>
                ]}
            />
            {/*<CalendarIcon stroke="var(--main-black)" />*/}
            <ControlError form={form} field={field} />
        </div>
    );
}
// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import DatePickerComponent from "react-multi-date-picker";
// import TimePicker from "react-multi-date-picker/plugins/time_picker";
// import transition from "react-element-popper/animations/transition";
// import cn from "classnames";
//
// import { locale } from "../DatePicker/helpers/locales";
// import { ControlError, ControlLabel } from "components/Common";
// import { DateInput } from "../DatePicker/components/DateInput";
//
// import "../DatePicker/DatePicker.scss";
//
// export const TimePickers = ({
//                                placeholder = "date",
//                                outerClass = "",
//                                label = "",
//                                format = "HH:mm",
//                                size = "sm",
//                                isDisabled = false,
//                                hasTimeSelect = false,
//                                innerClass = "",
//                                prepend = true,
//                                field,
//                                form,
//                                onDateChange,
//                            }) => {
//     const [isOpen, setIsOpen] = useState(false);
//
//     const classNames = cn("date-picker", outerClass, `control_${size}`);
//
//     const handleChange = (date) => {
//         console.log(date)
//         form.setFieldValue(field.name, date.toDate());
//         onDateChange && onDateChange(date);
//     };
//
//     // const plugins = [weekends([0, 7])];
//     // if (hasTimeSelect) plugins.push(<TimePicker hideSeconds={true} />);
//
//     return (
//         <div className={classNames}>
//             <ControlLabel label={label} />
//             <DatePickerComponent
//                 containerClassName="date-picker__inner"
//                 value={field.value}
//                 onChange={handleChange}
//                 format={format}
//                 disabled={isDisabled}
//                 editable={true}
//                 // hideOnScroll={true}
//                 // months={months}
//                 // weekDays={weeks}
//                 render={
//                     <DateInput
//                         prepend={prepend}
//                         placeholder={placeholder}
//                         isDisabled={isDisabled}
//                         isOpen={isOpen}
//                         format={'##:##'}
//                         // className={innerClass}
//                     />
//                 }
//                 locale={locale}
//                 plugins={[<TimePicker/>]}
//                 animations={[transition()]}
//                 // weekStartDayIndex={1}
//                 onOpen={() => setIsOpen(true)}
//                 onClose={() => setIsOpen(false)}
//             />
//
//             <ControlError form={form} field={field} />
//         </div>
//     );
// };
//
// TimePickers.propTypes = {
//     format: PropTypes.string,
//     placeholder: PropTypes.string,
//     label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
//     outerClass: PropTypes.string,
//     innerClass: PropTypes.string,
//     size: PropTypes.string,
//     isDisabled: PropTypes.bool,
//     hasTimeSelect: PropTypes.bool,
//     onDateChange: PropTypes.func,
//     field: PropTypes.object,
//     form: PropTypes.object,
// };
