export const constants = {
	KEYCODE_TAB: 9,
	KEYCODE_ESC: 27,

	AUTHORIZED: "authorized",
	UNAUTHORIZED: "unauthorized",

	STEP_REGISTRATION_STARTED: 1,
	STEP_PHONE_CONFIRMED: 2,
	STEP_REGISTRATION_END: 3,

	TYPE_INCOME: 1,
	TYPE_OUTGO: 2,

	TYPE_MALE: 1,
	TYPE_FEMALE: 2,

	DAY_MONDAY: 1,
	DAY_TUESDAY: 2,
	DAY_WEDNESDAY: 3,
	DAY_THURSDAY: 4,
	DAY_FRIDAY: 5,
	DAY_SATURDAY: 6,
	DAY_SUNDAY: 7,

	BREAKFAST: 1,
	LAUNCH: 2,
	DINNER: 3,

	TYPE_EMPLOYEE: 1,
	TYPE_PATIENT: 2,

	STORE_KITCHEN: 1,
	STORE_INVENTORY: 2,
	STORE_DRUG: 3,

	ORDER_PENDING: 1,
	ORDER_IN_PROGRESS: 2,
	ORDER_PAID: 3,
	ORDER_DONE: 4,

	DEGREE_OFFICIAL: 1,
	DEGREE_NOT_OFFICIAL: 2,

	passportRegExp: /^[A-Z]{0,2}[0-9]{0,7}$/g,
};

constants.gender = [
	{
		label: "Male",
		value: constants.TYPE_MALE,
	},
	{
		label: "Female",
		value: constants.TYPE_FEMALE,
	},
];

constants.days = [
	{
		label: "Monday",
		value: constants.DAY_MONDAY,
	},
	{
		label: "Tuesday",
		value: constants.DAY_TUESDAY,
	},
	{
		label: "Wednesday",
		value: constants.DAY_WEDNESDAY,
	},
	{
		label: "Thursday",
		value: constants.DAY_THURSDAY,
	},
	{
		label: "Friday",
		value: constants.DAY_FRIDAY,
	},
	{
		label: "Saturday",
		value: constants.DAY_SATURDAY,
	},
	{
		label: "Sunday",
		value: constants.DAY_SUNDAY,
	},
];

constants.foodTime = [
	{
		label: "Breakfast",
		value: constants.BREAKFAST,
	},
	{
		label: "Launch",
		value: constants.LAUNCH,
	},
	{
		label: "Dinner",
		value: constants.DINNER,
	},
];

constants.foodWhom = [
	{
		label: "Employee",
		value: constants.TYPE_EMPLOYEE,
	},
	{
		label: "Patient",
		value: constants.TYPE_PATIENT,
	},
];

constants.orderTypes = [
	{
		label: "Pending",
		value: constants.ORDER_PENDING,
	},
	{
		label: "In progress",
		value: constants.ORDER_IN_PROGRESS,
	},
	{
		label: "Paid",
		value: constants.ORDER_PAID,
	},
	{
		label: "Done",
		value: constants.ORDER_DONE,
	},
];

constants.storeTypes = [
	{
		label: "Kitchen",
		value: constants.STORE_KITCHEN,
	},
	{
		label: "Inventory",
		value: constants.STORE_INVENTORY,
	},
	{
		label: "Drug",
		value: constants.STORE_DRUG,
	},
];

constants.degreeTypes = [
	{
		label: "Official",
		value: constants.DEGREE_OFFICIAL,
	},
	{
		label: "Not official",
		value: constants.DEGREE_NOT_OFFICIAL,
	},
];

constants.selectAll = {
	label: "Все",
	value: null,
};
