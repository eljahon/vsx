import { utils } from "services";

export const storeOrderAdapter = (stats = {}) => {
	const res = [];
	Object.entries(stats).forEach((item, index) => {
		res[index] = {
			label: getLabel(item[0]),
			value: utils.formatters.formatCurrencyView(Math.round(item[1])),
		};
	});
	return res;
};

const getLabel = (key) => {
	switch (key) {
		case "total_price":
			return "Общая Сумма";
		case "total_count":
			return "Количество продуктов";
		case "average":
			return "Средняя цена продуктов";
		default:
			return "";
	}
};
