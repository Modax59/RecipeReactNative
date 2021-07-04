import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ListIngredients from "../components/ListIngredients";
import ListItem from "../components/ListItem";
import colors from "../config/colors";
import { Ionicons } from "@expo/vector-icons";
import {Image} from "react-native-expo-image-cache";

const ingredientsData = [
  {
    id: 1,
    name: "Eggs",
    unit: "2 Pcs",
    image: require("../assets/potato.png"),
  },
  {
    id: 2,
    name: "Potato",
    unit: "1/2 Kg",
    image: require("../assets/potato.png"),
  },
  {
    id: 3,
    name: "Parmesan Cheese",
    unit: "300 g",
    image: require("../assets/potato.png"),
  },
  {
    id: 4,
    name: "Fresh Shrimp",
    unit: "1/2 kg",
    image: require("../assets/potato.png"),
  },
  {
    id: 5,
    name: "Tomato Ketchup",
    unit: "6 Tbsp",
    image: require("../assets/potato.png"),
  },
];

function ListingDetailsScreen({ route }) {
  const listing = route.params;
  return (
    <View>
      <View style={styles.backIcon}>
        <TouchableOpacity onPress={() => console.log("back")}>
          <Ionicons
            name="chevron-back-circle-outline"
            size={32}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <Image style={styles.image} tint="light" preview={{uri: "http://127.0.0.1:8000"+listing.fileUrl}} uri={"http://127.0.0.1:8000" + listing.fileUrl} />
      <View style={styles.detailsContainer}>
        <View style={styles.name}>
          <Text style={styles.title}>{listing.title}</Text>
          <ListItem
            image={require("../assets/men.jpg")}
            title="John Doe"
            subtitle="18 recettes"
          />
        </View>
        <Text style={styles.preparingTime}>30 mins | 2 personnes</Text>
        <View style={styles.ingredients}>
          <Text style={styles.titleIngredients}>Ingredients</Text>
          <Text style={styles.items}>5 item</Text>
        </View>
        <FlatList
          data={ingredientsData}
          keyExtractor={(ingredientsData) => ingredientsData.id.toString()}
          renderItem={({ item }) => (
            <ListIngredients
              name={item.name}
              unit={item.unit}
              image={item.image}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backIcon: {
    zIndex: 5,
    position: "absolute",
    top: 40,
    left: 25,
  },
  image: {
    width: "100%",
    height: 280,
  },
  name: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsContainer: {
    padding: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    flexBasis: 200,
    color: colors.black_blue,
  },
  preparingTime: {
    color: colors.grey,
    fontWeight: "300",
    fontSize: 14,
    marginVertical: 10,
  },
  userContainer: {
    marginVertical: 50,
  },
  titleIngredients: {
    flexBasis: 280,
    fontSize: 18,
    fontWeight: "600",
    color: colors.black_blue,
  },
  ingredients: {
    paddingTop: 20,
    flexDirection: "row",
    paddingBottom: 25,
  },
  items: {
    fontSize: 14,
    color: colors.grey,
  },
});

export default ListingDetailsScreen;
