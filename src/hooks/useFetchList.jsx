import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { utils } from "services";

export const useFetchList = ({
	url,
	dataKey = "data",
	metaKey = "meta",
	customQueryFn,
	queryOptions = {},
	urlSearchParams = {},
}) => {
	const [page, setPage] = useState(1);
	const params = { page, ...urlSearchParams };

	let meta;
	const query = useQuery(
		utils.apiHelpers.getQueryKey("GET", url, params),

		utils.apiHelpers.ultimateQueryFn(customQueryFn, params),

		{
			select: (responseData) => {
				meta = utils.apiHelpers.metaSelect(responseData, metaKey);
				return utils.apiHelpers.dataSelect(responseData, dataKey);
			},

			...queryOptions,
		}
	);

	return {
		...query,
		meta,
		setPage,
		page,
	};
};
