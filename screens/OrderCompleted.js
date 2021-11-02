import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import firebase from "../firebase";
import MenuItems from "../components/restaurantDetail/MenuItems";
// check Platform for when to use LottieView - LV doesnt work on web, only Android and iOS
import { Platform } from "react-native";
import { Divider } from "react-native-elements";
import BottomTabs from "../components/restaurantDetail/BottomTabs";

export default function OrderCompleted({ navigation }) {
    const [lastOrder, setLastOrder] = useState({
        items: [
            {
                title: "Bologna",
                description: "With butter lettuce, tomato and sauce bechamel",
                price: "$13.50",
                image: "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg",
            },
        ],
    });

    const { items, restaurantName } = useSelector(
        (state) => state.cartReducer.selectedItems
    );

    // when we get items array back, price will look like "$13.50"
    // so here we are removing the "$" sign so we can do math on the values
    // '$13.50'
    // '13.50'
    // Number('13.50') => 13.5
    // reduce -> [13.5, 20.5, 19.5]
    // reduce -> 13.5 + 20.5 + 19.5 -> 43.5
    const total = items
        .map((item) => Number(item.price.replace("$", "")))
        .reduce((prev, curr) => prev + curr, 0);

    // turn total back into a string with "$"
    const totalUSD = total.toLocaleString("en", {
        style: "currency",
        currency: "USD",
    });

    useEffect(() => {
        const db = firebase.firestore();
        const unsubscribe = db
            .collection("orders")
            .orderBy("createdAt", "desc")
            .limit(1)
            .onSnapshot((snapshot) => {
                snapshot.docs.map((doc) => {
                    setLastOrder(doc.data());
                });
            });

        // cleanup - once useEffect is done, shut down connection to database
        return () => unsubscribe();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            {/* green checkmark */}
            <View
                style={{
                    margin: 15,
                    alignItems: "center",
                    height: "100%",
                }}
            >
                {/* Lottie View does not work on react native web*/}
                {Platform.OS != "web" ? (
                    <LottieView
                        style={{
                            height: 100,
                            alignSelf: "center",
                            marginBottom: 30,
                        }}
                        source={require("../assets/animations/check-mark.json")}
                        autoPlay
                        speed={0.5}
                        loop={false}
                    />
                ) : (
                    <></>
                )}
                <Text
                    style={{
                        fontSize: 20,
                        margin: 20,
                        paddingLeft: 10,
                        fontWeight: "bold",
                    }}
                >
                    Your order at {restaurantName} has been placed for{" "}
                    {totalUSD}
                </Text>
                <ScrollView>
                    <MenuItems
                        foods={lastOrder.items}
                        hideCheckbox={true}
                        marginLeft={10}
                    />
                    {Platform.OS != "web" ? (
                        <LottieView
                            style={{ height: 200, alignSelf: "center" }}
                            source={require("../assets/animations/cooking.json")}
                            autoPlay
                            speed={0.5}
                        />
                    ) : (
                        <></>
                    )}
                </ScrollView>
            </View>
            <Divider
                width={1.8}
                color="#C1C1C1"
                style={{
                    marginTop: -1,
                    marginHorizontal: 0,
                    boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 1px",
                }}
            />
            <BottomTabs navigation={navigation} />
        </SafeAreaView>
    );
}
