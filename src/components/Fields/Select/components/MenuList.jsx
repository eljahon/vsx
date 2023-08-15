import React from "react";
import { components } from "react-select";
import { isFunction } from "lodash";

import { Button } from "components";

export const MenuList =
	(onNewClick) =>
	({ children, ...props }) => {
		return (
			<components.MenuList {...props}>
				{isFunction(onNewClick) && (
					<Button
						design="secondary"
						className="btn w_full mb_10 py_12 fw_500"
						text="Добавить"
						onClick={onNewClick}
					/>
				)}
				{children}
			</components.MenuList>
		);
	};
