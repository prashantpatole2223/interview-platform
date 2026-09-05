import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.BACKEND_API_URL,
    withCredentials: true,
});

let authFailureHandler = null;

export const setAuthFailureHandler = (handler) => {
    authFailureHandler = handler;
}

let failedQueue = [];

let isRefreshing = false;

const processQueue = ((error) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    })

    failedQueue = [];
})

api.interceptors.response.use(
    (response) => {
        return response;
    },

    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status !== 401) {
            return Promise.reject(error);
        }

        const excludedPaths = [
            "/auth/login",
            "/auth/signup",
            "/auth/refresh",
        ];

        if (excludedPaths.includes(originalRequest.url)) {
            return Promise.reject(error);
        }

        if (originalRequest._retry) {
            return Promise.reject(error);
        }

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({
                    resolve,
                    reject
                })
            })
                .then(() => {
                    return api(originalRequest);
                })
                .catch((err) => {
                    return Promise.reject(err)
                })
        }

        isRefreshing = true;
        originalRequest._retry = true;

        try {
            await api.post('/auth/refresh');

            processQueue(null);

            return api(originalRequest);
        } catch (refreshError) {

            processQueue(refreshError);

            if (authFailureHandler) {
                authFailureHandler();
            }

            return Promise.reject(refreshError);
        }finally {
            isRefreshing = false;
        }
    }
)

export default api;