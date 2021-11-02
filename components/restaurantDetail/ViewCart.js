import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";
import { useSelector } from "react-redux";
import BottomTabs from "./BottomTabs";
import OrderItem from "./OrderItem";

// firebase
import firebase from "../../firebase";
import { db } from "../../firebase";

// lottie view for checkout - does not work on react-native-web
import LottieView from "lottie-react-native";
// check Platform for when to use LottieView - LV doesnt work on web, only Android and iOS
import { Platform } from "react-native";

export default function ViewCart({ navigation }) {
    // modal
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    // get access to all the items in redux store (cart) by using useSelector() hook
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

    console.log("Total USD: ", totalUSD);

    // firebase function
    const addOrderToFirebase = () => {
        setLoading(true);
        const db = firebase.firestore();
        db.collection("orders")
            .add({
                items: items,
                restaurantName: restaurantName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
                setTimeout(() => {
                    setLoading(false);
                    navigation.navigate("OrderCompleted");
                }, 1000);
            });
        // .then(() => {
        //     setTimeout(() => {
        //         setLoading(false);
        //         navigation.navigate("Home");
        //     }, 8000);
        // });
    };

    // checkout modal styles
    const styles = StyleSheet.create({
        modalContainer: {
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.7)",
        },

        modalCheckoutContainer: {
            backgroundColor: "white",
            padding: 16,
            height: 500,
            borderWidth: 1,
        },

        restaurantName: {
            textAlign: "center",
            fontWeight: "600",
            fontSize: 18,
            marginBottom: 10,
        },

        subtotalContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
        },

        subtotalText: {
            textAlign: "left",
            fontWeight: "600",
            fontSize: 15,
            marginBottom: 10,
        },
    });

    // checkout modal view
    const checkoutModalContent = () => {
        return (
            <>
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        style={{ height: 300, width: "100%" }}
                        onPress={() => {
                            setModalVisible(false);
                        }}
                    />
                    <View style={styles.modalCheckoutContainer}>
                        <Text style={styles.restaurantName}>
                            {restaurantName}
                        </Text>
                        {items.map((item, index) => (
                            <OrderItem key={index} item={item} />
                        ))}
                        <View style={styles.subtotalContainer}>
                            <Text style={styles.subtotalText}>Subtotal</Text>
                            <Text>{totalUSD}</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    marginTop: 20,
                                    backgroundColor: "black",
                                    alignItems: "center",
                                    padding: 13,
                                    borderRadius: 30,
                                    width: 300,
                                    position: "relative",
                                }}
                                onPress={() => {
                                    addOrderToFirebase();
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={{ color: "white", fontSize: 20 }}>
                                    Checkout
                                </Text>
                                <Text
                                    style={{
                                        position: "absolute",
                                        right: 40,
                                        color: "#98FF98",
                                        fontSize: 15,
                                        fontWeight: 600,
                                        top: 17,
                                    }}
                                >
                                    {total ? totalUSD : ""}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </>
        );
    };

    // conditional rendering to only show "View Cart" button if total != 0
    return (
        <>
            <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                {checkoutModalContent()}
            </Modal>
            {total ? (
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        position: "fixed",
                        bottom: 10,
                        zIndex: 999,
                        left: 0,
                        right: 0,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                marginTop: 20,
                                backgroundColor: "black",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                padding: 15,
                                alignItems: "center",
                                padding: 13,
                                borderRadius: 30,
                                width: 300,
                                position: "relative",
                            }}
                            onPress={() => setModalVisible(true)}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: 20,
                                    marginRight: 30,
                                }}
                            >
                                View Cart
                            </Text>
                            <Text
                                style={{
                                    color: "#98FF98",
                                    fontSize: 20,
                                    marginRight: 20,
                                }}
                            >
                                {totalUSD}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <>
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
                </>
            )}
            {loading ? (
                <View
                    style={{
                        backgroundColor: "black",
                        position: "absolute",
                        opacity: 0.6,
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    {Platform.OS != "web" ? (
                        <LottieView
                            style={{ height: 200 }}
                            source={require("../../assets/animations/scanner.json")}
                            autoPlay
                            speed={3}
                        />
                    ) : (
                        <></>
                    )}
                </View>
            ) : (
                <></>
            )}
        </>
    );
}
