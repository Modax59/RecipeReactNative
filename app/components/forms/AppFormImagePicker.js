import React from "react";
import ImageInputList from "../ImageInputList";
import { ErrorMessage } from "./index";
import { useFormikContext } from "formik";

function AppFormImagePicker({ name }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUris = values[name];
  const handleAdd = (uri) => {
    setFieldValue(name, [...imageUris, uri]);
  };
  const handleDelete = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri),
    );
  };
  return (
    <>
      <ImageInputList
        imageUris={values[name]}
        onAddImage={handleAdd}
        onRemoveImage={handleDelete}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormImagePicker;
