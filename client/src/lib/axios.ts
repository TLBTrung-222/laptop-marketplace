import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://147.93.98.121:3001/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

axiosClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error.response.data.errors);
    },
);

export { axiosClient };
