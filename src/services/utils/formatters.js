import { isEmpty } from "lodash";

import { constants, time } from "services";

const sizeModifiers = {
	KILO: 1024,
	MEGA: 1048576,
};

const formatPhoneApi = (phone) => {
	const formattedPhone = String(phone).replace(/\(|\)|_|-|\s*/gi, "");

	return formattedPhone[0] !== "+" ? `+${formattedPhone}` : formattedPhone;
};
const formatPhoneView = (phone) => {
	if (!phone) return "";

	const formattedPhone = [];

	String(phone)
		.split("")
		.forEach((char, index) => {
			if (index === 4) formattedPhone[index] = ` (${char}`;
			else if (index === 5) formattedPhone[index] = `${char}) `;
			else if (index === 8) formattedPhone[index] = `${char}-`;
			else if (index === 10) formattedPhone[index] = `${char}-`;
			else formattedPhone[index] = char;
		});

	return formattedPhone.join("");
};

const formatCurrencyApi = (currency) => {
	if (!currency) return 0;
	return parseInt(String(currency).replace(/\s*/g, ""));
};
const formatCurrencyView = (currency, separator = " ") => {
	if (!currency) return 0;
	return String(currency).replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};

const formatSize = (size, measure) => {
	if (!size) return "";

	switch (measure) {
		case "MB":
			return `${(size / sizeModifiers.MEGA).toFixed(4)} MB`;
		case "KB":
			return `${(size / sizeModifiers.KILO).toFixed(4)} KB`;
		default:
			break;
	}
};

const showGender = (genderType) =>
	constants.gender.find((item) => item.value === genderType)?.label;
const getGender = (genderType) => constants.gender.find((item) => item.value === genderType);

const showDay = (dayType) => constants.days.find((item) => item.value === dayType)?.label;
const getDay = (dayType) => constants.days.find((item) => item.value === dayType);

const showFoodTime = (foodTimeType) =>
	constants.foodTime.find((item) => item.value === foodTimeType)?.label;
const getFoodTime = (foodTimeType) =>
	constants.foodTime.find((item) => item.value === foodTimeType);

const showFoodWhom = (foodWhomType) =>
	constants.foodWhom.find((item) => item.value === foodWhomType)?.label;
const getFoodWhom = (foodWhomType) =>
	constants.foodWhom.find((item) => item.value === foodWhomType);

const showOrderType = (orderType) => {
	if (orderType < 0) return "Canceled";
	return constants.orderTypes.find((item) => item.value === orderType)?.label;
};
const getOrderType = (orderType) => constants.orderTypes.find((item) => item.value === orderType);

const showDegree = (degreeType) =>
	constants.degreeTypes.find((item) => item.value === degreeType)?.label;

const getDegree = (degreeType) => constants.degreeTypes.find((item) => item.value === degreeType);

const showStoreType = (storeType) =>
	constants.storeTypes.find((item) => item.value === storeType)?.label;

const getStoreType = (storeType) => constants.storeTypes.find((item) => item.value === storeType);

const getOrderTypeClass = (orderTypeId) => {
	if (
		orderTypeId === constants.ORDER_PENDING ||
		orderTypeId === constants.ORDER_IN_PROGRESS ||
		orderTypeId === constants.ORDER_PAID
	)
		return "warning";
	else if (orderTypeId === constants.ORDER_DONE) return "success";
	else return "danger";
};

const menuName = (menuKey) => {
	switch (menuKey) {
		case "cashbox":
			return "Касса";
		case "stock":
			return "Склад";
		case "supply":
			return "Снабжение";
		case "kitchen":
			return "Кухня";
		case "inventory":
			return "Инвентарь";
		case "settings":
			return "Настройки";
		default:
			return "";
	}
};

const getRange = (range = []) => {
	if (isEmpty(range)) return {};

	return {
		start_at: time.toTimestamp(range[0]),
		end_at: time.toTimestamp(range[1]),
	};
};

export const formatters = {
	formatPhoneApi,
	formatPhoneView,
	formatSize,
	formatCurrencyApi,
	formatCurrencyView,
	showGender,
	getGender,
	showDay,
	getDay,
	showFoodTime,
	getFoodTime,
	showFoodWhom,
	getFoodWhom,
	showOrderType,
	getOrderType,
	getOrderTypeClass,
	menuName,
	showDegree,
	getDegree,
	getRange,
	showStoreType,
	getStoreType,
};
