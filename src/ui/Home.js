import React, { Component } from 'react'
import {
  Alert,
  Button,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import styles from '../styles'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class Home extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
          <Text style={styles.instructions}>
          To get started, edit src/ui/Home.js
        </Text>
          <Text style={styles.instructions}>
          {instructions}
        </Text>

        <Button
          title="Tap me"
          onPress={this.sayHello}
        />

      </View>
    );
  }


  sayHello() {
    Alert.alert("Hello")
  }
}
