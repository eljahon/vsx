import React from "react";

import { InputBase } from "./InputBase";

export const Textarea = ({
	placeholder = "",

	label = "",
	isDisabled = false,
	size = "sm",
	outerClass = "",
	innerClass = "",
	append,
	prepend,
	field,
	form,

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
			<textarea
				disabled={isDisabled}
				placeholder={placeholder}
				className="control__input"
				{...field}
				{...inputProps}
			></textarea>
		</InputBase>
	);
};
