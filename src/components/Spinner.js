import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function Spinner({ visible, backgroundColor }) {
    return (
        visible && (
            <View
                style={{
                    alignItems: "center",
                    backgroundColor: backgroundColor
                        ? backgroundColor
                        : "transparent",
                    borderRadius: 5,
                    flex: 1,
                    justifyContent: "center",
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    right: 0
                }}
            >
                <View
                    style={{
                        backgroundColor: "white",
                        borderRadius: 5,
                        padding: 10
                    }}
                >
                    <ActivityIndicator size={"large"} />
                    <Text>Please wait...</Text>
                </View>
            </View>
        )
    );
}
