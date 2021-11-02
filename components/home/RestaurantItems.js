import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Liked from "./Liked";

// imported by parent Home.js
export const localRestaurants = [
    {
        name: "Beachside Bar",
        image_url:
            "https://images.unsplash.com/photo-1543007631-283050bb3e8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1974&q=80",
        categories: ["Cafe", "Bar"],
        price: "$$",
        reviews: 1244,
        rating: 4.5,
    },
    {
        name: "Benihana",
        image_url:
            "https://image.freepik.com/free-photo/top-view-variety-sushi-nigiri-sashimi-yakisoba-edamame-restaurant-wooden-table_181624-35322.jpg",
        categories: ["Cafe", "Bar"],
        price: "$$",
        reviews: 1244,
        rating: 3.7,
    },
    {
        name: "India's Grill",
        image_url:
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
        categories: ["Indian", "Bar"],
        price: "$$",
        reviews: 700,
        rating: 4.9,
    },
];

export default function RestaurantItems({ navigation, ...props }) {
    // console.log(Math.floor(Math.random() * 5));

    function generateTime() {
        // * Get a random integer between `min` and `max`.
        // return Math.floor(Math.random() * (max - min + 1) + min);
        const x = Math.floor(Math.random() * (2 - 0 + 1) + 1) * 10;
        const y = x + 15;

        return x.toString() + "-" + y.toString();
    }
    const RestaurantImage = (props) => (
        <>
            <Image
                source={{
                    uri: props.image,
                }}
                style={{ width: "100%", height: 180 }}
            />
        </>
    );

    const RestaurantInfo = (props) => (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
            }}
        >
            <View>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {props.name}
                </Text>
                <Text style={{ fontSize: 13, color: "gray" }}>
                    {generateTime()} • min
                </Text>
            </View>
            <View
                style={{
                    backgroundColor: "#eee",
                    height: 30,
                    width: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 15,
                }}
            >
                <Text>{props.rating}</Text>
            </View>
        </View>
    );

    return (
        <>
            {props.restaurantData.map((restaurant, index) => (
                <TouchableOpacity
                    key={index}
                    activeOpacity={1}
                    onPress={() =>
                        navigation.navigate("RestaurantDetail", {
                            name: restaurant.name,
                            image: restaurant.image_url,
                            price: restaurant.price,
                            reviews: restaurant.review_count,
                            rating: restaurant.rating,
                            categories: restaurant.categories,
                        })
                    }
                >
                    <View
                        style={{
                            marginTop: 10,
                            padding: 15,
                            backgroundColor: "white",
                        }}
                    >
                        <RestaurantImage image={restaurant.image_url} />

                        <Liked />
                        <RestaurantInfo
                            name={restaurant.name}
                            rating={restaurant.rating}
                        />
                    </View>
                </TouchableOpacity>
            ))}
        </>
    );
}
