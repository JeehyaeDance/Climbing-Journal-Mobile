import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import axios from "axios";
import { urlResolver } from "./utills.js";

export default class CreateAcc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accUserName: "",
      accEmail: ""
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    e.preventDefault();
    axios
      .post(`${urlResolver()}/user`, {
        userName: this.state.accUserName,
        email: this.state.accEmail
      })
      .then(response => {
        console.log(response);
        this.props.toggleLoginPage();
      })
      .catch(error => {
        console.log(error);
        alert("this username is already taken");
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.pageName}>Create an Account</Text>
        <TextInput
          style={styles.input}
          value={this.state.accUserName}
          placeholder="User Name"
          onChangeText={accUserName => this.setState({ accUserName: accUserName.toLowerCase() })}
        />
        <TextInput
          style={styles.input}
          value={this.state.accEmail}
          placeholder="Email"
          onChangeText={accEmail => this.setState({ accEmail: accEmail.toLowerCase() })}
        />
        <Button title="Create Account" onPress={this.clickHandler} />
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
  pageName: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 50
  }
});
