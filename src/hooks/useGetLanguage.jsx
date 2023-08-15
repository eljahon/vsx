import { useSelector } from "react-redux";

import { lngSelector, languagesSelector } from "store/selectors";

export const useGetLanguage = () => {
	const lng = useSelector(lngSelector);
	const languages = useSelector(languagesSelector);

	const getLanguageValue = (objectLng = {}) => {
		if (objectLng[lng]) return objectLng[lng];
		else {
			return Object.values(objectLng).find((item) => item);
		}
	};

	return { lng, languages, getLanguageValue };
};
