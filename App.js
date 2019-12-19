import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LogIn from './client/LogIn.js'

export default function App() {
  return (
    <View style={styles.container}>
      <LogIn />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
