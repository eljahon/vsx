import React from "react";
import { get, isFunction } from "lodash";

import { InputBase } from "./InputBase";

export const InputText = ({
	placeholder = "",
	type = "",

	label = "",
	isDisabled = false,
	size = "sm",
	outerClass = "",
	innerClass = "",
	append,
	prepend,
	field,
	form,
	isValid = () => true,

	...inputProps
}) => {
	return (
		<InputBase
			label={label}
			isDisabled={isDisabled}
			size={size}
			outerClass={outerClass}
			innerClass={innerClass}
			append={append}
			prepend={prepend}
			field={field}
			form={form}
		>
			<input
				type={type}
				disabled={isDisabled}
				placeholder={placeholder}
				className="control__input"
				{...field}
				{...inputProps}
				onChange={(event) => {
					if (isValid(event)) {
						isFunction(get(inputProps, "onChange")) && inputProps.onChange(event);
						field.onChange(event);
					}
				}}
			/>
		</InputBase>
	);
};
