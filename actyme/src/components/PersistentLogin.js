import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
    const [isLoading, setLoading] = useState(true);
    const { auth } = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {
        const checkToken = async () => {
            try {
                const resp = await refresh();
                console.log("Refreshed token: ", resp);
            } catch (err) {
                console.error(err);
            } finally {
            }
        }
        !auth?.token ? checkToken() : setLoading(false);
    }, [auth.token, refresh]);

    return (
        <>
            {isLoading ? <p>Loading...</p> : <Outlet />}
        </>
    )
}

export default PersistLogin;
