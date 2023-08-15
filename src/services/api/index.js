import axios from "axios";
// import { stringify } from "qs";
import { storage } from "services/storage";
import config from "config";

 export const httpClient = axios.create({
  baseURL: config.baseUrl,
    // params: {},
    // paramsSerializer: (params) => stringify(params, { encodeValuesOnly: true })
});

httpClient.interceptors.request.use(

  (config) => {
    const isPublicApi = localStorage.getItem("token");
    if (isPublicApi) {
      config.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "token"
      )}`;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);
// httpClient.interceptors.response.use(
// 	(response) => {
// 		const _data = response
//         return response
// 	},
// 	(error) => {
// 		console.log(error);
// 		return Promise.reject(error);
// 	}
// );

// request.defaults.params = {};
// request.defaults.params["_f"] = "json";
// request.defaults.headers.common["Accept"] = "application/json";
// request.defaults.headers.common["Cache-Control"] = "no-cache";
// request.defaults.headers.common["Content-Type"] = "application/json; charset=utf-8";
