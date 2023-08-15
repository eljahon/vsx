export const productAdapter = (product = []) => {
	return product.map((item) => ({
		product_id: {
			title: item.product,
			id: item.id,
		},
		quantity: item.quantity,
	}));
};
