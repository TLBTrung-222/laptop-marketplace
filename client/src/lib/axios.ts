import axios, { CreateAxiosDefaults } from "axios";

const config: CreateAxiosDefaults = {
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL!}/api`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
};
const axiosClient = axios.create(config);

axiosClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.log("🚀 ~ error:", error);
        throw error;
    }
);

export { axiosClient };
