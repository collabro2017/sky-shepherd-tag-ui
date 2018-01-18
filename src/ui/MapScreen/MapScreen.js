// @flow
import React, { Component } from "react"
import { View } from "react-native"
import Map from "./Map"
import StatusBar from "../StatusBar"
import type { NavigationScreenProp } from "react-navigation"

export default class MapScreen extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar />
        <Map />
      </View>
    )
  }
}

type Props = {
  navigation: NavigationScreenProp<*>
}
