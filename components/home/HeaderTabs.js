import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function HeaderTabs(props) {
    const HeaderButton = (props) => (
        <TouchableOpacity
            style={{
                backgroundColor:
                    props.activeTab === props.text ? "black" : "white",
                paddingVertical: 6,
                paddingHorizontal: 16,
                borderRadius: 30,
            }}
            onPress={() => props.setActiveTab(props.text)}
        >
            <Text
                style={{
                    color: props.activeTab === props.text ? "white" : "black",
                    fontSize: 15,
                    fontWeight: "900",
                }}
            >
                {props.text}
            </Text>
        </TouchableOpacity>
    );
    return (
        <View style={{ alignSelf: "center", flexDirection: "row" }}>
            <HeaderButton
                text="Delivery"
                btnColor="black"
                textColor="white"
                activeTab={props.activeTab}
                setActiveTab={props.setActiveTab}
            />

            <HeaderButton
                text="Pick Up"
                btnColor="white"
                textColor="black"
                activeTab={props.activeTab}
                setActiveTab={props.setActiveTab}
            />
        </View>
    );
}
