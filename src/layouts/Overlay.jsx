import React from "react";
import { useSelector } from "react-redux";
import cn from "classnames";

import { overlaySelector } from "store/selectors";

export const Overlay = () => {
	const overlay = useSelector(overlaySelector);

	let isOpen = false;
	Object.values(overlay).forEach((item) => {
		if (item === true) isOpen = true;
	});

	return (
		<div
			className={cn("overlay", {
				overlay_open: isOpen,
			})}
		></div>
	);
};
