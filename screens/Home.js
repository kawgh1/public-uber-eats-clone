import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import HeaderTabs from "../components/home/HeaderTabs";
import SearchBar from "../components/home/SearchBar";
import Categories from "../components/home/Categories";
import RestaurantItems, {
    localRestaurants,
} from "../components/home/RestaurantItems";
import { Divider } from "react-native-elements";
import BottomTabs from "../components/home/BottomTabs";

export default function Home({ navigation }) {
    const [restaurantData, setRestaurantData] = useState(localRestaurants);
    const [city, setCity] = useState("Dallas");
    const [activeTab, setActiveTab] = useState("Delivery");

    // this is not secure, but apparently storing API keys in a .env file doesnt work in React Native
    // I am not particularly concerned since this is just a demo project

    const YELP_API_KEY =
        "****************************************************************************";
    // console.log(YELP_API_KEY);

    const getRestaurantsFromYelp = () => {
        // personal private CORS Proxy - Yelp API denies all cross-origin requests from the client side

        const yelpUrl = `https://---PRIVATE CORS SERVER URL---/https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;
        const apiOptions = {
            headers: {
                accept: "application/json",
                "x-requested-with": "xmlhttprequest",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${YELP_API_KEY}`,
            },
        };

        // because activeTab is pulled from text 'Pick Up' but Yelp API reads 'pickup'
        const cleanedActiveTab = activeTab.replace(/\s/g, "").toLowerCase();

        // give me all the restaurant data and filter it based on if activeTab == 'delivery' or 'pickup'
        return fetch(yelpUrl, apiOptions)
            .then((res) => res.json())
            .then((json) =>
                setRestaurantData(
                    json.businesses.filter((business) =>
                        business.transactions.includes(cleanedActiveTab)
                    )
                )
            );
    };

    useEffect(() => {
        getRestaurantsFromYelp();
    }, [city, activeTab]);

    return (
        // SafeAreaView keeps the view below the iOS time and battery /wifi icons
        <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
            <View style={{ backgroundColor: "white", padding: 15 }}>
                <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <SearchBar cityHandler={setCity} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Categories />
                <RestaurantItems
                    restaurantData={restaurantData}
                    navigation={navigation}
                />
            </ScrollView>
            <Divider width={1} />
            <BottomTabs />
        </SafeAreaView>
    );
}
