import { useMutation } from "@tanstack/react-query";
import { useNotification } from "hooks";

import { utils } from "services";
import { get, isFunction } from "lodash";

export const useDelete = ({ url, customQueryFn, queryOptions = {}, method = "DELETE" }) => {
	const notifier = useNotification();

	const mutation = useMutation(
		utils.apiHelpers.getQueryKey(method, url),

		utils.apiHelpers.ultimateQueryFn(customQueryFn),

		{
			retry: false,
			...queryOptions,
			onSuccess: (response) => {
				notifier.success("Действие успешно завершено");
				isFunction(get(queryOptions, "onSuccess")) && queryOptions.onSuccess(response);
			},
			onError: (response) => {
				notifier.error(get(response, "data.message", "Что то пошло не так"));
				isFunction(get(queryOptions, "onError")) && queryOptions.onError(response);
			},
		}
	);

	return {
		...mutation,
		mutate: (appendUrl) =>
			mutation.mutate({
				queryKey: utils.apiHelpers.getQueryKey(
					method,
					appendUrl ? `${url}/${appendUrl}` : url
				),
			}),
		mutateAsync: (appendUrl) =>
			mutation.mutateAsync({
				queryKey: utils.apiHelpers.getQueryKey(
					method,
					appendUrl ? `${url}/${appendUrl}` : url
				),
			}),
	};
};
