export const kitchenMenuProductAdapter = (products = []) =>
	products.map((product) => ({
		product_id: product.product,
		quantity: product.quantity,
	}));
