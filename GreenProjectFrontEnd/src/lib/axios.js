// lib/api.js
import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8099/',
    timeout: 10000,
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

instance.interceptors.response.use(
    (res) => {
        console.log("Full response:", res);
        return res.data;
    }, // Her response'da .data yazmaya gerek kalmaz
    (err) => {
        if (err.response?.status === 401) {
            // window.location.href = "/login";
            // 401 hatasında popup veya yönlendirme yapılmasın
        }
        return Promise.reject(err);
    }
);

// Tüm istekler buradan yapılır
export const api = {
    get: (url, config) => instance.get(url, config),
    post: (url, data, config) => instance.post(url, data, config),
    put: (url, data, config) => instance.put(url, data, config),
    delete: (url, config) => instance.delete(url, config),
};
