import React from "react";
import { FastField } from "formik";
import { get } from "lodash";

import { constants, time, utils } from "services";

import Containers from "containers";
import { ModalDefault, Fields, Button } from "components";

export const PatientModal = ({ isOpen, handleModalClose, onSuccess, isUpdate, values }) => {
	return (
		<ModalDefault
			innerClass="max-width_700"
			isOpen={isOpen}
			handleModalClose={handleModalClose}
			title={isUpdate ? "Обновить пациента" : "Создать пациента"}
		>
			<Containers.Form
				url={isUpdate ? `/patient/${get(values, "id")}` : "/patient"}
				method={isUpdate ? "put" : "post"}
				onSuccess={onSuccess}
				fields={[
					{
						name: "first_name",
						validations: [{ type: "required" }],
						value: get(values, "first_name"),
					},
					{
						name: "last_name",
						validations: [{ type: "required" }],
						value: get(values, "last_name"),
					},
					{
						name: "middle_name",
						validations: [{ type: "required" }],
						value: get(values, "last_name"),
					},
					{
						name: "birthdate",
						validations: [{ type: "required" }],
						value: time.toDate(get(values, "birthdate")),
						onSubmitValue: (value) => time.toTimestamp(value),
					},
					{
						name: "passport_number",
						validations: [{ type: "required" }],
						value: get(values, "passport_number"),
					},
					{
						name: "address",
						validations: [{ type: "required" }],
						value: get(values, "address"),
					},
					{
						name: "phone",
						validations: [{ type: "phone" }],
						value: utils.formatters.formatPhoneView(get(values, "phone")),
						onSubmitValue: (value) => utils.formatters.formatPhoneApi(value),
					},
					{
						name: "gender",
						validationType: "object",
						validations: [{ type: "required" }],
						value: utils.formatters.getGender(get(values, "gender")),
						onSubmitValue: (value) => get(value, "value"),
					},
					{
						name: "status",
						value: 10,
					},
				]}
			>
				{({ isSubmitting, values }) => (
					<>
						<div className="row g-4">
							<div className="col-6">
								<FastField
									name="first_name"
									component={Fields.InputText}
									label="Имя"
									placeholder="имя"
								/>
							</div>

							<div className="col-6">
								<FastField
									name="last_name"
									component={Fields.InputText}
									label="Фамилия"
									placeholder="фамилия"
								/>
							</div>

							<div className="col-6">
								<FastField
									name="middle_name"
									component={Fields.InputText}
									label="Отчество"
									placeholder="отчество"
								/>
							</div>

							<div className="col-6">
								<FastField
									name="gender"
									component={Fields.Select}
									label="Пол"
									placeholder="пол"
									options={constants.gender}
								/>
							</div>

							<div className="col-6">
								<FastField
									name="passport_number"
									component={Fields.InputText}
									label="Серия пасспорта"
									placeholder="серия пасспорта"
									isValid={(event) =>
										event.target.value.match(constants.passportRegExp)
									}
								/>
							</div>

							<div className="col-6">
								<FastField
									name="birthdate"
									component={Fields.DatePicker}
									label="День рождения"
									placeholder="день рождения"
									prepend=""
								/>
							</div>

							<div className="col-6">
								<FastField
									name="address"
									component={Fields.InputText}
									label="Адрес"
									placeholder="адрес"
								/>
							</div>

							<div className="col-6">
								<FastField
									name="phone"
									component={Fields.InputMask}
									label="Тел.Номер"
									prepend=""
								/>
							</div>
						</div>

						<Button
							design="primary"
							type="submit"
							className="btn modal-btn  mt_40"
							text="Сохранить"
							isLoading={isSubmitting}
						/>
					</>
				)}
			</Containers.Form>
		</ModalDefault>
	);
};
