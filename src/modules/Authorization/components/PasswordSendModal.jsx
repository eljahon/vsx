import React from "react";

import { Button, ModalRoot, Typography } from "components";

export const PasswordSendModal = ({ isOpen, handleModalClose }) => {
	return (
		<ModalRoot isOpen={isOpen} innerClass="p_60">
			<img
				src={require("assets/icons/auth-success.svg").default}
				alt="Success"
				className="mb_50"
			/>

			<div className="text-align_center mb_70">
				<Typography Type="h2" className="auth__title" text="Пароль отправлен!" />
				<Typography
					Type="p"
					className="auth__subtitle"
					text="Пароль успешно отправлен на ваш телефон!"
				/>
			</div>

			<Button
				className="btn w_full"
				design="primary"
				text="Ок, дальше"
				onClick={handleModalClose}
			/>
		</ModalRoot>
	);
};
