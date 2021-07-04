import React, {useEffect, useState} from 'react';
import Screen from "../components/Screen";
import {FlatList, Text, View} from "react-native";
import useApi from "../hooks/useApi";
import recipesApi from "../api/recipes";
import ActivityIndicator from "../components/ActivityIndicator";
import AppButton from "../components/AppButton";
import HorizontalCard from "../components/HorizontalCard";
import routes from "../navigation/routes";

function HomeScreen({navigation}) {
    const getRecipesApi = useApi(recipesApi.getRecipes);
    const [refreshing, setRefreshing] = useState(false);
    useEffect(() => {
        getRecipesApi.request();
    }, []);

    return (
        <>
            <ActivityIndicator visible={getRecipesApi.loading}/>
            <Screen>
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
                    }}
                    showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={<View></View>}
                    renderItem={({item}) => {
                        return (
                            <HorizontalCard item={item}
                                            image={"http://127.0.0.1:8000" + item.fileUrl}
                                            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item) }/>
                        )
                    }}
                    ListFooterComponent={
                        <View style={{marginBottom: 100}}>

                        </View>
                    }
                />
            </Screen>
        </>
    );
}

export default HomeScreen;