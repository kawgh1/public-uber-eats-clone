import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector } from "react-redux";

export default function MenuItems({
    restaurantName,
    foods,
    hideCheckbox,
    marginLeft,
}) {
    // redux
    const dispatch = useDispatch();
    // so when a user press an item checkbox, we want to run this dispatch and send
    // that item to redux store

    // initial dispatch method
    // const selectItem = (item) =>
    //     dispatch({
    //         type: "ADD_TO_CART",
    //         payload: item,
    //     });

    // reason we use checkbox value is to check if checkboxValue=true, then add to cart
    // if checkboxValue=false, then remove from cart
    // since users may add or remove the same item multiple times, we need to be able to store
    // the most recent status of checkboxValue in redux store

    const selectItem = (item, checkboxValue) =>
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                ...item,
                restaurantName: restaurantName,
                checkboxValue: checkboxValue,
            },
        });

    // There was a weird state bug where if a user checked a menuItem checkbox, swiped away from page
    // and swiped back, the checkbox became unchecked again, but total remained because item was still added
    // to redux store - if user checked item again, item was added twice, total was increased

    const cartItems = useSelector(
        (state) => state.cartReducer.selectedItems.items
    );

    const isFoodInCart = (food, cartItems) => {
        return Boolean(cartItems.find((item) => item.title === food.title));
    };

    // styles
    const styles = StyleSheet.create({
        menuItemStyle: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            margin: 20,
        },
        titleStyle: {
            fontSize: 19,
            fontWeight: "600",
            marginBottom: 2,
        },
        priceStyle: {
            fontSize: 14,
            fontWeight: "600",
            marginTop: 2,
        },
    });

    const FoodInfo = (props) => (
        <View>
            <View style={{ width: 200, justifyContent: "space-evenly" }}>
                <Text style={styles.titleStyle}>{props.food.title}</Text>
                <Text>{props.food.description}</Text>
                <Text style={styles.priceStyle}>{props.food.price}</Text>
            </View>
        </View>
    );

    const FoodImage = ({ marginLeft, ...props }) => (
        <View>
            <Image
                source={{ uri: props.food.image }}
                style={{
                    width: 80,
                    height: 80,
                    borderRadius: 8,
                    border: "1px solid #c2c2c2",
                    boxShadow: "rgba(0, 0, 0, 0.3) 1px 2px 4px",
                    marginLeft: marginLeft,
                }}
            />
        </View>
    );
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {foods.map((food, index) => (
                <View key={index}>
                    <View style={styles.menuItemStyle}>
                        {hideCheckbox ? (
                            <></>
                        ) : (
                            <BouncyCheckbox
                                iconStyle={{
                                    borderColor: "lightgray",
                                    borderRadius: 0,
                                }}
                                fillColor="green"
                                isChecked={isFoodInCart(food, cartItems)}
                                onPress={(checkboxValue) =>
                                    selectItem(food, checkboxValue)
                                }
                            />
                        )}
                        <FoodInfo food={food} />
                        <FoodImage
                            food={food}
                            marginLeft={marginLeft ? marginLeft : 0}
                        />
                    </View>
                    <Divider
                        width={0.5}
                        orientation="vertical"
                        style={{
                            marginHorizontal: 20,
                        }}
                    />
                </View>
            ))}
            {/* spacers, so View Cart button doesnt cover last menu item */}
            <View style={styles.menuItemStyle}></View>
            {/* <View style={styles.menuItemStyle}></View>  */}
        </ScrollView>
    );
}
