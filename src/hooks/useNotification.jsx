import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const useNotification = () => {
	const { t } = useTranslation();

	return {
		success: (message, config = {}) =>
			toast.success(t(message), { autoClose: 2000, ...config }),
		error: (message, config = {}) => toast.error(t(message), { autoClose: 2000, ...config }),
		warning: (message, config = {}) =>
			toast.warning(t(message), { autoClose: 2000, ...config }),
	};
};
