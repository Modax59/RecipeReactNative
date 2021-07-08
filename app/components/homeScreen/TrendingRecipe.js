import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import appTheme from "../../constants/theme";
import TrendingCard from "../TrendingCard";
import { useTheme } from "@react-navigation/native";

export default function TrendingRecipe({ data, navigation }) {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: colors.primary }]}>
        Trending Recipe
      </Text>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(recipe) => recipe.id.toString()}
        renderItem={({ item }) => {
          return (
            <TrendingCard
              containerStyle={{
                marginLeft: appTheme.SIZES.padding,
              }}
              recipeItem={item}
              onPress={() => navigation.navigate("ListingDetails", item)}
              image={"http://127.0.0.1:8000" + item.fileUrl}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: appTheme.SIZES.padding,
  },
  text: {
    marginHorizontal: appTheme.SIZES.padding,
    marginBottom: appTheme.SIZES.radius,
    fontWeight: "bold",
    ...appTheme.FONTS.h3,
  },
});
