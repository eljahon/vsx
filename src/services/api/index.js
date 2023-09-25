import axios from "axios";
// import { stringify } from "qs";
import { storage } from "services/storage";
import {useNavigate} from "react-router-dom";
import config from "config";
function clear () {
    console.log('clear')
    localStorage.clear()
    nav('/login')
}
function ErrorHandle (code) {
    const nav  = useNavigate()
    switch (code) {
        case 400: return clear();
        case 401: return clear();
        case 403: return clear();
        case 404: return clear();
        case 405: return clear();
    }
}
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
      console.log(error)
    return Promise.reject(error);
  }
);
httpClient.interceptors.response.use(
	(response) => {
        return response
	},
	(error) => {
        const {response:{status
        }} = error;
		ErrorHandle(status);
		return Promise.reject(error);
	}
);

// request.defaults.params = {};
// request.defaults.params["_f"] = "json";
// request.defaults.headers.common["Accept"] = "application/json";
// request.defaults.headers.common["Cache-Control"] = "no-cache";
// request.defaults.headers.common["Content-Type"] = "application/json; charset=utf-8";
