const LNG = "CHANGE_LNG";
const THEME = "CHANGE_THEME";
const LANGUAGES = "GET_LANGUAGES";

const changeLanguage = (payload) => ({
	type: LNG,
	payload,
});

const changeTheme = (payload) => ({
	type: THEME,
	payload,
});

const changeLanguages = (payload) => ({ type: LANGUAGES, payload });

export const system = {
	LNG,
	THEME,
	LANGUAGES,
	changeLanguage,
	changeTheme,
	changeLanguages,
};
