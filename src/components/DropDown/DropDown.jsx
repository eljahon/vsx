import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";

import { useOutsideClick } from "hooks";

import "./DropDown.scss";
import { isFunction } from "lodash";

export const DropDown = ({
	outerClass = "",
	innerClass = "",
	innerStyle,
	hasPointer = false,
	offset,
	closeAnyCase = false,
	renderTrigger,
	children,
}) => {
	const { ref, isVisible, handleMenuToggle, handleMenuClose } = useOutsideClick({ closeAnyCase });

	return (
		<div ref={ref} className={cn("drop-down", outerClass, { "drop-down_opened": isVisible })}>
			{renderTrigger(handleMenuToggle, isVisible)}

			<div
				className={cn("drop-down__inner", innerClass, { "drop-down__arrow": hasPointer })}
				style={{ top: `calc(100% + ${offset})`, ...innerStyle }}
			>
				<div className="drop-down__menu">
					{isFunction(children) ? children(handleMenuClose) : children}
				</div>
			</div>
		</div>
	);
};

DropDown.propTypes = {
	outerClass: PropTypes.string,
	innerClass: PropTypes.string,
	offset: PropTypes.string,
	renderTrigger: PropTypes.func,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};
