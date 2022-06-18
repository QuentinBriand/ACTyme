import { useEffect } from "react";
import { securedAxios } from "../api/axios";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useSecuredAxios = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    useEffect(() => {
        const reqIntercept = securedAxios.interceptors.request.use(
            config => {
                if (config.headers["authorization"] === undefined) {
                    config.headers["authorization"] = `Bearer ${auth?.token}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const resIntercept = securedAxios.interceptors.response.use(
            response => response,
            async (error) => {
                const prevReq = error?.config;
                if (error?.response?.status === 401 && !prevReq?.sent) {
                    prevReq.sent = true;
                    const newToken = await refresh();
                    prevReq.headers["authorization"] = `Bearer ${newToken}`;
                    return securedAxios(prevReq);
                }
                return Promise.reject(error);
            }
        )
        return () => {
            securedAxios.interceptors.request.eject(reqIntercept);
            securedAxios.interceptors.response.eject(resIntercept);
        };
    },[auth, refresh]);

    return securedAxios;
};

export default useSecuredAxios;
