import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {Image} from "react-native-expo-image-cache";

function HorizontalCard({item, styleCard, onPress, image}) {
    return (
        <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            marginTop: 10,
            borderRadius: 12,
            backgroundColor: '#F8F8F8',
            ...styleCard
        }}
                          onPress={onPress}
        >
            <Image style={{
                resizeMode: "cover",
                width: 100,
                height: 100,
                borderRadius: 12,
            }}
                   tint="light" preview={{image}} uri={image}/>
            <View style={{
                width: '65%',
                paddingHorizontal: 20,
            }}>
                <Text style={{
                    flex:1,
                    fontSize: 22,
                    fontWeight: 'bold',
                    lineHeight: 30
                }}>{item.name}</Text>
                <Text style={{
                    color: "#777777",
                    fontSize: 14,
                    lineHeight: 22,
                }}>
                    {item.preparingTime} mins｜4 personnes
                </Text>
            </View>
        </TouchableOpacity>
    );
}

export default HorizontalCard;