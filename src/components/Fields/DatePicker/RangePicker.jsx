import React, { useState } from "react";
import PropTypes from "prop-types";
import DatePickerComponent from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import cn from "classnames";

import { locale } from "components/Fields/DatePicker/helpers/locales";
import { ControlLabel } from "components/Common";
import { DateInput } from "components/Fields/DatePicker/components/DateInput";

import "./DatePicker.scss";
import { isFunction } from "lodash";

export const RangePicker = ({
	placeholder = "DD.MM.YYYY",
	className = "",
	label = "",
	format = "DD.MM.YYYY",
	size = "sm",
	isDisabled = false,
	onDateChange,
	CustomDateInput,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const classNames = cn("date-picker", className, `control_${size}`);
	const [dateRange, setDateRange] = useState([]);

	const handleChange = (newDateRange) => {
		setDateRange(newDateRange);
		if (isFunction(onDateChange) && newDateRange.length !== 1) {
			onDateChange(newDateRange);
		}
	};

	return (
		<div className={classNames}>
			<ControlLabel label={label} />

			<DatePickerComponent
				containerClassName="date-picker__inner"
				value={dateRange}
				strokeWidth={2}
				onChange={handleChange}
				format={format}
				disabled={isDisabled}
				range={true}
				editable={false}
				hideOnScroll={true}
				render={
					CustomDateInput ? (
						<CustomDateInput isOpen={isOpen} />
					) : (
						<DateInput
							placeholder={placeholder}
							isDisabled={isDisabled}
							onClear={() => handleChange([])}
							format="##.##.#### ~ ##.##.####"
						/>
					)
				}
				locale={locale}
				plugins={[weekends([0, 7])]}
				animations={[transition()]}
				weekStartDayIndex={1}
				onOpen={() => setIsOpen(true)}
				onClose={() => setIsOpen(false)}
			/>
		</div>
	);
};

RangePicker.propTypes = {
	size: PropTypes.string,
	placeholder: PropTypes.string,
	className: PropTypes.string,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	isDisabled: PropTypes.bool,
	format: PropTypes.string,
	onDateChange: PropTypes.func,
};
