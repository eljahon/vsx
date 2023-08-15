import React from "react";
import PropTypes from "prop-types";
import SelectComponent from "react-select";
import cn from "classnames";
import { isFunction, get } from "lodash";

import { ControlLabel, ControlError } from "components/Common";
import { DropdownIndicator, ValueContainer } from "./components";

import "./Select.scss";

export const Select = ({
	label = "",
	placeholder = "",
	size = "sm",
	className = "",
	append,
	prepend,

	options = [],
	isMulti = false,
	isDisabled = false,
	isSearchable = false,
	isClearable = false,
	defaultValue,
	getOptionValue = "value",
	getOptionLabel = "label",

	onValueChange,
	field,
	form,
}) => {
	const handleChange = (option, action) => {
		form.setFieldValue(field.name, option);
		onValueChange && onValueChange(option);
	};

	const handleBlur = (event) => {
		form.setFieldTouched(field.name, true);
	};

	return (
		<div
			className={cn("control", `control_${size}`, {
				control_disabled: isDisabled,
			})}
		>
			<ControlLabel label={label} />

			<SelectComponent
				defaultValue={defaultValue}
				value={field.value}
				placeholder={placeholder}
				className={className}
				getOptionLabel={(option) =>
					isFunction(getOptionLabel)
						? getOptionLabel(option)
						: get(option, getOptionLabel)
				}
				getOptionValue={(option) =>
					isFunction(getOptionValue)
						? getOptionLabel(option)
						: get(option, getOptionValue)
				}
				isDisabled={isDisabled}
				isMulti={isMulti}
				isSearchable={isSearchable}
				isClearable={isClearable}
				classNamePrefix="select"
				options={options}
				onChange={handleChange}
				onBlur={handleBlur}
				// blurInputOnSelect={true}
				// closeMenuOnSelect={true}
				// closeMenuOnScroll={true}
				// escapeClearsValue={true}
				components={{ DropdownIndicator, ValueContainer: ValueContainer(append, prepend) }}
				styles={{
					dropdownIndicator: (provided, state) => ({
						...provided,
						transition: ".1s linear",
						transform: state.selectProps.menuIsOpen ? "rotate(-180deg)" : "rotate(0)",
					}),
				}}
				// menuIsOpen={true}
			/>

			<ControlError form={form} field={field} />
		</div>
	);
};

Select.propTypes = {
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	placeholder: PropTypes.string,
	append: PropTypes.node,
	prepend: PropTypes.node,
	options: PropTypes.array,
	size: PropTypes.string,
	className: PropTypes.string,
	isMulti: PropTypes.bool,
	isDisabled: PropTypes.bool,
	isSearchable: PropTypes.bool,
	isClearable: PropTypes.bool,
	defaultValue: PropTypes.object,
	getOptionValue: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	getOptionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	onValueChange: PropTypes.func,
	field: PropTypes.object,
	form: PropTypes.object,
};
