import React from 'react';
import {useFormikContext} from "formik";
import AppTextInput from "../AppTextInput";
import ErrorMessage from "./ErrorMessage";

function AppFormField({name, width, ...otherProps}) {

    const {setFieldValue, setFieldTouched, errors, touched, values} = useFormikContext();
    return (
        <>
            <AppTextInput
                width={width}
                onBlur={() => setFieldTouched(name)}
                onChangeText={text => setFieldValue(name, text)}
                value={values[name]}
                {...otherProps}
            />
            <ErrorMessage visible={touched[name]} error={errors[name]}/>
        </>
    );
}

export default AppFormField;