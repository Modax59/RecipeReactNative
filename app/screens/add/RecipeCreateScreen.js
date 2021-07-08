import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { StyleSheet } from "react-native";
import Screen from "../../components/Screen";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  AppFormPicker,
} from "../../components/forms";
import CategoryPickerItem from "../../components/CategoryPickerItem";

import recipes from "../../api/recipes";
import useApi from "../../hooks/useApi";
import categoryApi from "../../api/categoryApi";
import AppFormSingleImagePicker from "../../components/forms/AppFormSingleImagePicker";
import UploadScreen from "../UploadScreen";
import appTheme from "../../constants/theme";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label("Titre"),
  preparingTime: Yup.number()
    .required()
    .min(1)
    .max(10000)
    .label("Temps de préparation"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Categories"),
  image: Yup.mixed().required("Selectionnez au moins une image"),
});

function RecipeCreateScreen() {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const getCategoryApi = useApi(categoryApi.getCategory);

  useEffect(() => {
    getCategoryApi.request();
  }, []);

  const handleSubmit = async (recipe, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const { name, description, category } = recipe;
    const uriCategory = "/api/categories/" + category.id;
    const { preparingTime } = recipe;
    const time = parseInt(preparingTime);
    const recipeData = { name, description, uriCategory, time };
    const result = await recipes.addRecipe(recipeData);
    if (result.ok) {
      const { image } = recipe;
      const resultImage = await recipes.addImageRecipe(
        image,
        result.data["id"],
        (progress) => setProgress(progress)
      );
      if (!resultImage.ok) {
        setUploadVisible(false);
        return alert("Un problème est survenue lors de l'envoie");
      }
    }
    if (!result.ok) {
      return alert(result.data.message);
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
          name: "",
          preparingTime: null,
          description: "",
          category: null,
          image: null,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormSingleImagePicker name="image" />
        <AppFormField
          maxLength={255}
          name="name"
          placeholder="Nom de la recette"
        />
        <AppFormField
          keyboardType="numeric"
          maxLength={8}
          name="preparingTime"
          placeholder="Temps de préparation (mins)"
        />
        <AppFormPicker
          numberOfColumns={3}
          items={getCategoryApi.data}
          name="category"
          placeholder="Categories"
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
    padding: 20,
  },
});

export default RecipeCreateScreen;
