import React, { useState } from "react";
import PropTypes from "prop-types";
import DatePickerComponent from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import transition from "react-element-popper/animations/transition";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import cn from "classnames";

import { locale } from "./helpers/locales";
import { ControlError, ControlLabel } from "components/Common";
import { DateInput } from "./components/DateInput";

import "./DatePicker.scss";

export const DatePicker = ({
  placeholder = "date",
  outerClass = "",
  label = "",
  format = "DD.MM.YYYY",
  size = "sm",
  isDisabled = false,
  hasTimeSelect = false,
  innerClass = "",
  prepend = true,
  field,
  form,
  onDateChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const classNames = cn("date-picker", outerClass, `control_${size}`);

  const handleChange = (date) => {
    console.log(date)
    form.setFieldValue(field.name, date.toDate());
    onDateChange && onDateChange(date);
  };

  const plugins = [weekends([0, 7])];
  if (hasTimeSelect) plugins.push(<TimePicker hideSeconds={true} />);

  return (
    <div className={classNames}>
      <ControlLabel label={label} />
      <DatePickerComponent
        containerClassName="date-picker__inner"
        value={field.value}
        onChange={handleChange}
        format={format}
        disabled={isDisabled}
        editable={true}
        hideOnScroll={true}
        // months={months}
        // weekDays={weeks}
        render={
          <DateInput
            prepend={prepend}
            placeholder={placeholder}
            isDisabled={isDisabled}
            isOpen={isOpen}
            className={innerClass}
          />
        }
        locale={locale}
        plugins={plugins}
        animations={[transition()]}
        weekStartDayIndex={1}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      />

      <ControlError form={form} field={field} />
    </div>
  );
};

DatePicker.propTypes = {
  format: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  outerClass: PropTypes.string,
  innerClass: PropTypes.string,
  size: PropTypes.string,
  isDisabled: PropTypes.bool,
  hasTimeSelect: PropTypes.bool,
  onDateChange: PropTypes.func,
  field: PropTypes.object,
  form: PropTypes.object,
};
