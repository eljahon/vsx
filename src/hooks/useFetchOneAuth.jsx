// const {meta, queryKey, pageParam = 1, signal} = context
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { utils } from "services";

export const useFetchOneAuth = ({
								url,
								dataKey = "data",
								customQueryFn,
								queryOptions = {},
								urlSearchParams,
								refetchStatus,
							}) => {
	const [id, setId] = useState("");

	const single = useQuery(
		utils.apiHelpers.getQueryKey("GET", id ? `${url}/${id}` : url, urlSearchParams),

		utils.apiHelpers.ultimateQueryFn(customQueryFn, urlSearchParams),

		{
			select: (data) => {
				console.log(data)
				return utils.apiHelpers.dataSelect(data, dataKey)
			},

			...queryOptions,
		}
	);

	useEffect(() => {
		if (refetchStatus) single.refetch();
	}, [refetchStatus]);

	return { ...single, setId };
};
