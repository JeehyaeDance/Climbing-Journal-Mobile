import React, { Component } from "react";
import { LineChart } from "react-native-chart-kit";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import axios from "axios";
import { urlResolver, sortLogs } from "./utills.js";

export default class Stat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: undefined
    };
  }

  componentDidMount() {
    axios
      .get(`${urlResolver()}/logs/${this.props.userId}`)
      .then(response => {
        let logs = sortLogs(response.data);
        this.setState({
          logs: logs
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    const chartConfig = {
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(73, 61, 31, ${opacity})`,
      barPercentage: 0.5,
      decimalPlaces: 0
    };
    const screenWidth = Dimensions.get("window").width;
    let label, avg;
    if (this.state.logs) {
      label = this.state.logs.label;
      avg = this.state.logs.data;
    }
    let data = {
      labels: label,
      datasets: [
        {
          data: avg
        }
      ]
    };
    return (
      <View>
        <Text>Weekly Progress</Text>
        {this.state.logs ? (
          <LineChart data={data} width={screenWidth} yAxisLabel={"V"} height={220} chartConfig={chartConfig} />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({});
