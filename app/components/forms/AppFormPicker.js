import React from 'react';
import {useFormikContext} from "formik";

import AppPicker from "../AppPicker";
import ErrorMessage from "./ErrorMessage";

function AppFormPicker({items,numberOfColumns, name, PickerItemComponent, width, placeholder}) {
    const {errors, setFieldValue, touched, values} = useFormikContext();
    return (
        <>
            <AppPicker numberOfColumns={numberOfColumns} width={width} PickerItemComponent={PickerItemComponent} items={items} onSelectItem={(item) => setFieldValue(name, item)} placeholder={placeholder} selectedItem={values[name]} />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
}

export default AppFormPicker;