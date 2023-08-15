import React from "react";
import { PatternFormat } from "react-number-format";
import { get, isFunction } from "lodash";

import { InputBase } from "./InputBase";

import { ReactComponent as PhoneIcon } from "assets/icons/phone.svg";

export const InputMask = ({
	placeholder = "+998 (##) ###-##-##",
	format = "+998 (##) ###-##-##",
	mask = "_",

	label = "",
	isDisabled = false,
	size = "sm",
	outerClass = "",
	innerClass = "",
	append,
	prepend = <PhoneIcon />,
	field,
	form,

	...inputProps
}) => {
	return (
		<InputBase
			label={label}
			isDisabled={isDisabled}
			size={size}
			append={append}
			prepend={prepend}
			outerClass={outerClass}
			innerClass={innerClass}
			field={field}
			form={form}
		>
			<PatternFormat
				type="text"
				format={format}
				mask={mask}
				placeholder={placeholder}
				disabled={isDisabled}
				className="control__input"
				{...field}
				{...inputProps}
				onChange={(event) => {
					field.onChange(event);
					isFunction(get(inputProps, "onChange")) && inputProps.onChange(event);
				}}
			/>
		</InputBase>
	);
};
