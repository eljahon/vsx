import React from "react";
import { components } from "react-select";

export const ValueContainer =
	(append, prepend) =>
	({ children, ...props }) => {
		return (
			<components.ValueContainer {...props}>
				{!!children && prepend}

				{children}

				{!!children && append}
			</components.ValueContainer>
		);
	};
