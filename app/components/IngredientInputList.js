import React, { useRef } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import appTheme from "../constants/theme";
import ImageInput from "./ImageInput";

function IngredientInputList({
  ingredients = [],
  onRemoveIngredient,
  onAddIngredient,
}) {
  const scrollView = useRef();

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {ingredients.map((uri) => (
            <View key={uri} style={styles.image}>
              <TextInput />
            </View>
          ))}
          <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: appTheme.SIZES.padding,
  },
  image: {
    marginRight: 10,
  },
});

export default IngredientInputList;
