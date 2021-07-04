import React, { useState} from "react";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthContext from "./app/auth/context";
import authStorage from './app/auth/storage'
import AppLoading from 'expo-app-loading';


export default function App() {
    const [user, setUser] = useState();
    const [isReady, setIsReady] = useState(false);
    const restoreUser = async () => {
        const user = await authStorage.getUser();
        if (user) setUser(user);
    };

    if (!isReady)
        return (<AppLoading startAsync={restoreUser} onError={() => console.log("Erreur pendant loading du token")} onFinish={() => setIsReady(true)}/>);


    return (
        <AuthContext.Provider value={{user, setUser}}>
            <OfflineNotice/>
            <NavigationContainer theme={navigationTheme}>
                {user ? <AppNavigator/> : <AuthNavigator/>}
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
