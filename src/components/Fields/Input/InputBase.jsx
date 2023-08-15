import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { get } from "lodash";

import { ControlError, ControlLabel } from "components/Common";

import "./Input.scss";

export const InputBase = ({
	label = "",
	isDisabled = false,
	size = "sm",
	outerClass = "",
	innerClass = "",
	append,
	prepend,
	field,
	form,
	children,
}) => {
	const hasError = get(form.touched, field.name) && get(form.errors, field.name);

	return (
		<div
			className={cn("control", `control_${size}`, outerClass, {
				control_disabled: isDisabled,
				control_error: hasError,
			})}
		>
			<ControlLabel label={label} />

			<label className={cn("control__wrapper", innerClass)}>
				{prepend}

				{children}

				{append}
			</label>

			<ControlError form={form} field={field} />
		</div>
	);
};

InputBase.propTypes = {
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	placeholder: PropTypes.string,
	isDisabled: PropTypes.bool,
	innerClass: PropTypes.string,
	outerClass: PropTypes.string,
	children: PropTypes.node,
	append: PropTypes.node,
	prepend: PropTypes.node,
	field: PropTypes.object,
	form: PropTypes.object,
};
