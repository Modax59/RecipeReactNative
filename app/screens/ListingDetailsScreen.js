import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
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
import { BlurView } from "expo-blur";
import appTheme from "../constants/theme";
import useApi from "../hooks/useApi";
import recipesApi from "../api/recipes";
import IngredientItem from "../components/IngredientItem";
import Icon from "../components/Icon";
import HeaderSectionList from "../components/HeaderSectionList";
import RecipeInfo from "../components/RecipeInfo";

const HEADER_HEIGHT = 350;

function ListingDetailsScreen({ route, navigation }) {
  let recipeItem = route.params;
  const scrollY = useRef(new Animated.Value(0)).current;
  const { data, loading, error, request } = useApi(recipesApi.getRecipe);
  useEffect(() => {
    request(recipeItem.id);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: appTheme.COLORS.white }}>
      <Animated.FlatList
        data={data?.recipeIngredients}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View
              style={{
                marginTop: -1000,
                paddingTop: 1000,
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Animated.Image
                source={{ uri: "http://127.0.0.1:8000" + recipeItem.fileUrl }}
                resizeMode="contain"
                style={{
                  height: HEADER_HEIGHT,
                  width: "200%",
                  transform: [
                    {
                      translateY: scrollY.interpolate({
                        inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        outputRange: [
                          -HEADER_HEIGHT / 2,
                          0,
                          HEADER_HEIGHT * 0.75,
                        ],
                      }),
                    },
                    {
                      scale: scrollY.interpolate({
                        inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        outputRange: [2, 1, 0.75],
                      }),
                    },
                  ],
                }}
              />
              <Animated.View
                style={{
                  position: "absolute",
                  bottom: 10,
                  left: 30,
                  right: 30,
                  height: 80,
                  transform: [
                    {
                      translateY: scrollY.interpolate({
                        inputRange: [0, 170, 250],
                        outputRange: [0, 0, 100],
                        extrapolate: "clamp",
                      }),
                    },
                  ],
                }}
              >
                <BlurView
                  intensity={90}
                  tint="dark"
                  style={{
                    overflow: "hidden",
                    flex: 1,
                    borderRadius: appTheme.SIZES.radius,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ flex: 1, marginHorizontal: 20 }}>
                      <Text
                        style={{
                          color: appTheme.COLORS.lightGray2,
                          ...appTheme.FONTS.body4,
                        }}
                      >
                        Recipe By
                      </Text>
                      <Text
                        style={{
                          color: appTheme.COLORS.white2,
                          ...appTheme.FONTS.h3,
                        }}
                      >
                        {!data?.user?.userInformations
                          ? "User Anonyme"
                          : data.user.userInformations.firstName}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        width: 30,
                        height: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 20,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: appTheme.COLORS.lightGreen1,
                      }}
                      onPress={() => console.log("View Profile")}
                    >
                      <Icon
                        name="arrow-right"
                        size={30}
                        iconColor={appTheme.COLORS.lightGreen1}
                        backgroundColor={appTheme.COLORS.transparent}
                      />
                    </TouchableOpacity>
                  </View>
                </BlurView>
              </Animated.View>
            </View>
            <RecipeInfo recipe={recipeItem} />
            <HeaderSectionList
              name="Ingredients"
              datas={data?.recipeIngredients}
            />
          </View>
        }
        ListFooterComponentStyle={{
          marginBottom: 100,
        }}
        ListFooterComponent={
          <HeaderSectionList name="Etapes" datas={data?.recipeSteps} />
        }
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 30,
              marginVertical: 5,
            }}
          >
            <IngredientItem
              item={item}
              image={"http://127.0.0.1:8000" + item.ingredient.fileUrl}
            />
          </View>
        )}
      />
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 90,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          paddingHorizontal: appTheme.SIZES.padding,
          paddingBottom: 10,
        }}
      >
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: appTheme.COLORS.black,
            opacity: scrollY.interpolate({
              inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 70],
              outputRange: [0, 1],
            }),
          }}
        />
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: 10,
            opacity: scrollY.interpolate({
              inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
              outputRange: [0, 1],
            }),
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
                  outputRange: [50, 0],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          <Text style={{ color: appTheme.COLORS.white2, ...appTheme.FONTS.h3 }}>
            {recipeItem?.name}
          </Text>
        </Animated.View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 35,
            width: 35,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: appTheme.COLORS.lightGray,
            backgroundColor: appTheme.COLORS.transparentBlack5,
          }}
          onPress={() => navigation.goBack()}
        >
          <Icon
            name="arrow-left"
            size={30}
            iconColor={appTheme.COLORS.lightGray}
            backgroundColor={appTheme.COLORS.transparent}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

export default ListingDetailsScreen;
