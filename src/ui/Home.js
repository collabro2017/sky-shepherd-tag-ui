import React, { Component } from "react"
import {
  Alert,
  Button,
  Platform,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View
} from "react-native"
import styles from "../styles"
import Map from "./Map"

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
})

export default class Home extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Text>Map</Text>
        <Map />
      </SafeAreaView>
    )
    /*
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>SkyShepherd Tag</Text>
        <Text style={styles.instructions}>
          To get started, edit src/ui/Home.js
        </Text>
        <Text style={styles.instructions}>{instructions}</Text>

        <Button title="Say Hello" onPress={this.sayHello} />
      </View>
    )
    */
  }

  sayHello() {
    Alert.alert("Hello")
  }
}
