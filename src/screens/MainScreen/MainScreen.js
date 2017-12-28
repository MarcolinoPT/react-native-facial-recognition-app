import React, { Component } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";
import { connect } from "react-redux";
import Camera from "react-native-camera";
import {
    personGroupTrainingStatus,
    trainPersonGroup
} from "./../../actions/api";
import Globals from "./../../config/Globals";

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

class MainScreen extends Component {
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
                    <Text style={styles.capture} onPress={this.getStatus}>
                        [STATUS]
                    </Text>
                </Camera>
            </View>
        );
    }

    getStatus = () => {
        this.props.personGroupTrainingStatus(Globals.personGroupId);
    };

    takePicture() {
        console.log(this.props);
        const options = {};
        //options.location = ...
        this.camera
            .capture({ metadata: options })
            .then(data => {
                this.props.trainPersonGroup(Globals.personGroupId);
            })
            .catch(err => console.error(err));
    }
}

function mapStateToProps(state) {
    return {
        personGroup: state.personGroup,
        user: state.user
    };
}

export default connect(mapStateToProps, {
    personGroupTrainingStatus,
    trainPersonGroup
})(MainScreen);
