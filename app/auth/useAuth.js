import {useContext} from "react";
import AuthContext from "./context";
import authStorage from '../auth/storage'
import jwtDecode from "jwt-decode";

export default useAuth = () => {
    const {user, setUser} = useContext(AuthContext)

    const logIn = (authToken) => {
        const {token, refresh_token} = authToken;
        const user = jwtDecode(token);
        setUser(user);
        authStorage.storeToken(token);
        authStorage.storeRefreshToken(refresh_token);
    }

    const logout = () => {
        setUser(null);
        authStorage.removeToken();
        authStorage.removeRefreshToken();
    }
    return {user, logIn, logout}
}
