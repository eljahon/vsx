import React from "react";
import { components } from "react-select";

import { ReactComponent as DropDownArrow } from "assets/icons/drop-down-arrow.svg";

export const DropdownIndicator = ({ ...props }) => (
	<components.DropdownIndicator {...props}>
		<DropDownArrow className="drop-down-arrow" />
	</components.DropdownIndicator>
);
