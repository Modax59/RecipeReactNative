import React from "react";
import ImageInputList from "../ImageInputList";
import { ErrorMessage } from "./index";
import { useFormikContext } from "formik";
import ImageInput from "../ImageInput";

function AppFormSingleImagePicker({ name }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const handleAdd = (uri) => {
    setFieldValue(name, uri);
  };
  return (
    <>
      <ImageInput imageUri={values[name]} onChangeImage={handleAdd} />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormSingleImagePicker;
