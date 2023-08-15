import React from "react";
import { isFunction } from "lodash";
import PropTypes from "prop-types";
import cn from "classnames";

import "./Button.scss";

export const Button = ({
	design = "",
	className = "",
	style,
	text,
	append,
	prepend,
	isLoading = false,
	isDisabled = false,
	onClick,
	children,
	type = "button",
	...buttonProps
}) => {
	const classNames = cn(design ? `btn__${design}` : "", className, {
		btn_disabled: isDisabled,
		btn_loading: isLoading,
	});

	return (
		<button
			type={type}
			disabled={isDisabled}
			className={classNames}
			style={style}
			onClick={isFunction(onClick) ? onClick : null}
			{...buttonProps}
		>
			{prepend}
			{text}
			{append}

			{isFunction(children) ? children() : children}

				{isLoading && <span className="btn__spinner"></span>}
		</button>
	);
};

Button.propTypes = {
	design: PropTypes.oneOf(["primary", "secondary", "circled", "grey"]),
	type: PropTypes.oneOf(["submit", "reset", "button"]),
	className: PropTypes.string,
	style: PropTypes.object,
	text: PropTypes.string,
	isLoading: PropTypes.bool,
	isDisabled: PropTypes.bool,
	onClick: PropTypes.func,
	append: PropTypes.node,
	prepend: PropTypes.node,
	children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
};
