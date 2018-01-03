import React, { Component } from "react";
import {
    ActivityIndicator,
    Dimensions,
    ImageBackground,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { connect } from "react-redux";
import Camera from "react-native-camera";
import _ from "lodash";
import { recognition } from "./../../actions/api";
import { login, logout } from "./../../actions/user/authentication";

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
    cameraView: {
        alignItems: "center",
        flex: 1,
        justifyContent: "flex-end"
    },
    container: {
        flex: 1
    }
});

class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imagePath: undefined,
            name: undefined,
            score: 0,
            showModal: false,
            timestamp: 0
        };
    }

    componentWillReceiveProps(nextProps) {
        // Receive emotion found
        if (nextProps.emotion.timestamp !== this.state.timestamp) {
            this.setState({
                imagePath: nextProps.emotion.imagePath,
                name: nextProps.emotion.name,
                score: nextProps.emotion.score,
                showModal: true,
                timestamp: nextProps.emotion.timestamp
            });
        }
    }

    lockApp = () => {
        this.props.logout();
    };

    render() {
        console.log("render");
        console.log(this.props);
        const imagePath = this.state.imagePath;
        return (
            <View style={styles.container}>
                <Camera
                    aspect={Camera.constants.Aspect.fill}
                    captureQuality={Camera.constants.CaptureQuality.photo}
                    captureTarget={Camera.constants.CaptureTarget.temp}
                    ref={cam => {
                        this.camera = cam;
                    }}
                    style={styles.cameraView}
                    type={"front"}
                />
                {this.props.user.isAuthenticated && (
                    <View
                        style={{
                            backgroundColor: "white",
                            borderRadius: 5,
                            padding: 3,
                            position: "absolute",
                            top: 8,
                            left: 8
                        }}
                    >
                        <Text>{this.props.user.person.name}</Text>
                    </View>
                )}
                <Modal
                    animationType={"fade"}
                    onRequestClose={() => {
                        this.setState({ showModal: false }, () => {
                            console.log(this.state);
                        });
                    }}
                    visible={this.state.showModal}
                >
                    <ImageBackground
                        style={{ flex: 1 }}
                        source={{ uri: this.state.imagePath }}
                    >
                        <Text style={{ color: "red" }}>
                            {this.state.name} {this.state.score}
                        </Text>
                    </ImageBackground>
                </Modal>
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 0.2
                    }}
                >
                    {this.props.user.isAuthenticated === false &&
                        this.props.user.isAuthenticating === false && (
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={this.unlockApp}
                                >
                                    <Text style={styles.buttonText}>
                                        Unlock
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    {this.props.user.isAuthenticated === true &&
                        this.props.user.isAuthenticating === false &&
                        this.props.emotion.analyzing === false && (
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={this.readEmotion}
                                >
                                    <Text style={styles.buttonText}>
                                        Read emotion
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, { marginLeft: 10 }]}
                                    onPress={this.lockApp}
                                >
                                    <Text style={styles.buttonText}>
                                        Lock app
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                </View>
                {(this.props.user.isAuthenticating === true ||
                    this.props.emotion.analyzing === true) && (
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
                            <Text>Please wait...</Text>
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
            .catch(error => {
                console.log(error);
            });
    };

    readEmotion = () => {
        console.log(this.props);
        const options = {};
        //options.location = ...
        this.camera
            .capture({ metadata: options })
            .then(data => {
                console.log(data);
                this.props.recognition(data.path);
            })
            .catch(err => console.error(err));
    };
}

function mapStateToProps(state) {
    return {
        emotion: state.emotion,
        personGroup: state.personGroup,
        user: state.user
    };
}

export default connect(mapStateToProps, {
    login,
    logout,
    recognition
})(MainScreen);
