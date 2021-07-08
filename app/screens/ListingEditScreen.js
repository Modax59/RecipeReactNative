import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { StyleSheet } from "react-native";
import Screen from "../components/Screen";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  AppFormPicker,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import useLocation from "../hooks/useLocation";
import AppFormSingleImagePicker from "../components/forms/AppFormSingleImagePicker";
import recipes from "../api/recipes";
import UploadScreen from "./UploadScreen";
import appTheme from "../constants/theme";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
});

function ListingEditScreen() {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async ({ images }, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await recipes.addImageRecipe(images, 1, (progress) =>
      setProgress(progress)
    );
    if (!result.ok) {
      setUploadVisible(false);
      return alert("Un problème est survenue lors de l'envoie");
    }
    resetForm();
  };
  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <AppForm
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: null,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormSingleImagePicker name="images" />
        <AppFormField maxLength={255} name="title" placeholder="Title" />
        <AppFormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={120}
        />
        <AppFormPicker
          numberOfColumns={3}
          items={categories}
          name="category"
          placeholder="Category"
          width="50%"
          PickerItemComponent={CategoryPickerItem}
        />
        <AppFormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: appTheme.SIZES.padding,
  },
});

export default ListingEditScreen;
