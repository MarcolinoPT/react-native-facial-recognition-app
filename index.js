import React from "react";
import { AppRegistry } from "react-native";
import MainScreen from "./src/screens/MainScreen/MainScreen";
import { Provider } from "react-redux";
import store from "./src/config/store";
import { init } from "./src/actions/bootstrap/init";

function FacialRecognitionApp() {
    return (
        <Provider store={store}>
            <MainScreen />
        </Provider>
    );
}

store.dispatch(init());

AppRegistry.registerComponent(
    "FacialRecognitionApp",
    () => FacialRecognitionApp
);
