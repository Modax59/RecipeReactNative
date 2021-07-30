import { Formik } from "formik";
import React, { useRef, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import AppTextInput from "../../components/AppTextInput";
import DeleteButton from "../../components/buttons/DeleteButton";
import * as Yup from "yup";
import { Swipeable } from "react-native-gesture-handler";
import ListItemDeleteAction from "../../components/ListItemDeleteAction";
import { useTheme } from "@react-navigation/native";
import appTheme from "../../constants/theme";
import { SubmitButton } from "../../components/forms";
import AppButton from "../../components/AppButton";
import recipes from "../../api/recipes";

export default function StepScreen({ route, navigation }) {
  const [hasError, sethasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const recipe = route.params;
  const createStep = () => ({
    instruction: "",
    stepOrder: "",
  });

  const { colors } = useTheme();

  const validationSchema = Yup.object().shape({
    steps: Yup.array()
      .of(
        Yup.object().shape({
          instruction: Yup.string()
            .required("L'instruction est obligatoire")
            .label("Instruction"),
          stepOrder: Yup.string().label("StepOrder"),
        })
      )
      .required("Required"),
  });
  const scrollView = useRef();

  const handleSubmit = async (values) => {
    setLoading(true);
    values.steps.forEach((element, index) => {
      element.stepOrder = index;
    });

    const result = await recipes.addSteps(recipe.id, values.steps);
    if (result.ok) {
      setLoading(false);
      navigation.goBack();
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.containerFirst}>
        <Text style={styles.text}>Intitulé des étapes</Text>
      </View>
      <Formik
        initialValues={{ steps: [...recipe.recipeSteps] }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          setFieldValue,
        }) => (
          <View style={styles.stepContainer}>
            {values.steps.map((step, index) => (
              <View
                style={[
                  styles.container,
                  { backgroundColor: colors.background },
                ]}
                key={index}
              >
                <AppTextInput
                  onChangeText={handleChange(`steps[${index}].instruction`)}
                  value={values.steps[index].instruction}
                  placeholder="ex: Ajouter de l'eau..."
                  width="80%"
                  multiline
                />
                <DeleteButton
                  onPress={() =>
                    setFieldValue(
                      "steps",
                      values.steps.filter((stepObj) => stepObj !== step)
                    )
                  }
                />
              </View>
            ))}
            <View style={styles.add}>
              <Button
                color={appTheme.COLORS.black}
                onPress={() =>
                  setFieldValue("steps", [...values.steps, createStep()])
                }
                title="Ajouter une étape"
              />
            </View>
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
                title={loading ? "Enregistrement..." : "Enregistrer les etapes"}
                onPress={() => {
                  const { steps } = errors;
                  sethasError(false);
                  if (steps != undefined) {
                    steps.forEach((element) => {
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
  add: {
    marginHorizontal: appTheme.SIZES.padding,
    padding: 3,
    backgroundColor: appTheme.COLORS.lightGreen,
    borderRadius: appTheme.SIZES.radius,
    marginBottom: 10,
  },
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
  stepContainer: {
    marginBottom: 150,
  },
  button: {
    marginHorizontal: appTheme.SIZES.padding,
    marginBottom: 120,
  },
});
