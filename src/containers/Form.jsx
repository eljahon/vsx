import React from "react";
import PropTypes from "prop-types";
import { Form, Formik } from "formik";
import { isFunction, get } from "lodash";

import { httpClient, utils, queryBuilder } from "services";
import { useGetLanguage, useNotification } from "hooks";
import {useNavigate} from "react-router-dom";

export const FormContainer = ({
	url,
	params,
	method = "post",
	children,
	isFormData = false,
	fields = [],
	normalizeData,
	axiosConfig = {},
	onSuccess = () => {},
	onError = () => {},
	onFinal = () => {},
	customData={},
	onSubmit,
	...formProps
}) => {
	// console.log(method)
	const { languages } = useGetLanguage();
	const notifier = useNotification();
	const navLink = useNavigate()
	const { initialValues, validationSchema } = utils.formHelpers.createFormSchema(
		fields,
		languages
	);
	// console.log("initialValues", initialValues)
	const handleSubmit = (values, formHelpers) => {
		const formValues = utils.formHelpers.getFormValues(
			values,
			fields,
			isFormData,
			normalizeData,
			languages
		);
		const requestUrl = params ? queryBuilder(url, params) : url;

		httpClient[method](requestUrl, {data: {...formValues,...customData}}, axiosConfig)
			.then(({ data }) => {
				formHelpers.resetForm();
				onSuccess(data);
				notifier.success("Действие успешно завершено");
			})

			.catch((error) =>{
				// console.log(error)
				onError(error);
				formHelpers.setErrors(get(error, "response.data.errors"));

				notifier.error(utils.formHelpers.gerErrorMessage(error));
			})

			.finally(() => {
				formHelpers.setSubmitting(false);
				onFinal();
			});
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={
				(value,formHelpers) => {
					// console.log(value)
					isFunction(onSubmit) ? onSubmit(value, formHelpers) : handleSubmit(value, formHelpers)
				}
			}
			enableReinitialize={true}
		>
			{(formik) => {
				console.log(formik)
				return <Form {...formProps}>{children(formik)}</Form>
			}}
		</Formik>
	);
};

FormContainer.propTypes = {
	url: PropTypes.string,
	method: PropTypes.oneOf(["post", "put"]),
	children: PropTypes.func,
	isFormData: PropTypes.bool,
	fields: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			value: PropTypes.any,
			validationType: PropTypes.string,
			validations: PropTypes.array,
			lazy: PropTypes.func,
			submitKey: PropTypes.string,
			onSubmitValue: PropTypes.func,
			isLanguageSchema: PropTypes.bool,
		})
	),
	axiosConfig: PropTypes.object,
	normalizeData: PropTypes.func,
	onSuccess: PropTypes.func,
	onError: PropTypes.func,
	onFinal: PropTypes.func,
};

/*

    yupValidation = string | number | boolean | date | object | array

    Field Object Structure
        name: String,
        value: Any,
        validationType: yupValidation,
        validations: [{type: yupValidation, params: Any}]
        onSubmitKey: String
        onSubmitValue: Function

*/
