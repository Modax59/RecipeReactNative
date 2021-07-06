import React, { useEffect, useState } from "react";
import Screen from "../components/Screen";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import useApi from "../hooks/useApi";
import recipesApi from "../api/recipes";
import ActivityIndicator from "../components/ActivityIndicator";
import AppButton from "../components/AppButton";
import HorizontalCard from "../components/HorizontalCard";
import routes from "../navigation/routes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import HorizontalCardContentLoader from "../components/contentLoader/HorizontalCardContentLoader";

function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const getRecipesApi = useApi(recipesApi.getRecipes);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getRecipesApi.request();
  }, []);

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 20,
          alignItems: "center",
          height: 80,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              color: "#229879",
              fontWeight: "600",
              fontSize: 22,
              lineHeight: 30,
            }}
          >
            Hello Clément
          </Text>
          <Text
            style={{
              marginTop: 3,
              color: colors.primary,
              fontSize: 16,
              lineHeight: 22,
            }}
          >
            What you want to cook today?
          </Text>
        </View>
      </View>
    );
  }

  function renderSearchBar() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 50,
          alignItems: "center",
          marginHorizontal: 20,
          paddingHorizontal: 12,
          borderRadius: 10,
          backgroundColor: colors.secondBackground,
        }}
      >
        <MaterialCommunityIcons name="magnify" size={20} color="#777777" />
        <TextInput
          style={{
            marginLeft: 12,
            fontSize: 16,
            lineHeight: 22,
          }}
          placeholderTextColor="#777777"
          placeholder="Search Recipes"
        />
      </View>
    );
  }
  return (
    <>
      <ActivityIndicator visible={getRecipesApi.loading} />
      <Screen>
        {getRecipesApi.error && (
          <>
            <Text>Les recettes n'ont pas pu etre chargés.</Text>
            <AppButton title="Reessayer" onPress={getRecipesApi.request} />
          </>
        )}
        <FlatList
          data={getRecipesApi.data}
          keyExtractor={(recipe) => recipe.id.toString()}
          refreshing={refreshing}
          onRefresh={() => {
            getRecipesApi.request();
            setRefreshing(false);
          }}
          ListEmptyComponent={() => <HorizontalCardContentLoader />}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={
            <View>
              {renderHeader()}
              {renderSearchBar()}
            </View>
          }
          renderItem={({ item }) => {
            return (
              <HorizontalCard
                item={item}
                image={"http://127.0.0.1:8000" + item.fileUrl}
                onPress={() =>
                  navigation.navigate(routes.LISTING_DETAILS, item)
                }
              />
            );
          }}
          ListFooterComponent={<View style={{ marginBottom: 100 }}></View>}
        />
      </Screen>
    </>
  );
}

export default HomeScreen;
