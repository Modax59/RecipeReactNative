import React from 'react';
import Screen from "../components/Screen";
import {FlatList, StyleSheet} from "react-native";
import Card from "../components/Card";
import colors from "../config/colors";

const listings = [
    {
        id: 1,
        title: 'Red Jacket for sale',
        price: 100,
        image: require('../assets/recipe.jpg')
    },
    {
        id: 2,
        title: 'Blue Jacket for sale',
        price: 600,
        image: require('../assets/recipe1.jpg')
    }
];

function ListingScreen(props) {
    return (
        <Screen style={styles.screen}>
            <FlatList data={listings} keyExtractor={listings => listings.id.toString()}
                      renderItem={({item}) => <Card title={item.title} userName={item.price} image={item.image}/>}/>
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding : 20,
        backgroundColor: colors.light
    }
})

export default ListingScreen;