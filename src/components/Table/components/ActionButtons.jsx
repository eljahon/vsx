import React, { useState } from "react";
import { isFunction } from "lodash";
import { Button, DropDown } from "components";
import { ReactComponent as MoreActionsIcon } from "assets/icons/more-actions.svg";
import { ReactComponent as EditIcon } from "assets/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "assets/icons/delete.svg";
import { ReactComponent as SeeIcon } from "assets/icons/view.svg";
import {useTranslation} from "react-i18next";

export const ActionButtons = ({
	row,
	editAction,
	deleteAction,
	renderButtons,
	isButtonsVisible = () => true,
	seeAction,
	listAction
}) => {
	const [style, setStyle] = useState({});
const {t} = useTranslation()
	return (
		<>
			{(editAction || deleteAction || renderButtons) && isButtonsVisible(row) && (
				<div
					className="d-flex justify-content-end"
					onClick={(event) => event.stopPropagation()}
				>
					<DropDown
						offset={"-50%"}
						innerClass="window-menu table__actions"
						innerStyle={style}
						renderTrigger={(handleMenuToggle) => (
							<Button
								className="table__actions-trigger"
								append={<MoreActionsIcon />}
								onClick={(event) => {
									handleMenuToggle();
									const { top, left } =
										event.currentTarget.getBoundingClientRect();
									setStyle({
										top: `${top}px`,
										left: `${left - 90}px`,
									});
								}}
							/>
						)}
					>
						{(handleMenuClose) => (
							<>
								{isFunction(renderButtons) && renderButtons(row, handleMenuClose)}

								{isFunction(editAction) && (
									<Button
										className="btn drop-down__btn table__actions-edit"
										prepend={<EditIcon />}
										text={t('updata')}
										onClick={(event) => {
											editAction(row, event);
											handleMenuClose();
										}}
									/>
								)}

								{isFunction(deleteAction) && (
									<Button
										className="btn drop-down__btn table__actions-delete"
										prepend={<DeleteIcon />}
										text={t('remove')}
										onClick={(event) => {
											deleteAction(row, event);
											handleMenuClose();
										}}
									/>
								)}
								{isFunction(seeAction) && (
									<Button
										className="btn drop-down__btn table__actions-edit"
										prepend={<SeeIcon />}
										text={t('see')}
										onClick={(event) => {
											seeAction(row, event);
											handleMenuClose();
										}}
									/>
								)}
							</>
						)}
					</DropDown>
				</div>
			)}
		</>
	);
};
