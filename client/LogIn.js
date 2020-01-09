import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight } from "react-native";
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
    axios
      .get(`${urlResolver()}/login/${this.state.userName}`)
      .then(response => {
        let loginInfo = response.data;
        if (loginInfo.email === this.state.email) {
          this.props.toggleLoginPage();
          this.props.setUserId(loginInfo.userid);
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
          <Text style={styles.pageName}>Log In</Text>
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
          <TouchableHighlight onPress={this.logIn} style={styles.logInButton}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.needAcc}>
          <Text>Need an account?</Text>
          <Button title="Create Account" onPress={this.props.toggleLoginPage} />
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
    borderColor: "#90EE90",
    fontSize: 20,
    margin: 10,
    padding: 10,
    width: 300
  },
  title: {
    fontSize: 45,
    color: "#90EE90",
    fontWeight: "bold",
    paddingTop: 50
  },
  needAcc: {
    fontSize: 20,
    paddingBottom: 50
  },
  pageName: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 50
  },
  logInButton: {
    height: 40,
    width: 160,
    borderRadius: 10,
    borderColor: "#90EE90",
    borderWidth: 3,
    marginTop: 20,
    padding: 5
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center"
  }
});
