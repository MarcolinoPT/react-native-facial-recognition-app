import React, { Component } from "react";
import {
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";
import { createUser } from "./../../actions/user/creation";

class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: undefined,
            userImages: []
        };
    }

    render() {
        console.log(this.props.personGroup);
        return (
            <View style={{ flex: 1, marginTop: 40 }}>
                <Text
                    style={{
                        color: "black",
                        margin: 10
                    }}
                >
                    Name of user
                </Text>
                <TextInput
                    onChangeText={username => {
                        this.setState({ username });
                    }}
                    value={this.state.username}
                    placeholder={"Your name"}
                    style={{
                        marginLeft: 10,
                        marginRight: 10,
                        padding: 10
                    }}
                />
                <TouchableOpacity
                    onPress={() => {
                        var options = {
                            cancelButtonTitle: "Cancel",
                            mediaType: "photo",
                            noData: true,
                            takePhotoButtonTile: "Take picture"
                        };
                        ImagePicker.launchCamera(options, response => {
                            console.log(response);
                            if (response.didCancel === undefined) {
                                // Only add pictures if
                                // the user did not cancel
                                this.setState({
                                    userImages: [
                                        ...this.state.userImages,
                                        response.path
                                    ]
                                });
                            }
                        });
                    }}
                    style={{
                        alignSelf: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        borderColor: "black",
                        width: 100,
                        height: 40,
                        borderWidth: 1,
                        marginTop: 10
                    }}
                >
                    <Text>Take picture</Text>
                </TouchableOpacity>
                <Text style={{ textAlign: "center", margin: 10 }}>
                    {this.state.userImages.length} picture(s) taken
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        this.props.createUser(
                            this.state.username,
                            this.state.userImages
                        );
                    }}
                    style={{
                        alignSelf: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        borderColor: "black",
                        width: 100,
                        height: 40,
                        borderWidth: 1,
                        marginTop: 10
                    }}
                >
                    <Text>Create user</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        personGroup: state.personGroup
    };
}

export default connect(mapStateToProps, {
    createUser
})(RegisterScreen);
