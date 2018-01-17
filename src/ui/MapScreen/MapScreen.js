// @flow
import React, { Component } from "react"
import { View } from "react-native"
import Map from "./Map"
import StatusBar from "../StatusBar"
import type { NavigationScreenProp } from "react-navigation"
import type { Area } from "../../data/types"

export default class MapScreen extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    const navigation = this.props.navigation
    const area: ?Area =
      navigation && navigation.state && navigation.state.params
        ? navigation.state.params.area
        : null
    return (
      <View style={{ flex: 1 }}>
        <StatusBar />
        <Map area={area} />
      </View>
    )
  }
}

type Props = {
  navigation: NavigationScreenProp<*>
}
