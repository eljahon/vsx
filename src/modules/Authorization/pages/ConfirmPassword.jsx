import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FastField } from "formik";
import { get } from "lodash";

import { auth } from "store/actions";
import { storage } from "services";

import Containers from "containers";
import { Button, Fields, Typography } from "components";
import { Timer } from "../components/Timer";

const ConfirmPassword = () => {
	const { state } = useLocation();
	const { phone } = useParams();
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const focusNextInput = (index) => {
		const inputs = document.querySelectorAll(".control__input");
		inputs[index].focus();
	};

	return (
		<>
			<div className="auth__heading mb_30">
				<Typography Type="h1" className="auth__title" text="Введите пароль" />
				<Typography Type="p" className="auth__subtitle">
					{() => (
						<>
							Введите 4-значный пароль, который мы отправили на ваш номер телефона{" "}
							<span className="color_txt-primary fw_600">{phone}</span>
						</>
					)}
				</Typography>
			</div>

			<Containers.Form
				url="/user/sign-up-phone-confirm?include=userDetail,position"
				className="row g-3"
				normalizeData={(formValues) => ({
					code: formValues.code.join(""),
					phone: formValues.phone,
				})}
				onSuccess={(user) => {
					const fromRegister = get(state, "fromRegister");
					const link = fromRegister ? "/profile" : "/new-password";
					fromRegister && dispatch(auth.success(get(user, "data")));
					storage.set("token", get(user, "data.token"));
					navigate(link);
				}}
				fields={[
					{
						name: "code",
						validationType: "array",
						value: [],
					},
					{
						name: "phone",
						value: phone,
					},
				]}
			>
				{() => (
					<>
						<div className="col-3">
							<FastField
								name="code.0"
								component={Fields.InputMask}
								format="#"
								placeholder=""
								prepend=""
								innerClass="control__input-code"
								onChange={() => {
									focusNextInput(1);
								}}
							/>
						</div>

						<div className="col-3">
							<FastField
								name="code.1"
								component={Fields.InputMask}
								format="#"
								placeholder=""
								prepend=""
								innerClass="control__input-code"
								onChange={() => focusNextInput(2)}
							/>
						</div>

						<div className="col-3">
							<FastField
								name="code.2"
								component={Fields.InputMask}
								format="#"
								placeholder=""
								prepend=""
								innerClass="control__input-code"
								onChange={() => focusNextInput(3)}
							/>
						</div>

						<div className="col-3 ">
							<FastField
								name="code.3"
								component={Fields.InputMask}
								format="#"
								placeholder=""
								prepend=""
								innerClass="control__input-code"
							/>
						</div>

						<div className="col-12">
							<div className="d-flex align-items-center justify-content-center ">
								<Timer />
								<Typography Type="span" className="control__text">
									{() => (
										<>
											Пароль не получен?{" "}
											<a href="#" className="color_brand-blue fw_600">
												Отправить ещё раз
											</a>
										</>
									)}
								</Typography>
							</div>
						</div>

						<div className="col-12 mt_60">
							<Button
								className="btn w_full"
								design="primary"
								type="submit"
								text="Отправить"
							/>
						</div>
					</>
				)}
			</Containers.Form>
		</>
	);
};

export default ConfirmPassword;
