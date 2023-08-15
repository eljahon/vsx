import { utils } from "services";

export const excelAdapter = (excelStat = {}) => {
	let totalSum = 0;
	const res = [];
	Object.entries(excelStat).forEach((item, index) => {
		res[index] = {
			label: item[0],
			value: utils.formatters.formatCurrencyView(item[1]),
		};
		totalSum += Number(item[1]);
	});
	return [{ label: "Общая Сумма", value: utils.formatters.formatCurrencyView(totalSum) }, ...res];
};
