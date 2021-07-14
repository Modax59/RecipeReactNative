import { Formik } from "formik";
import React, { useEffect } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";
import categoryApi from "../api/categoryApi";
import ingredientsApi from "../api/ingredientsApi";
import unitApi from "../api/unitApi";
import AppPicker from "../components/AppPicker";
import AppTextInput from "../components/AppTextInput";
import DeleteButton from "../components/buttons/DeleteButton";
import CategoryPickerItem from "../components/CategoryPickerItem";
import IngredientPickerItem from "../components/IngredientPickerItem";
import UnitPickerItem from "../components/UnitPickerItem";
import appTheme from "../constants/theme";
import useApi from "../hooks/useApi";

const createIngredient = () => ({
  name: "",
  quantity: "",
  unit: "",
});

const createStep = () => ({
  text: "",
  step: "",
});

const validationSchema = Yup.object().shape({
  ARRAY: Yup.array().of(
    Yup.object().shape({
      key1: Yup.string().trim().max(2000).required().label("Link"),
      key2: Yup.string().required().min(5).max(255).label("Name"),
    })
  ),
});

const RecipeEditScreen = () => {
  const getIngredientApi = useApi(ingredientsApi.getIngredients);
  const getUnitApi = useApi(unitApi.getUnits);

  useEffect(() => {
    getIngredientApi.request();
    getUnitApi.request();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Formik
        initialValues={{ ingredients: [], steps: [] }}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
        }) => (
          <>
            <View>
              {values.ingredients.map((ingredient, index) => (
                <View style={styles.container} key={index}>
                  <AppPicker
                    numberOfColumns="3"
                    width="40%"
                    PickerItemComponent={IngredientPickerItem}
                    items={getIngredientApi.data}
                    onSelectItem={({ name }) => {
                      setFieldValue(`ingredients[${index}].name`, name);
                      console.log(values.ingredients[index].name);
                    }}
                    placeholder="Ingredients"
                    selectedItem={values.ingredients[index].name}
                  />
                  <AppTextInput
                    keyboardType="numeric"
                    onChangeText={handleChange(
                      `ingredients[${index}].quantity`
                    )}
                    onBlur={handleBlur(`ingredients[${index}].quantity`)}
                    value={values.ingredients[index].quantity}
                    placeholder="100"
                    width="20%"
                  />
                  <AppPicker
                    numberOfColumns="3"
                    width="25%"
                    PickerItemComponent={UnitPickerItem}
                    items={getUnitApi.data}
                    onSelectItem={({ name }) => {
                      setFieldValue(`ingredients[${index}].unit`, name);
                      console.log(values.ingredients[index].unit);
                    }}
                    placeholder="Unité"
                    selectedItem={values.ingredients[index].unit}
                  />
                  <DeleteButton
                    onPress={() => {
                      setFieldValue(
                        "ingredients",
                        values.ingredients.filter(
                          (ingredientObj) => ingredientObj !== ingredient
                        )
                      );
                    }}
                  />
                </View>
              ))}
              <Button
                onPress={() =>
                  setFieldValue("ingredients", [
                    ...values.ingredients,
                    createIngredient(),
                  ])
                }
                title="Ajouter un ingredient"
              />
            </View>
            <View style={styles.stepContainer}>
              {values.steps.map((step, index) => (
                <View style={styles.container} key={index}>
                  <AppTextInput
                    onChangeText={handleChange(`steps[${index}].text`)}
                    value={values.steps[index].text}
                    placeholder="Ajouter de l'eau..."
                    width="80%"
                    multiline
                  />
                  <DeleteButton
                    onPress={() => {
                      setFieldValue(
                        "steps",
                        values.steps.filter((stepObj) => stepObj !== step)
                      );
                    }}
                  />
                </View>
              ))}
              <Button
                onPress={() =>
                  setFieldValue("steps", [...values.steps, createStep()])
                }
                title="Ajouter une étape"
              />
              <Button onPress={handleSubmit} title="Envoyer" />
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  stepContainer: {
    marginBottom: 150,
  },
});

export default RecipeEditScreen;
