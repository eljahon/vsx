import React from "react";
import PropTypes from "prop-types";

import { ModalRoot, Button, Typography } from "components";

export const ConfirmModal = ({
	title = "Вы уверены, что хотите удалить?",
	isOpen,
	cancelText = "Назад",
	cancelAction,
	successText = "Удалить",
	successAction,
}) => {
	return (
		<ModalRoot isOpen={isOpen} innerClass="max-width_500 p_40">
			<Typography Type="h2" className="title_md mb_40 text-align_center" text={title} />

			<div className="row">
				<div className="col-6">
					<Button
						design="secondary"
						className="btn w_full fz_16"
						text={cancelText}
						onClick={cancelAction}
					/>
				</div>

				<div className="col-6">
					<Button
						design="primary"
						className="btn w_full fz_16"
						text={successText}
						onClick={successAction}
					/>
				</div>
			</div>
		</ModalRoot>
	);
};

ConfirmModal.propTypes = {
	title: PropTypes.string,
	isOpen: PropTypes.bool,
	cancelText: PropTypes.string,
	cancelAction: PropTypes.func,
	successText: PropTypes.string,
	successAction: PropTypes.func,
};
