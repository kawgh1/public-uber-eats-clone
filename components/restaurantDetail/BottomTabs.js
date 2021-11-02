import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    Button,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function BottomTabs({ navigation }) {
    const Icon = (props) => (
        <TouchableOpacity>
            <View>
                <FontAwesome5
                    name={props.icon}
                    size={25}
                    style={{
                        marginBottom: 3,
                        alignSelf: "center",
                    }}
                />
                <Text>{props.text}</Text>
            </View>
        </TouchableOpacity>
    );

    const HomeIconButton = (props) => (
        <TouchableHighlight onPress={() => navigation.navigate("Home")}>
            <View>
                <FontAwesome5
                    name={props.icon}
                    size={25}
                    style={{
                        marginBottom: 3,
                        alignSelf: "center",
                        color: "#98FF98",
                    }}
                />
                <Text>{props.text}</Text>
            </View>
        </TouchableHighlight>
    );

    // for later use
    // would need to add authentication to pull up user's order history
    // and display on a new Orders.js screen that doesnt exist currently
    const OrdersIconButton = (props) => (
        <TouchableHighlight onPress={() => navigation.navigate("Home")}>
            <View>
                <FontAwesome5
                    name={props.icon}
                    size={25}
                    style={{
                        marginBottom: 3,
                        alignSelf: "center",
                        color: "#98FF98",
                    }}
                />
                <Text>{props.text}</Text>
            </View>
        </TouchableHighlight>
    );

    return (
        <View
            style={{
                flexDirection: "row",
                margin: 10,
                marginHorizontal: 30,
                justifyContent: "space-between",
            }}
        >
            <HomeIconButton icon="home" text="Home" />

            <Icon icon="search" text="Browse" />
            <Icon icon="shopping-bag" text="Grocery" />
            <Icon icon="receipt" text="Orders" />
            <Icon icon="user" text="Account" />
        </View>
    );
}
