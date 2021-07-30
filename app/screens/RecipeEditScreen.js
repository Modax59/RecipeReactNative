import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Yup from "yup";
import categoryApi from "../api/categoryApi";
import recipeApi from "../api/recipes";
import ActivityIndicator from "../components/ActivityIndicator";
import CategoryPickerItem from "../components/CategoryPickerItem";
import HeaderSectionList from "../components/HeaderSectionList";
import IngredientItem from "../components/IngredientItem";
import {
  AppForm,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../components/forms";
import AppFormSingleImagePicker from "../components/forms/AppFormSingleImagePicker";
import appTheme from "../constants/theme";
import useApi from "../hooks/useApi";

import routes from "../navigation/routes";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Le nom de la recette est obligatoire")
    .min(1)
    .label("Titre"),
  preparingTime: Yup.number()
    .required("Le temps de préparation est obligatoire")
    .min(1)
    .max(10000)
    .label("Temps de préparation"),
  description: Yup.string().label("Description"),
  category: Yup.object().nullable().label("Categories"),
  image: Yup.mixed(),
});

const RecipeEditScreen = ({ route, navigation }) => {
  const { recipeItem } = route.params;
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const getCategoryApi = useApi(categoryApi.getCategory);
  const { data, loading, error, request } = useApi(recipeApi.getRecipe);

  useEffect(() => {
    getCategoryApi.request();
    request(recipeItem.id);
  }, []);

  const initialValuesEnd = {
    name: data.name,
    description: "" + data.Description,
    preparingTime: "" + data.preparingTime,
    category: "" + data ? data.category.name : "",
    image: null,
  };

  const handleSubmit = async (recipe) => {
    setProgress(0);
    setUploadVisible(true);
    const { name, description } = recipe;
    const { preparingTime } = recipe;
    const time = parseInt(preparingTime);
    let uriCategory = null;
    if (recipe.category != initialValuesEnd.category) {
      const { category } = recipe;
      uriCategory = "/api/categories/" + category.id;
    }
    const recipeData = {
      name,
      description,
      uriCategory,
      time,
      id: recipeItem.id,
    };
    const result = await recipeApi.editRecipe(recipeData);
    if (result.ok) {
      if (recipe.image) {
        const { image } = recipe;
        const resultImage = await recipeApi.addImageRecipe(
          image,
          result.data["id"],
          (progress) => setProgress(progress)
        );
        if (!resultImage.ok) {
          setUploadVisible(false);
          return alert("Un problème est survenue lors de l'envoie");
        }
      }
      setProgress(100);
      initialValuesEnd.image = null;
      request(recipeItem.id);
    }
    if (!result.ok) {
      console.log(result);
      return alert(result.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 20 }}>
        <UploadScreen
          onDone={() => setUploadVisible(false)}
          progress={progress}
          visible={uploadVisible}
        />
        <ActivityIndicator visible={loading} />
        <AppForm
          initialValues={initialValuesEnd}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <View style={styles.images}>
            {data.fileUrl && (
              <Image
                source={{ uri: "http://127.0.0.1:8000" + data.fileUrl }}
                style={styles.image}
              />
            )}
            <AppFormSingleImagePicker name="image" />
          </View>
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
          <SubmitButton title="Enregistrer" />
        </AppForm>
        <HeaderSectionList name="Ingredients" datas={data?.recipeIngredients} />
        <Button
          onPress={() =>
            navigation.navigate(
              routes.RECIPE_INGREDIENT,
              data.recipeIngredients
            )
          }
          title="Modifier les ingredients"
        />
        <HeaderSectionList name="Etapes" datas={data.recipeSteps} />
        <Button
          onPress={() =>
            navigation.navigate(routes.RECIPE_STEP, data.recipeSteps)
          }
          title="Modifier les etapes"
        />
        <View style={{ marginVertical: 100 }}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  stepContainer: {
    marginBottom: 150,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 15,
    marginRight: 20,
  },
  images: {
    flexDirection: "row",
  },
});

export default RecipeEditScreen;
