import React, { Component } from "react"
import { StatusBar, View } from "react-native"
import Map from "./Map"
import { colors } from "../styles"

export default class Home extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={colors.logoGray} barStyle="light-content" />
        <Map />
      </View>
    )
  }
}
