import React, { useState } from "react";
import { FastField } from "formik";
import { useNavigate } from "react-router-dom";

import { useOverlay } from "hooks";
import { utils } from "services";

import Containers from "containers";
import { Typography, Button, Fields } from "components";
import { PasswordSendModal } from "../components/PasswordSendModal";
import { get } from "lodash";

const ForgotPassword = () => {
	const navigate = useNavigate();

	const [userPhone, setUserPhone] = useState();
	const codeSentModal = useOverlay({
		uniqueName: "secret-code",
		onClose: () => navigate(`/confirm-password/${userPhone}`),
	});

	return (
		<>
			<PasswordSendModal
				isOpen={codeSentModal.isOverlayOpen}
				handleModalClose={codeSentModal.handleOverlayClose}
			/>

			<div className="auth__heading mb_30">
				<Typography Type="h1" className="auth__title" text="Забыли свой пароль?" />
				<Typography
					Type="p"
					className="auth__subtitle"
					text="На указанный вами номер телефона будет отправлен
					4-значный код."
				/>
			</div>

			<Containers.Form
				url="/user/forgot-password"
				onSuccess={(response) => {
					setUserPhone(get(response, "data.phone_number"));
					codeSentModal.handleOverlayOpen();
				}}
				className="row g-3"
				fields={[
					{
						name: "phone",
						validations: [{ type: "phone" }],
						onSubmitValue: (value) => utils.formatters.formatPhoneApi(value),
					},
				]}
			>
				{({ isSubmitting, ...props }) => (
					<>
						<div className="col-12 mb_50">
							<div className="col-12">
								<FastField name="phone" component={Fields.InputMask} />
							</div>
						</div>

						<div className="col-12">
							<Button
								className="btn w_full"
								design="primary"
								type="submit"
								text="Отправить"
								isLoading={isSubmitting}
							/>
						</div>
					</>
				)}
			</Containers.Form>
		</>
	);
};

export default ForgotPassword;
