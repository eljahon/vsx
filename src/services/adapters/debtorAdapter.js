import { utils } from "services";
import { get } from "lodash";

export const debtorAdapter = (statistics = {}) => [
	{
		label: "Итого долг:",
		value: utils.formatters.formatCurrencyView(get(statistics, "total_price")),
	},
	{
		label: "Средний долг:",
		value: utils.formatters.formatCurrencyView(Math.round(get(statistics, "average"))),
	},
	{
		label: "Кол-во должников:",
		value: utils.formatters.formatCurrencyView(get(statistics, "total_count")),
	},
	{
		label: "Просроченные долги:",
		value: utils.formatters.formatCurrencyView(get(statistics, "expired_count")),
	},
];
