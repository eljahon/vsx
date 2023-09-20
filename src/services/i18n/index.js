// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import Backend from "i18next-http-backend";
//
// import config from "config";
// import { storage } from "services/storage";
//
// const fallbackLng = localStorage.getItem('locale')||'uz';
// // const supportedLngs = ["uz", "ru", "en"];
// i18n
// 	.use(Backend)
// 	.use(initReactI18next)
// 	.init({
// 		lng: 'uz', // default language
// 		fallbackLng: fallbackLng, // fallback language
// 		keySeparator: false, // allow using keys with dots in JSON
// 		interpolation: {
// 			escapeValue: false, // react already safe from xss
// 		},
// 		backend: {
// 			loadPath: '/locales/{{lng}}.json', // path to your JSON files
// 		},
// 	});
// //
// // const options = {
// // 	fallbackLng,
// // 	supportedLngs,
// // 	keySeparator: false,
// // 	interpolation: {
// // 		escapeValue: false,
// // 		formatSeparator: ",",
// // 	},
// //
// // 	saveMissing: false,
// // 	react: {
// // 		useSuspense: false,
// // 		waiting: false,
// // 	},
// //
// // 	backend: {
// // 		addPath: `${config.baseUrl}/translation`,
// // 		loadPath: `${config.baseUrl}/translations?fields=key&fields=${fallbackLng}`,
// // 		parse(data) {
// // 			// console.log(data, i18n)
// // 			const response = JSON.parse(data);
// // 			return response.data;
// // 		},
// // 		parsePayload: function(namespace, key, fallbackValue) {
// // 			// console.log(namespace, key, fallbackValue)
// // 		},
// // 		allowMultiLoading: false,
// // 		reloadInterval: false,
// // 		customHeaders: {
// // 			Authorization: `Bearer ${storage.get("token")}`,
// // 		},
// // 	},
// // };
// //
// // i18n.use(Backend).use(initReactI18next).init(options);
//
// export default i18n;
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import uz from '../../locales/uz.json'
i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		// we init with resources
		resources: {
			uz: {
				translations: uz
			}
		},
		fallbackLng: "uz",
		debug: true,

		// have a common namespace used around the full app
		ns: ["translations"],
		defaultNS: "translations",

		keySeparator: false, // we use content as keys

		interpolation: {
			escapeValue: false
		}
	});

export default i18n;
