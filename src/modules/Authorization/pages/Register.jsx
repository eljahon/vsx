import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FastField } from "formik";
import { get } from "lodash";

import { useGetLanguage, useOverlay } from "hooks";
import { utils } from "services";

import Container from "containers";
import { Fields, Typography, InputPassword, Button, AppLink } from "components";
import { PasswordSendModal } from "../components/PasswordSendModal";

import { ReactComponent as UserIcon } from "assets/icons/user.svg";
import { ReactComponent as PositionIcon } from "assets/icons/position.svg";
import { ReactComponent as PhoneIcon } from "assets/icons/phone.svg";

const Register = () => {
	const { getLanguageValue } = useGetLanguage();
	const navigate = useNavigate();

	const [userPhone, setUserPhone] = useState("");
	const codeSentModal = useOverlay({
		uniqueName: "codeSent",
		onClose: () =>
			navigate(`/confirm-password/${userPhone}`, { state: { fromRegister: true } }),
	});

	return (
		<>
			<PasswordSendModal
				isOpen={codeSentModal.isOverlayOpen}
				handleModalClose={codeSentModal.handleOverlayClose}
			/>

			<div className="auth__heading mb_30">
				<Typography Type="h1" className="auth__title" text="Регистрация" />
				<Typography
					Type="p"
					className="auth__subtitle"
					text="Заполните форму ниже, чтобы зарегистрироваться."
				/>
			</div>

			<Container.Form
				url="/user/sign-up"
				className="row g-3"
				onSuccess={(response) => {
					setUserPhone(get(response, "data.phone_number"));
					codeSentModal.handleOverlayOpen();
				}}
				fields={[
					{
						name: "first_name",
						validations: [{ type: "typeError" }, { type: "required" }],
					},
					{
						name: "last_name",
						validations: [{ type: "typeError" }, { type: "required" }],
					},
					{
						name: "middle_name",
						validations: [{ type: "typeError" }, { type: "required" }],
					},
					{
						name: "phone",
						value: "",
						validations: [{ type: "phone" }],
						onSubmitValue: (value) => utils.formatters.formatPhoneApi(value),
					},
					{
						name: "position_id",
						validationType: "object",
						onSubmitValue: (value) => get(value, "id"),
					},
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
					{
						name: "terms",
						value: 0,
						disabled: true,
					},
				]}
			>
				{({ isSubmitting, values, isValid, dirty }) => (
					<>
						<div className="col-12">
							<FastField
								name="first_name"
								component={Fields.InputText}
								placeholder="Имя"
								prepend={<UserIcon />}
							/>
						</div>

						<div className="col-12">
							<FastField
								name="last_name"
								component={Fields.InputText}
								placeholder="Фамилия"
								prepend={<UserIcon />}
							/>
						</div>

						<div className="col-12">
							<FastField
								name="middle_name"
								component={Fields.InputText}
								placeholder="Отчество"
								prepend={<UserIcon />}
							/>
						</div>

						<div className="col-12">
							<FastField
								name="position_id"
								component={Fields.AsyncSelect}
								loadOptionsUrl="/position"
								loadOptionsParams={(searchText) => ({
									filter: {
										title: searchText,
									},
								})}
								placeholder="Должность"
								getOptionLabel={(option) => getLanguageValue(get(option, "title"))}
								prepend={<PositionIcon />}
							/>
						</div>

						<div className="col-12">
							<FastField
								name="phone"
								component={Fields.InputMask}
								prepend={<PhoneIcon />}
							/>
						</div>

						<div className="col-12">
							<FastField
								name="password"
								component={InputPassword}
								placeholder="Пароль"
								prepend={<PhoneIcon />}
							/>
						</div>

						<div className="col-12 mb_30">
							<FastField
								name="password_confirm"
								placeholder="Подвердить Пароль"
								component={InputPassword}
								prepend={<PhoneIcon />}
							/>
						</div>

						<div className="col-12 mb_30">
							<FastField
								name="terms"
								component={Fields.CheckBox}
								label={
									<>
										"Регистрируясь, вы соглашаетесь с нашими условиями в
										отношении нашей{" "}
										<a className="color_brand-blue" href="#">
											политики конфиденциальности
										</a>
										.
									</>
								}
							/>
						</div>

						<div className="col-12 mb_15">
							<Button
								className="btn w_full"
								design="primary"
								type="submit"
								text="Регистрация"
								isLoading={isSubmitting}
								isDisabled={!(isValid && dirty) || !values.terms}
							/>
						</div>
					</>
				)}
			</Container.Form>

			<Typography Type="p" className="text-align_center control__text">
				{() => (
					<>
						Вы уже зарегистрированы?{" "}
						<AppLink link="/login" className="color_brand-blue" text="Войти" />
					</>
				)}
			</Typography>
		</>
	);
};

export default Register;
