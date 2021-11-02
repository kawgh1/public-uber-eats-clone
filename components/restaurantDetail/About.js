import React from "react";
import { View, Text, Image } from "react-native";

export default function About(props) {
    // static data
    const yelpRestaurantInfo = {
        name: "Farmhouse Kitchen Thai Cuisine",
        image: "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=764&q=80",
        price: "$$",
        reviews: "1500",
        rating: "4.5",
        categories: [{ title: "Thai" }, { title: "Comfort Food" }],
    };

    // static data
    // const { name, image, price, reviews, rating, categories } =
    //     yelpRestaurantInfo;

    // dynamic data from yelp
    const { name, image, price, reviews, rating, categories } =
        props.route.params;

    const formattedCategories = categories.map((cat) => cat.title).join(" • ");

    const description = `${formattedCategories} ${
        price ? " • " + price : ""
    } • 💳 • ${rating} ⭐ • (${reviews}+)`;

    // Initial Hard Code

    // const image =
    //     "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=764&q=80";

    // const title = "Farmhouse Kitchen Thai Cuisine";
    // const description = "Thai • Comfort Food • $$ • 🎫 • 4 ⭐ (2913)";

    const RestaurantImage = (props) => (
        <Image
            source={{ uri: props.image }}
            style={{
                width: "100%",
                height: 180,
                borderBottom: "1px solid #c2c2c2",
                boxShadow: "rgba(0, 0, 0, 0.45) 0px 2px 18px 1px",
            }}
        />
    );

    const RestaurantName = (props) => (
        <Text
            style={{
                fontSize: 29,
                fontWeight: "600",
                marginTop: 10,
                letterSpacing: 0.5,
                marginHorizontal: 15,
            }}
        >
            {props.name}
        </Text>
    );

    const RestaurantDescription = (props) => (
        <Text
            style={{
                fontSize: 15,
                fontWeight: "500",
                letterSpacing: 0.5,
                marginTop: 10,
                marginHorizontal: 15,
            }}
        >
            {props.description}
        </Text>
    );

    return (
        <View>
            <RestaurantImage image={image} />
            <RestaurantName name={name} />
            <RestaurantDescription description={description} />
        </View>
    );
}
