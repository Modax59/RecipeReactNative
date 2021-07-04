import React, {useEffect, useState} from "react";
import Screen from "../components/Screen";
import {FlatList, StyleSheet, Text} from "react-native";
import recipesApi from "../api/recipes";
import Card from "../components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes";
import Button from "../components/AppButton";
import AppButton from "../components/AppButton";
import ActivityIndicator from "../components/ActivityIndicator"
import useApi from "../hooks/useApi";

function ListingScreen({navigation}) {
    const getRecipesApi = useApi(recipesApi.getRecipes);
    const [refreshing, setRefreshing] = useState(false);
    useEffect(() => {
        getRecipesApi.request();
    }, []);

    return (
        <>
            <ActivityIndicator visible={getRecipesApi.loading}/>
            <Screen style={styles.screen}>
                {getRecipesApi.error && (
                    <>
                        <Text>Les recettes n'ont pas pu etre chargés.</Text>
                        <AppButton title="Reessayer" onPress={getRecipesApi.request}/>
                    </>
                )}
                <FlatList
                    data={getRecipesApi.data}
                    keyExtractor={(recipe) => recipe.id.toString()}
                    refreshing={refreshing}
                    onRefresh={() => {
                        getRecipesApi.request();
                        setRefreshing(false);
                    }
                    }
                    renderItem={({item}) => (
                        <Card
                            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
                            title={item.name}
                            userName={item.id}
                            image={"http://127.0.0.1:8000" + item.fileUrl}
                        />
                    )}
                />
            </Screen>
        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 20,
        backgroundColor: colors.purWhite,
    },
});

export default ListingScreen;
