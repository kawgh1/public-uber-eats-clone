import React from "react";
import { View, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
export default function SearchBar({ cityHandler }) {
    return (
        <View style={{ marginTop: 15, flexDirection: "row" }}>
            {/* 'key' in query is Google Places API key from Google Cloud Console Project */}
            <GooglePlacesAutocomplete
                query={{ key: "***************************" }}
                requestUrl={{
                    useOnPlatform: "all", // or "web"
                    url: "https://---PRIVATE CORS SERVER URL---/https://maps.googleapis.com/maps/api", // or any proxy server that hits https://maps.googleapis.com/maps/api
                    headers: {
                        Authorization: "Bearer ***************************", // if required for your proxy
                    },
                }}
                onPress={(data, details = null) => {
                    console.log(data.description);
                    const city = data.description.split(",")[0];
                    cityHandler(city);
                }}
                placeholder="Search"
                styles={{
                    textInput: {
                        backgroundColor: "#eee",
                        borderRadius: 20,
                        fontWeight: "700",
                        marginTop: 7,
                    },
                    textInputContainer: {
                        backgroundColor: "#eee",
                        borderRadius: 50,
                        flexDirection: "row",
                        alignItems: "center",
                        marginRight: 10,
                    },
                }}
                renderLeftButton={() => (
                    <View style={{ flexDirection: "row", marginLeft: 8 }}>
                        <Ionicons name="location-sharp" size={24} />
                    </View>
                )}
                renderRightButton={() => (
                    <View
                        style={{
                            flexDirection: "row",
                            marginRight: 8,
                            marginLeft: 8,
                            backgroundColor: "white",
                            padding: 9,
                            borderRadius: 50,
                            alignItems: "center",
                        }}
                    >
                        <AntDesign
                            name="clockcircle"
                            size={11}
                            style={{ marginRight: 6 }}
                        />
                        <Text>Search</Text>
                    </View>
                )}
            />
        </View>
    );
}
