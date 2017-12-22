import React, { Component } from "react"
import { SafeAreaView, StatusBar } from "react-native"
import Map from "./Map"

export default class Home extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Map />
      </SafeAreaView>
    )
  }
}
