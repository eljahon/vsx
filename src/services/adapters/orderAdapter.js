import { get } from "lodash";

import { utils } from "services";

export const orderAdapter = (statistics) => [
	{
		label: "Общая сумма",
		value: utils.formatters.formatCurrencyView(get(statistics, "total_price")),
	},
	{
		label: "Средняя цена продуктов",
		value: utils.formatters.formatCurrencyView(Math.round(get(statistics, "average"))),
	},
	{
		label: "Количество продуктов",
		value: utils.formatters.formatCurrencyView(get(statistics, "total_count")),
	},
];
