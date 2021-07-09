import React, { useEffect, useState } from "react";
import Screen from "../components/Screen";
import { FlatList, StyleSheet, Text, View, TextInput } from "react-native";
import recipesApi from "../api/recipes";
import Card from "../components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes";
import Button from "../components/AppButton";
import AppButton from "../components/AppButton";
import ActivityIndicator from "../components/ActivityIndicator";
import useApi from "../hooks/useApi";
import HorizontalCard from "../components/HorizontalCard";
import appTheme from "../constants/theme";
import SearchBar from "../components/homeScreen/SearchBar";
import { useTheme } from "@react-navigation/native";

function ListingScreen({ navigation }) {
  const { colors } = useTheme();
  const [search, setSearch] = useState("");
  const { data, loading, error, request } = useApi(recipesApi.getRecipes);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    request();
  }, []);

  const handleSearch = search
    ? data.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(search.toLowerCase()) ||
          recipe.preparingTime.toString().includes(search.toLowerCase())
      )
    : data;

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={{ backgroundColor: colors.background }}>
        <View style={{ marginBottom: 10 }}>
          <SearchBar onChange={(text) => setSearch(text)} />
        </View>
        {error && (
          <>
            <Text>Les recettes n'ont pas pu etre chargés.</Text>
            <AppButton
              color={[appTheme.COLORS.darkGreen, appTheme.COLORS.lime]}
              title="Reessayer"
              onPress={request}
            />
          </>
        )}
        <FlatList
          data={handleSearch}
          keyExtractor={(recipe) => recipe.id.toString()}
          refreshing={refreshing}
          onRefresh={() => {
            request();
            setRefreshing(false);
          }}
          renderItem={({ item }) => (
            <HorizontalCard
              styleCard={{
                marginHorizontal: appTheme.SIZES.radius,
              }}
              item={item}
              image={"http://127.0.0.1:8000" + item.fileUrl}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            />
          )}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({});

export default ListingScreen;
