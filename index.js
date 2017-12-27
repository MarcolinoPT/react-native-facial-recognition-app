import { AppRegistry } from "react-native";
import MainScreen from "./src/screens/MainScreen/MainScreen";
import { Provider } from "react-redux";
import store from "./src/config/store";

function FacialRecognitionApp() {
    return (
        <Provider store={store}>
            <MainScreen />
        </Provider>
    );
}

AppRegistry.registerComponent(
    "FacialRecognitionApp",
    () => FacialRecognitionApp
);
