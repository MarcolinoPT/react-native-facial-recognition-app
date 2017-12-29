import React, { Component } from "react";
import {
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { connect } from "react-redux";
import Camera from "react-native-camera";
import _ from "lodash";
import { recognition } from "./../../actions/api";
import { login } from "./../../actions/user/authentication";

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#fff",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10
    },
    buttonText: {
        color: "#000"
    },
    container: {
        flex: 1
    },
    preview: {
        alignItems: "center",
        flex: 1,
        justifyContent: "flex-end"
    }
});

class MainScreen extends Component {
    render() {
        console.log("render");
        console.log(this.props);
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
                />
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 0.2
                    }}
                >
                    {this.props.user.isAuthenticated === false &&
                        this.props.user.isAuthenticating === false && (
                            <TouchableOpacity
                                style={styles.button}
                                onPress={this.unlockApp}
                            >
                                <Text style={styles.buttonText}>Unlock</Text>
                            </TouchableOpacity>
                        )}
                    {this.props.user.isAuthenticated && (
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>
                                    Read emotion
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, { marginLeft: 10 }]}
                            >
                                <Text style={styles.buttonText}>Lock app</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                {this.props.user.isAuthenticating === true && (
                    <View
                        style={{
                            alignItems: "center",
                            backgroundColor: "transparent",
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
                            <Text>Authenticating, please wait...</Text>
                        </View>
                    </View>
                )}
            </View>
        );
    }

    unlockApp = () => {
        const options = {};
        this.camera
            .capture({ metadata: options })
            .then(data => {
                this.props.login(data.path);
            })
            .catch(error => {});
    };

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
    login,
    recognition
})(MainScreen);
