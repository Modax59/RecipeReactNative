import React, { useState} from 'react';
import {Image, StyleSheet} from "react-native";
import Screen from "../components/Screen";
import * as Yup from 'yup';
import {ErrorMessage, AppForm, AppFormField, SubmitButton} from '../components/forms'
import authApi from '../api/auth'
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password")
})

function LoginScreen(props) {
    const auth = useAuth()
    const [loginFailed, setLoginFailed] = useState(false);
    const handleSubmit = async ({email, password}) => {
        const result = await authApi.login(email, password);
        if (!result.ok) return setLoginFailed(true);
        setLoginFailed(false);
        auth.logIn(result.data)
    }
    return (
        <Screen style={styles.container}>
            <Image style={styles.logo} source={require("../assets/logo.png")}/>

            <AppForm initialValues={{email: '', password: ''}} onSubmit={handleSubmit}
                     validationSchema={validationSchema}>
                <ErrorMessage error="Email ou Mot de passe invalide" visible={loginFailed}/>
                <AppFormField keyboardType="email-address"
                              textContentType="emailAddress"
                              autoCapitalize="none"
                              autoCorrect={false} icon="email"
                              placeholder="Email"
                              name="email"
                />
                <AppFormField autoCapitalize="none"
                              autoCorrect={false}
                              icon="lock"
                              placeholder="Password"
                              textContentType="password"
                              secureTextEntry
                              name="password"
                />
                <SubmitButton title="Login"/>

            </AppForm>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    logo: {
        alignSelf: "center",
        marginTop: 50,
        marginBottom: 20
    }
})
export default LoginScreen;