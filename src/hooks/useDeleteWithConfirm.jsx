import { useState } from "react";
import { useDelete } from "./useDelete";
import { useOverlay } from "hooks/useOverlay";

export const useDeleteWithConfirm = ({
	uniqueName,
	url,
	customQueryFn,
	queryOptions = {},
	method,
}) => {
	const [id, setId] = useState();

	const confirmModal = useOverlay({ uniqueName });
	const currencyDelete = useDelete({
		url,
		customQueryFn,
		queryOptions,
		method,
	});

	return { ...currencyDelete, ...confirmModal, id, setId };
};
