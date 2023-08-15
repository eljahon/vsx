import React from "react";
import { FastField } from "formik";
import { get } from "lodash";

import { time, utils } from "services";

import Containers from "containers";
import { ModalDefault, Fields, Button, Typography } from "components";
import { ReactComponent as AddIcon } from "assets/icons/add-item.svg";

export const CreateOrderModal = ({ isOpen, handleModalClose, onSuccess, user, orderType = 1 }) => {
	const handleRemoveProduct = (selectedIndex, values, setFieldValue) => {
		const newProducts = values.items.filter((item, index) => index !== selectedIndex);
		setFieldValue("items", newProducts);
	};

	const handleAddProduct = (products, setFieldValue) => {
		const newProduct = {
			product_id: "",
			quantity: "",
		};
		setFieldValue("items", [...products, newProduct]);
	};

	return (
		<ModalDefault
			innerClass="max-width_700"
			isOpen={isOpen}
			handleModalClose={handleModalClose}
			title="Новый заказ"
			subtitle={() => (
				<>
					<span className="color_txt-primary fw_600">{get(user, "username")}</span>{" "}
					(Кассир)
				</>
			)}
		>
			<Containers.Form
				url="/order"
				method="post"
				onSuccess={(response) => {
					handleModalClose();
					onSuccess();
				}}
				fields={[
					{
						name: "items",
						validationType: "array",
						value: [
							{
								product_id: "",
								quantity: "",
							},
						],
						lazy: (validator, yup) =>
							validator.of(
								yup.object().shape({
									product_id: yup.object(),
									quantity: yup.string(),
								})
							),
						onSubmitValue: (value) =>
							value.map((item) => ({
								product_id: get(item, "product_id.id"),
								quantity: utils.formatters.formatCurrencyApi(item.quantity),
							})),
					},
					{
						name: "expired_at",
						onSubmitValue: (value) => time.toTimestamp(value),
					},
					{
						name: "type",
						value: orderType,
					},
					{
						name: "price",
						value: 0,
					},
				]}
			>
				{({ isSubmitting, values, setFieldValue }) => (
					<>
						<FastField
							name="expired_at"
							component={Fields.DatePicker}
							prepend=""
							placeholder="00.00.0000"
							label="Срок сдачи"
						/>

						<Products
							products={values.items}
							onRemove={(selectedIndex) => {
								handleRemoveProduct(selectedIndex, values, setFieldValue);
							}}
							setFieldValue={setFieldValue}
							totalPrice={values.total_price}
						/>

						<Button
							className="add-item mt_20"
							prepend={<AddIcon />}
							text="Добавить еще"
							onClick={(event) => handleAddProduct(values.items, setFieldValue)}
						/>

						<Button
							design="primary"
							type="submit"
							className="btn modal-btn mt_40"
							text="Сохранить"
							isLoading={isSubmitting}
						/>
					</>
				)}
			</Containers.Form>
		</ModalDefault>
	);
};

const Products = ({ products, onRemove, setFieldValue, totalPrice }) =>
	products.map((product, index) => (
		<div key={index} className="mt_40">
			<div className="d-flex align-items-center justify-content-between mb_20">
				<Typography
					Type="span"
					className="color_brand-blue product__btn"
					text={`${index + 1}-ПРОДУКТ`}
				/>

				{index !== 0 && (
					<Button
						className="color_primary-red product__btn"
						text="Удалить"
						onClick={(event) => onRemove(index, event)}
					/>
				)}
			</div>

			<div key={index} className="row g-4">
				<div className="col-6">
					<FastField
						name={`items.${index}.product_id`}
						component={Fields.AsyncSelect}
						label="Продукт"
						placeholder="продукт"
						loadOptionsUrl="/product"
						getOptionLabel="title"
					/>
				</div>

				<div className="col-6">
					<FastField
						name={`items.${index}.quantity`}
						component={Fields.InputNumber}
						label="Колличество"
						placeholder="колличество"
					/>
				</div>
			</div>
		</div>
	));
