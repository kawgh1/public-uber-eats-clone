import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Liked() {
    const [isLiked, setIsLiked] = useState(false);
    return (
        <>
            <TouchableOpacity
                style={{ position: "absolute", right: 20, top: 20 }}
                onPress={() => setIsLiked(!isLiked)}
            >
                {isLiked ? (
                    <MaterialCommunityIcons
                        name="heart"
                        size={25}
                        color="rgb(255,20,77)"
                    />
                ) : (
                    <MaterialCommunityIcons
                        name="heart-outline"
                        size={25}
                        color="#fff"
                    />
                )}
            </TouchableOpacity>
        </>
    );
}
