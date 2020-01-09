import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button, Picker, TouchableOpacity } from "react-native";
import axios from "axios";
import { urlResolver } from "./utills.js";
import Stat from "./Stat.js";
import StatsTabs from "./StatsTabs";

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
            <StatsTabs onClickLog={this.toggleStats} />
            <Stat userId={userId} />
          </View>
        ) : (
          <View>
            <View style={styles.navBar}>
              <View style={styles.clickedButton}>
                <Text style={styles.clickedText}>LOG</Text>
              </View>
              <TouchableOpacity style={styles.navButton} onPress={this.toggleStats}>
                <Text style={styles.buttonText}>STATS</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.form}>
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
            </View>
            <View>
              <TouchableOpacity onPress={this.saveLog} style={styles.saveBtn}>
                <Text style={styles.buttonText}>SAVE</Text>
              </TouchableOpacity>
              {isLogged ? <Text>Your log is saved</Text> : null}
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 60,
    borderBottomColor: "#90EE90",
    borderBottomWidth: 3,
    marginBottom: 50
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
    fontSize: 25
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
  },
  navButton: {
    height: 40,
    width: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 0,
    borderColor: "#90EE90",
    borderWidth: 3,
    marginTop: 20,
    padding: 5
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold"
  },
  clickedButton: {
    height: 40,
    width: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 0,
    borderColor: "#90EE90",
    backgroundColor: "#E0FFFF",
    borderWidth: 3,
    marginTop: 20,
    padding: 5
  },
  clickedText: {
    fontSize: 20,
    textAlign: "center",
    color: "#708090",
    fontWeight: "bold"
  },
  saveBtn: {
    height: 40,
    width: 160,
    borderRadius: 10,
    borderColor: "#90EE90",
    borderWidth: 3,
    marginTop: 20,
    padding: 5
  }
});
