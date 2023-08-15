import React from "react";

import { Button, Typography } from "components";

import "./ListActions.scss";
import { isFunction } from "lodash";

export const ListActions = ({
	addAction,
	addActionTooltip,
	isAddDisabled,
	removeAction,
	removeActionTooltip,
	isRemoveDisabled,
}) => {
	return (
		<div className="list-actions">
			{isFunction(removeAction) && (
				<div className="list-actions__wrapper">
					<Button
						className="list-actions__btn list-actions__remove-btn "
						onClick={removeAction}
						isDisabled={isRemoveDisabled}
					/>

					<Typography
						Type="span"
						className="list-actions__tooltip"
						text={removeActionTooltip}
					/>
				</div>
			)}

			{isFunction(addAction) && (
				<div className="list-actions__wrapper mt_10">
					<Button
						className="list-actions__btn list-actions__add-btn"
						onClick={addAction}
						isDisabled={isAddDisabled}
					/>
					<Typography
						Type="span"
						className="list-actions__tooltip "
						text={addActionTooltip}
					/>
				</div>
			)}
		</div>
	);
};
