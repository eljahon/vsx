import React from "react";
import { isFunction } from "lodash";

import { Button } from "components";

import { ReactComponent as ApproveIcon } from "assets/icons/approve.svg";
import { ReactComponent as CancelIcon } from "assets/icons/cancel.svg";

export const OrderButtons = ({ onApprove, onCancel }) => (
	<>
		{isFunction(onApprove) && (
			<Button
				className="btn drop-down__btn table__actions-success"
				text="Подтвердить"
				prepend={<ApproveIcon />}
				onClick={onApprove}
			/>
		)}

		{isFunction(onCancel) && (
			<Button
				className="btn drop-down__btn table__actions-delete"
				text="Отменить"
				prepend={<CancelIcon />}
				onClick={onCancel}
			/>
		)}
	</>
);
