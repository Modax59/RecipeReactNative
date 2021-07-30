import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import ingredientsApi from "../../api/ingredientsApi";
import AppPicker from "../../components/AppPicker";
import AppTextInput from "../../components/AppTextInput";
import DeleteButton from "../../components/buttons/DeleteButton";
import IngredientPickerItem from "../../components/IngredientPickerItem";
import useApi from "../../hooks/useApi";
import * as Yup from "yup";
import UnitPickerItem from "../../components/UnitPickerItem";
import unitApi from "../../api/unitApi";
import { ErrorMessage, SubmitButton } from "../../components/forms";
import appTheme from "../../constants/theme";
import { Swipeable } from "react-native-gesture-handler";
import ListItemDeleteAction from "../../components/ListItemDeleteAction";
import { useTheme } from "@react-navigation/native";
import AppButton from "../../components/AppButton";
import recipes from "../../api/recipes";

export default function IngredientScreen({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  const [hasError, sethasError] = useState(false);
  const recipesIngredients = route.params;
  const getIngredientApi = useApi(ingredientsApi.getIngredients);
  const getUnitApi = useApi(unitApi.getUnits);

  useEffect(() => {
    getIngredientApi.request();
    getUnitApi.request();
  }, []);

  const createIngredient = () => ({
    ingredient: {
      name: "",
    },
    quantity: "",
    unit: {
      name: "",
    },
  });

  const validationSchema = Yup.object().shape({
    ingredients: Yup.array()
      .of(
        Yup.object().shape({
          ingredient: Yup.object().shape({
            name: Yup.string()
              .required("Le nom est obligatoire")
              .min(1)
              .label("nom"),
          }),
          quantity: Yup.number()
            .required("La quantité est obligatoire")
            .min(1)
            .max(10000)
            .label("Quantité"),

          unit: Yup.object().shape({
            name: Yup.string()
              .required("Le nom d'unité est obligatoire")
              .min(1)
              .label("nom"),
          }),
        })
      )
      .required("Required"),
  });
  const scrollView = useRef();
  const swipeableRef = useRef(null);

  const { colors } = useTheme();

  const handleSubmit = async (values) => {
    setLoading(true);
    const result = await recipes.addIngredient(140, values.ingredients);
    if (result.ok) {
      setLoading(false);
      navigation.goBack();
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      ref={scrollView}
      onContentSizeChange={() => scrollView.current.scrollToEnd()}
    >
      <View style={styles.containerFirst}>
        <Text style={styles.text}>Ingredient</Text>
        <Text style={styles.text}>Quantité</Text>
        <Text style={styles.text}>Unité</Text>
      </View>
      <Formik
        initialValues={{ ingredients: [...recipesIngredients] }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View>
            {values.ingredients.map((ingredient, index) => (
              <View
                style={[
                  styles.container,
                  { backgroundColor: colors.background },
                ]}
                key={index}
              >
                <AppPicker
                  numberOfColumns="3"
                  textSize={13}
                  width="30%"
                  name="name"
                  PickerItemComponent={IngredientPickerItem}
                  items={getIngredientApi.data}
                  onSelectItem={({ name }) => {
                    setFieldValue(
                      `ingredients[${index}].ingredient.name`,
                      name
                    );
                  }}
                  placeholder="Ingredients"
                  selectedItem={values.ingredients[index].ingredient.name}
                />

                <AppTextInput
                  keyboardType="numeric"
                  onChangeText={handleChange(`ingredients[${index}].quantity`)}
                  onBlur={handleBlur(`ingredients[${index}].quantity`)}
                  value={"" + values.ingredients[index].quantity}
                  placeholder="100"
                  width="20%"
                  name="quantity"
                />
                <AppPicker
                  name="name"
                  numberOfColumns="3"
                  width="25%"
                  PickerItemComponent={UnitPickerItem}
                  items={getUnitApi.data}
                  onSelectItem={({ name }) => {
                    setFieldValue(`ingredients[${index}].unit.name`, name);
                  }}
                  placeholder="Unité"
                  selectedItem={values.ingredients[index].unit.name}
                />
                <DeleteButton
                  onPress={() =>
                    setFieldValue(
                      "ingredients",
                      values.ingredients.filter(
                        (ingredientObj) => ingredientObj !== ingredient
                      )
                    )
                  }
                />
              </View>
            ))}
            <Button
              onPress={() => {
                setFieldValue("ingredients", [
                  ...values.ingredients,
                  createIngredient(),
                ]);
              }}
              title="Ajouter un ingredient"
            />
            <View style={styles.button}>
              {hasError && (
                <Text style={styles.error}>
                  Le formulaire a rencontré une érreur
                </Text>
              )}
              <AppButton
                buttonContainerStyle={{
                  paddingVertical: 18,
                  borderRadius: appTheme.SIZES.radius,
                }}
                color={[appTheme.COLORS.darkGreen, appTheme.COLORS.lime]}
                title={
                  loading ? "Enregistrement..." : "Enregistrer les ingredients"
                }
                onPress={() => {
                  const { ingredients } = errors;
                  sethasError(false);
                  if (ingredients != undefined) {
                    ingredients.forEach((element) => {
                      if (element != undefined) {
                        sethasError(true);
                      }
                    });
                  }
                  handleSubmit();
                }}
              />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  error: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  },
  containerFirst: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginRight: 50,
    marginTop: 20,
  },
  text: {
    ...appTheme.FONTS.h3,
    fontSize: 18,
  },
  button: {
    marginHorizontal: appTheme.SIZES.padding,
    marginBottom: 120,
  },
});
