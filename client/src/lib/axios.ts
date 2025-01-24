import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://laptop-marketplace.shop/api",
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
