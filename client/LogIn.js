import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import axios from "axios";
import { urlResolver } from "./utills.js";

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: ""
    };

    this.logIn = this.logIn.bind(this);
  }

  logIn(e) {
    e.preventDefault();
    console.log(this.state.userName);
    axios
      .get(`${urlResolver()}/login/${this.state.userName}`)
      .then(response => {
        let loginInfo = response.data;
        if (loginInfo.email === this.state.email) {
          // this.props.toggleLoginPage();
          // this.props.setUserId(loginInfo.userid);
        } else {
          alert("your Log In information is not correct");
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <View>
        <Text style={styles.title}>Climbing Day</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            value={this.state.userName}
            placeholder="User Name"
            onChangeText={userName => this.setState({ userName: userName.toLowerCase() })}
          />
          <TextInput
            style={styles.input}
            value={this.state.email}
            placeholder="Email"
            onChangeText={email => this.setState({ email: email.toLowerCase() })}
          />
          <Button title="Login" onPress={this.logIn} />
        </View>
        <View style={styles.needAcc}>
          <Text>Need an account?</Text>
          <Button title="Create Account" />
        </View>
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
  },
  input: {
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "black",
    fontSize: 20,
    margin: 10,
    padding: 10,
    width: 300
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    paddingTop: 50
  },
  needAcc: {
    fontSize: 20,
    paddingBottom: 50
  }
});
