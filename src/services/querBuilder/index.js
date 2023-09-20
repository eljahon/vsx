import { isArray } from "lodash";
import qs from 'qs'
export const queryBuilder = (url, config = {}) => {
	if (Object.keys(config).length <= 0) return url;

	const { sort = "", pageSize, page = 1, extra = {}, filters = {}, populate="*" } = config;
	const queryObj = new URLSearchParams();
	console.log(Object.entries(filters), 'filtes')
	if (Object.keys(filters).length)
		Object.entries(filters).forEach((item) => {
			if (isArray(item[1])) {
				item[1].forEach((inner, index) =>
					queryObj.append(`filter[${item[0]}][${index}]`, inner)
				);
			} ;
		});

	if (Object.keys(extra).length)
		Object.entries(extra).forEach((item) => {
			if (item[0] && item[1]) queryObj.append(item[0], item[1]);
		});

	 // if (include.length) queryObj.set("include", include.toString());
     if(populate) queryObj.set('populate',populate)
	if (sort) queryObj.set(`sort[id]`, sort.id);
	if (pageSize) queryObj.set("pagination[pageSize]", pageSize);
	queryObj.set("pagination[page]", page);

	return `${url}?${decodeURIComponent(queryObj.toString())}`;
};
