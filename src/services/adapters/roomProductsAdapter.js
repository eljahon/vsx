import { get } from "lodash";

export const roomProductsAdapter = (stockProducts = []) =>
	stockProducts.map((item) => ({
		stock_product_id: get(item, "stockProduct"),
		product_id: get(item, "product_id"),
		code: get(item, "code"),
	}));
