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
import RecipeSearch from "../components/search/RecipeSearch";

function ListingScreen({ navigation }) {
  const { colors } = useTheme();
  const [search, setSearch] = useState("");
  const { data, loading, error, request } = useApi(
    recipesApi.getRecipeBySearch
  );
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    request(search);
  }, [search]);

  //const handleSearch = RecipeSearch(search, data);

  return (
    <>
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
              onPress={() => request(search)}
            />
          </>
        )}
        <FlatList
          data={data}
          keyExtractor={(recipe) => recipe.id.toString()}
          refreshing={refreshing}
          ListFooterComponent={<View style={{ marginVertical: 38 }}></View>}
          onRefresh={() => {
            request(search);
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
