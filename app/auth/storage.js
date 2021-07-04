import * as SecureStore from 'expo-secure-store'
import jwtDecode from "jwt-decode";

const key = "authToken"
const refresh_key = "refresh_token"
const storeToken = async (authToken) => {
    try {
        await SecureStore.setItemAsync(key, authToken);
    } catch (error) {
        console.log('Erreur pendant la mise en mémoire du token', error);
    }
}

const getToken = async () => {
    try {
        return await SecureStore.getItemAsync(key);
    } catch (error) {
        console.log('Erreur pendant la recup du token', error);
    }
}

const getUser = async () => {
    const token = await getToken();
    return (token) ? jwtDecode(token): null;
}

const removeToken = async () => {
    try {
        await SecureStore.deleteItemAsync(key);
    }catch (error) {
        console.log('Erreur pendant la suppression du token', error);
    }
}

const storeRefreshToken = async (refresh_token) => {
    try {
        await SecureStore.setItemAsync(refresh_key, refresh_token);
    } catch (error) {
        console.log('Erreur pendant la mise en mémoire du token', error);
    }
}

const getRefreshToken = async () => {
    try {
        return await SecureStore.getItemAsync(refresh_key);
    } catch (error) {
        console.log('Erreur pendant la recup du token', error);
    }
}

const removeRefreshToken = async () => {
    try {
        await SecureStore.deleteItemAsync(refresh_key);
    }catch (error) {
        console.log('Erreur pendant la suppression du token', error);
    }
}

export default {
     getToken, getUser, removeToken, storeToken, removeRefreshToken, getRefreshToken, storeRefreshToken
}