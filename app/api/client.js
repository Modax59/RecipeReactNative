import {create} from "apisauce";
import cache from "../utility/cache";
import authStorage from '../auth/storage';
import useAuth from "../auth/useAuth";
import jwtDecode from "jwt-decode";
import AuthContext from "../auth/context";
import {useContext} from "react";

const apiClient = create({
    baseURL: "http://127.0.0.1:8000/api",
});
let isAlreadyFetchingAccessToken = false
apiClient.axiosInstance.interceptors.response.use(response => response, async error => {
    const status = error.response ? error.response.status : null
    if (status === 401) {
        if (!isAlreadyFetchingAccessToken) {
            isAlreadyFetchingAccessToken = true
            const refreshToken = await authStorage.getRefreshToken()
            return apiClient.post('/token/refresh', {refresh_token: refreshToken})
                .then((data) => {
                    const {token, refresh_token} = data.data;
                    apiClient.addAsyncRequestTransform(request => async () => {
                        if (!data.data) return;
                        request.headers["Authorization"] = "Bearer " + data.data['token'];
                    });
                    authStorage.storeToken(token);
                    authStorage.storeRefreshToken(refresh_token);
                    isAlreadyFetchingAccessToken = false
                });
        }
    }

    return Promise.reject(error);
});


apiClient.addAsyncRequestTransform(request => async () => {
    const authToken = await authStorage.getToken();
    if (!authToken) return;
    request.headers["Authorization"] = "Bearer " + authToken;
});

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
    const response = await get(url, params, axiosConfig);
    if (response.ok) {
        cache.store(url, response.data);
        return response;
    }
    const data = await cache.get(url);
    return data ? {ok: true, data} : response;
}

export default apiClient;
