import axios from "axios";
import { server } from "../utils/APIRoutes";

export default axios.create({
    baseURL: server
});

export const securedAxios = axios.create({
    baseURL: server,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});
