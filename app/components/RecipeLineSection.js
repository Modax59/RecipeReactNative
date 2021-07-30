import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function RecipeLineSection() {
  return (
    <View style={styles.container}>
      <Text style={[styles.name, { color: colors.primary }]}>{name}</Text>
      <Text style={styles.element}>{datas?.length} éléments</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
