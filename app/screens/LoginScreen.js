import React from 'react';
import {Image, StyleSheet, Text} from "react-native";
import Screen from "../components/Screen";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import {Formik} from 'formik';
import * as Yup from 'yup';
import ErrorMessage from "../components/ErrorMessage";

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password")
})

function LoginScreen(props) {
    return (
        <Screen style={styles.container}>
            <Image style={styles.logo} source={require("../assets/logo.png")}/>

            <Formik initialValues={{email: '', password: ''}} onSubmit={values => console.log(values)} validationSchema={validationSchema}>
                {
                    ({handleChange, handleSubmit, errors, setFieldTouched, touched}) => (
                        <>
                            <AppTextInput keyboardType="email-address"
                                          textContentType="emailAddress"
                                          autoCapitalize="none"
                                          onBlur={() => setFieldTouched("email")}
                                          autoCorrect={false} icon="email"
                                          placeholder="Email"
                                          onChangeText={handleChange("email")}
                            />
                            <ErrorMessage visible={touched.email} error={errors.email}/>
                            <AppTextInput autoCapitalize="none"
                                          autoCorrect={false}
                                          icon="lock"
                                          placeholder="Password"
                                          textContentType="password"
                                          secureTextEntry
                                          onBlur={() => setFieldTouched("password")}
                                          onChangeText={handleChange("password")}
                            />
                            <ErrorMessage error={errors.password} visible={touched.password}  />
                            <AppButton title="Login" onPress={handleSubmit}/>
                        </>
                    )
                }
            </Formik>
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