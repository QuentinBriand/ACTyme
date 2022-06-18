import axios from "../api/axios";
import useAuth from "./useAuth";

function useRefreshToken() {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/api/auth/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            return { ...prev, token: response.data.accessToken }
        });
        return response.data.accessToken;
    }
    return refresh;
}

export default useRefreshToken
