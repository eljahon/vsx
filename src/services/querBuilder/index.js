import { isArray } from "lodash";
import qs from 'qs'

export const queryBuilder = (url, config = {}) => {
	console.log(config, '====>>>')
	if (Object.keys(config).length <= 0) return url;
	const s = qs.stringify(config, {encodeValuesOnly: true})
	console.log(s)
	const queryObj = new URLSearchParams(s);
	return `${url}?${decodeURIComponent(queryObj.toString())}`;
};
