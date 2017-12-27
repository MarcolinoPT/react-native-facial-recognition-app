import { AppRegistry } from "react-native";
import MainScreen from "./src/screens/MainScreen/MainScreen";
import { createPersonGroup } from "./src/actions/api";

createPersonGroup("facerecog")
    .then(response => {
        console.log("response");
    })
    .catch(error => {
        console.log(error.message);
    });

AppRegistry.registerComponent("FacialRecognitionApp", () => MainScreen);
