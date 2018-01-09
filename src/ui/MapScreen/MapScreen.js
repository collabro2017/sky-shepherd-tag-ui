import React, { Component } from "react"
import { View } from "react-native"
import Map from "./Map"
import StatusBar from "../StatusBar"

export default class MapScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar />
        <Map />
      </View>
    )
  }
}
