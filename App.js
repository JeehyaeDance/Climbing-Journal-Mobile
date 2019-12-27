import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import LogIn from "./client/LogIn.js";
import CreateAcc from "./client/CreateAcc.js";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      showLoginPage: true,
      userId: undefined
    };

    this.toggleLoginPage = this.toggleLoginPage.bind(this);
    this.setUserId = this.setUserId.bind(this);
  }

  toggleLoginPage() {
    this.setState(({ showLoginPage }) => ({
      showLoginPage: !showLoginPage
    }));
  }

  setUserId(id) {
    this.setState({
      userId: id
    });
  }

  render() {
    const { userId, showLoginPage } = this.state;
    return (
      <View style={styles.container}>
        {userId ? (
          <Text>This is Log Page</Text>
        ) : showLoginPage ? (
          <LogIn toggleLoginPage={this.toggleLoginPage} setUserId={this.setUserId} />
        ) : (
          <CreateAcc toggleLoginPage={this.toggleLoginPage} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
