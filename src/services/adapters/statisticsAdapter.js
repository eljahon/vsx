import { isArray, get, isFunction } from "lodash";

import { utils } from "services";

export const statisticsAdapter = (arr, labelPath, valuePath, total) => {
	if (!isArray(arr)) return [];

	const newArr = arr.reduce((prev, item) => {
		return [
			...prev,
			{
				label: isFunction(labelPath) ? labelPath(item) : get(item, labelPath),
				value: utils.formatters.formatCurrencyView(get(item, valuePath)),
			},
		];
	}, []);

	return [{ label: "Общая Сумма", value: utils.formatters.formatCurrencyView(total) }, ...newArr];
};
