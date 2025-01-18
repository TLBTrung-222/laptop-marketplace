import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://147.93.98.121:3001/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export { axiosClient };
