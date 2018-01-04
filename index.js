import React from "react";
import { AppRegistry } from "react-native";
import MainScreen from "./src/screens/MainScreen/MainScreen";
import RegisterScreen from "./src/screens/RegisterScreen/RegisterScreen";
import { Provider } from "react-redux";
import store from "./src/config/store";

function FacialRecognitionApp() {
    return (
        <Provider store={store}>
            <RegisterScreen />
        </Provider>
    );
}

AppRegistry.registerComponent(
    "FacialRecognitionApp",
    () => FacialRecognitionApp
);
