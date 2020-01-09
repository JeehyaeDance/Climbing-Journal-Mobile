import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button, Picker } from "react-native";
import axios from "axios";
import { urlResolver } from "./utills.js";
import Stat from "./Stat.js";

export default class LogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 0,
      note: "",
      userId: this.props.userId,
      isLogged: false,
      toggleStat: false
    };

    this.saveLog = this.saveLog.bind(this);
    this.toggleStats = this.toggleStats.bind(this);
  }

  saveLog(e) {
    e.preventDefault();
    axios
      .post(`${urlResolver()}/log`, {
        level: this.state.level,
        note: this.state.note,
        userId: this.state.userId
      })
      .then(response => {
        this.setState({ isLogged: !this.state.isLogged });
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  toggleStats() {
    this.setState(({ toggleStat }) => ({
      toggleStat: !toggleStat
    }));
  }

  render() {
    const { toggleStat, level, userId, isLogged, note } = this.state;
    return (
      <View>
        {toggleStat ? (
          <View>
            <View style={styles.navBar}>
              <Button title="LOG" onPress={this.toggleStats} />
              <Button title="STATS" disabled="true" />
            </View>
            <Stat userId={userId} />
          </View>
        ) : (
          <View style={styles.form}>
            <View style={styles.navBar}>
              <Button title="LOG" disabled="true" />
              <Button title="STATS" onPress={this.toggleStats} />
            </View>
            <View style={styles.note}>
              <Text style={styles.log}>Note:</Text>
              <TextInput style={styles.noteBox} onChangeText={noteVal => this.setState({ note: noteVal })} />
            </View>
            <View style={styles.level}>
              <Text style={styles.log}>Level: {level}</Text>
            </View>
            <Picker selectedValue={level} onValueChange={itemValue => this.setState({ level: itemValue })}>
              <Picker.Item label="V0" value="0" />
              <Picker.Item label="V1" value="1" />
              <Picker.Item label="V2" value="2" />
              <Picker.Item label="V3" value="3" />
              <Picker.Item label="V4" value="4" />
              <Picker.Item label="V5" value="5" />
              <Picker.Item label="V6" value="6" />
              <Picker.Item label="V7" value="7" />
              <Picker.Item label="V8" value="8" />
              <Picker.Item label="V9" value="9" />
            </Picker>
            <Button title="SAVE" onPress={this.saveLog} />
            {isLogged ? <Text>Your log is saved</Text> : null}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 100
  },
  form: {
    display: "flex",
    flex: 2,
    justifyContent: "flex-start"
  },
  level: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  log: {
    fontSize: 30
  },
  noteBox: {
    borderWidth: 1,
    borderRadius: 3,
    marginLeft: 10,
    marginBottom: 10,
    width: 270,
    height: 130
  },
  note: {
    display: "flex",
    flexDirection: "row"
  }
});
