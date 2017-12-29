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
import _ from "lodash";
import { recognition } from "./../../actions/api";

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
                    captureQuality={Camera.constants.CaptureQuality.photo}
                    captureTarget={Camera.constants.CaptureTarget.temp}
                    ref={cam => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    type={"front"}
                >
                    <Text
                        style={styles.capture}
                        onPress={this.startDebounceCalls}
                    >
                        Start
                    </Text>
                    <Text
                        style={styles.capture}
                        onPress={this.endDebounceCalls}
                    >
                        End
                    </Text>
                </Camera>
            </View>
        );
    }

    startDebounceCalls = () => {
        const options = {};
        //options.location = ...
        this.camera
            .capture({ metadata: options })
            .then(data => {
                console.log(data);
                // this.props.login(data.path);
                this.props.recognition(data.path);
            })
            .catch(err => console.error(err));
        this.debouncedCall = _.debounce(this.startDebounceCalls, 3000, {
            maxWait: 3500
        });
        this.debouncedCall();
    };

    endDebounceCalls = () => {
        console.log("finished", Date.now());
        this.debouncedCall.cancel();
    };

    takePicture() {
        console.log(this.props);
        const options = {};
        //options.location = ...
        this.camera
            .capture({ metadata: options })
            .then(data => {
                console.log(data);
                // this.props.login(data.path);
                this.props.recognition(data.path);
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
    // login,
    recognition
})(MainScreen);
