import { isArray } from "lodash";
const querRecurce = (filters) => {
	for(let key in filters) {
		if(typeof  filters[key] === 'string'||typeof  filters[key] === 'number') return `[${key}]=`+`${filters[key]}`
		return `[${key}]`+querRecurce(filters[key])
	}
}
export const queryBuilder = (url, config = {}) => {
	if (Object.keys(config).length <= 0) return url;

	const { sort = "", pageSize, page = 1, extra = {}, filters = {}, populate="*" } = config;
	const queryObj = new URLSearchParams();
	if (Object.keys(filters).length)
	{
		const s = 'filters'+querRecurce(filters);
		console.log(s)
		const d = s.split('=');
		 queryObj.append(`${d[0]}`, d[1])
	}

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
