import { AppRegistry } from "react-native";
import MainScreen from "./src/screens/MainScreen/MainScreen";
import { createPersonGroup } from "./src/actions/api/createPersonGroup";

createPersonGroup("facerecog");

AppRegistry.registerComponent("FacialRecognitionApp", () => MainScreen);
