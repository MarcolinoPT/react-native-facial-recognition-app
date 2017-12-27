import { AppRegistry } from "react-native";
import MainScreen from "./src/screens/MainScreen/MainScreen";
import { createPerson, createPersonGroup } from "./src/actions/api";
import Globals from "./src/config/Globals";

createPersonGroup(Globals.personGroupId)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error.message);
    });

AppRegistry.registerComponent("FacialRecognitionApp", () => MainScreen);
