import React from "react";
import { View, Text, Image, ScrollView } from "react-native";

export default function Categories() {
    const items = [
        {
            image: require("../../assets/images/shopping-bag.png"),
            text: "Pick Up",
        },
        {
            image: require("../../assets/images/bread.png"),
            text: "Bakery",
        },
        {
            image: require("../../assets/images/fast-food.png"),
            text: "Fast Food",
        },
        {
            image: require("../../assets/images/deals.png"),
            text: "Deals",
        },
        {
            image: require("../../assets/images/coffee.png"),
            text: "Coffee & Tea",
        },
        {
            image: require("../../assets/images/soft-drink.png"),
            text: "Soft Drinks",
        },
        {
            image: require("../../assets/images/desserts.png"),
            text: "Desserts",
        },
    ];
    return (
        <View
            style={{
                marginTop: 5,
                backgroundColor: "white",
                paddingVertical: 10,
                paddingLeft: 20,
            }}
        >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {/* loop starts here */}
                {items.map((item, index) => (
                    <View
                        style={{
                            alignItems: "center",
                            marginRight: 30,
                        }}
                        key={index}
                    >
                        <Image
                            source={item.image}
                            style={{
                                width: 50,
                                height: 40,
                                resizeMode: "contain",
                            }}
                        />
                        <Text style={{ fontSize: 13, fontWeight: "700" }}>
                            {item.text}
                        </Text>
                    </View>
                ))}

                {/* loop ends here */}
            </ScrollView>
        </View>
    );
}
