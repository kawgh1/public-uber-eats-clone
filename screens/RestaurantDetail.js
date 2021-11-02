import React from "react";
import { View, Text } from "react-native";
import { Divider } from "react-native-elements";
import { useSelector } from "react-redux";
import About from "../components/restaurantDetail/About";
import BottomTabs from "../components/restaurantDetail/BottomTabs";
import MenuItems from "../components/restaurantDetail/MenuItems";
import ViewCart from "../components/restaurantDetail/ViewCart";

export default function RestaurantDetail({ route, navigation }) {
    // foods available
    const foods = [
        {
            title: "Tandoori Chicken",
            description:
                "Amazing Indian dish with tenderloin chicken off the grill 🔥",
            price: "$19.50",
            image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
        },
        {
            title: "Surf & Turf",
            description:
                "Maine lobster 🦞 & Texas beef 🥩 with a side of potatoes",
            price: "$37.50",
            image: "https://media.istockphoto.com/photos/steak-and-lobster-picture-id1046290968?k=6&m=1046290968&s=612x612&w=0&h=MNUv92xyfsql-Bu9-NuPFT2aCx69YEEpu7Gtf2T8ENY=",
        },
        {
            title: "Lasagna",
            description: "With butter lettuce, tomato and sauce bechamel 🇮🇹",
            price: "$13.50",
            image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=735&q=80",
        },

        {
            title: "Chicken Caesar Salad",
            description: "The Classic. Chicken. Caesar. Salad. 🥗",
            price: "$11.50",
            image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
        },

        {
            title: "Dragon Roll",
            description:
                "Freshwater eel, cucumber, avocado, nori & crab meat 🍣",
            price: "$12.00",
            image: "https://i.ytimg.com/vi/L1THvfX5LTM/maxresdefault.jpg",
        },

        {
            title: "Stinky Tofu Hot Pot",
            description: "It's a whole body experience 😋",
            price: "$19.00",
            image: "https://i.pinimg.com/originals/ae/c5/c0/aec5c03e742523e6011b1edfcf60c5ec.jpg",
        },
        {
            title: "Chilaquiles",
            description:
                "Chilaquiles with cheese and sauce. A delicious Mexican dish 🇲🇽",
            price: "$14.50",
            image: "https://images.unsplash.com/photo-1599789197514-47270cd526b4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
        },

        {
            title: "Chicken & Waffles",
            description: "🍗 + 🧇 = crazy delicious",
            price: "$13.00",
            image: "https://images.unsplash.com/photo-1600891963935-9e9544daf776?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=871&q=80",
        },
        {
            title: "Chicken Fried Steak",
            description:
                "Made from scratch the old-fashioned way - comes with a side and a biscuit 🧈",
            price: "$11.50",
            image: "https://cdn3.tmbi.com/secure/RMS/attachments/37/1200x1200/exps120399_TH153342B02_11_7b_WEB.jpg",
        },
    ];

    // get access to all the items in redux store (cart) by using useSelector() hook
    // this is just to use for conditional display of the Bottom Bar
    const { items } = useSelector((state) => state.cartReducer.selectedItems);

    // here we take in route from the Home screen from RestaurantItem
    // the yelp API is sending Restaurant info when a user clicks a Restaurant image on the Home screen
    // then we are sending it to the About component to display the Restaurant info
    return (
        <View>
            <View>
                <About route={route} />
                <Divider
                    width={1.8}
                    color="#C1C1C1"
                    style={{
                        marginTop: 20,
                        marginHorizontal: 0,
                        boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 1px",
                    }}
                />
                <MenuItems restaurantName={route.params.name} foods={foods} />
                <ViewCart navigation={navigation} />
            </View>
        </View>
    );
}
