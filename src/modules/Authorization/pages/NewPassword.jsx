import React from "react";
import { useNavigate } from "react-router-dom";
import { FastField } from "formik";

import Container from "containers";
import { Typography, Button, InputPassword } from "components";

import { ReactComponent as PasswordIcon } from "assets/icons/password.svg";

const NewPassword = () => {
	const navigate = useNavigate();

	const handleResetPassword = () => {
		navigate("/login");
	};

	return (
		<>
			<div className="auth__heading mb_30">
				<Typography Type="h1" className="auth__title" text="Новый пароль" />
				<Typography Type="p" className="auth__subtitle" text="Введите новый пароль" />
			</div>

			<Container.Form
				url="/user/change-password"
				className="row g-3"
				onSuccess={handleResetPassword}
				fields={[
					{
						name: "password",
						validations: [{ type: "required" }],
					},
					{
						name: "password_confirm",
						validations: [{ type: "required" }],
						lazy: (validator, yup) =>
							validator.oneOf([yup.ref("password")], "Your passwords do not match"),
					},
				]}
			>
				{({ isSubmitting }) => (
					<>
						<div className="col-12">
							<FastField
								name="password"
								component={InputPassword}
								placeholder="Новый пароль"
								prepend={<PasswordIcon />}
							/>
						</div>

						<div className="col-12 mb_120">
							<FastField
								name="password_confirm"
								placeholder="Подвердите новый пароль"
								component={InputPassword}
								prepend={<PasswordIcon />}
							/>
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
			</Container.Form>
		</>
	);
};

export default NewPassword;
