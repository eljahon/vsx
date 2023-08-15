export const kitchenMenuFoodAdapter = (food = []) =>
	food.map((item) => ({
		food_id: item.food,
		quantity: item.quantity,
	}));
