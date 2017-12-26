import React, { Component } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";
import Camera from "react-native-camera";

const styles = StyleSheet.create({
    capture: {
        backgroundColor: "#fff",
        borderRadius: 5,
        color: "#000",
        flex: 0,
        padding: 10,
        margin: 40
    },
    container: {
        flex: 1,
        flexDirection: "row"
    },
    preview: {
        alignItems: "center",
        flex: 1,
        justifyContent: "flex-end"
    }
});

export default class BadInstagramCloneApp extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Camera
                    aspect={Camera.constants.Aspect.fill}
                    ref={cam => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    type={"front"}
                >
                    <Text
                        style={styles.capture}
                        onPress={this.takePicture.bind(this)}
                    >
                        [CAPTURE]
                    </Text>
                </Camera>
            </View>
        );
    }

    takePicture() {
        const options = {};
        //options.location = ...
        this.camera
            .capture({ metadata: options })
            .then(data => console.log(data))
            .catch(err => console.error(err));
    }
}
