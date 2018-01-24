// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { View } from "react-native"
import { mapSelectors, mapOperations } from "../../state/map"
import { areaSelectors } from "../../state/area"
import Map from "./Map"
import StatusBar from "../StatusBar"
import type { NavigationScreenProp } from "react-navigation"
import type { Area, Tag } from "../../data/types"
import type {
  Dispatch,
  Region,
  MapMode,
  MapType,
  State
} from "../../state/types"

const mapStateToProps = (state: State, ownProps: Props) => {
  return {
    ...ownProps,
    area: mapSelectors.getArea(state),
    areas: areaSelectors.getAreas(state),
    lastRegion: mapSelectors.getLastRegion(state),
    mode: mapSelectors.getMode(state),
    mapType: "hybrid",
    tag: mapSelectors.getTag(state)
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    // onLongPress: () => dispatch(mapOperations.createBoundary()),
    saveRegion: function(region: Region) {
      dispatch(mapOperations.regionChanged(region))
    }
  }
}

class MapScreen extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar />
        <Map
          area={this.props.area}
          areas={this.props.areas}
          lastRegion={this.props.lastRegion}
          mapType={this.props.mapType}
          mode={this.props.mode}
          saveRegion={this.props.saveRegion}
          tag={this.props.tag}
        />
      </View>
    )
  }
}

type Props = {
  area: ?Area,
  areas: Area[],
  lastRegion: Region,
  mapType: MapType,
  mode: MapMode,
  navigation: NavigationScreenProp<*>,
  saveRegion: Region => void,
  tag: ?Tag
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)
