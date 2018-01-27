// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { View } from "react-native"
import { mapSelectors, mapOperations } from "../../state/map"
import { areaSelectors } from "../../state/area"
import Map from "./Map"
import StatusBar from "../StatusBar"
import { headerLeft, headerRight, headerTitle } from "../../nav"
import type {
  NavigationScreenConfigProps,
  NavigationScreenProp
} from "react-navigation"
import type { Area, NewArea, Tag } from "../../data/types"
import type {
  Dispatch,
  Region,
  MapAction,
  MapMode,
  MapType,
  PressEvent,
  State
} from "../../state/types"

const mapStateToProps = (state: State, ownProps: Props) => {
  return {
    ...ownProps,
    area: mapSelectors.getArea(state),
    areas: areaSelectors.getAreas(state),
    newArea: mapSelectors.getNewArea(state),
    lastRegion: mapSelectors.getLastRegion(state),
    mode: mapSelectors.getMode(state),
    mapType: "hybrid",
    tag: mapSelectors.getTag(state)
  }
}

type PressEventHandler = PressEvent => void
const mapDispatchToProps = (dispatch: Dispatch, ownProps: Props): Props => {
  return {
    ...ownProps,
    navigateToArea: (area: Area) => {
      ownProps.navigation.navigate("map", { mode: "area", area })
    },
    onPress: (mapScreen: MapScreen): PressEventHandler => {
      return ({ nativeEvent: { coordinate } }: PressEvent) => {
        if (mapScreen.props.mode === "create") {
          dispatch(
            ({
              type: "tag/map/ADD_COORDINATE_TO_NEW_AREA",
              payload: coordinate
            }: MapAction)
          )
        }
      }
    },
    onLongPress: () => {
      ownProps.navigation.navigate("map", { mode: "create" })
    },
    saveRegion: (region: Region) => {
      dispatch(mapOperations.regionChanged(region))
    }
  }
}

class MapScreen extends Component<Props> {
  static navigationOptions = ({ navigation }: NavigationScreenConfigProps) => {
    return {
      title: "Map",
      headerLeft: headerLeft(navigation),
      headerRight: headerRight(navigation),
      headerTitle: headerTitle(navigation)
    }
  }

  _onPress: PressEvent => void

  constructor(props: Props) {
    super(props)
    this._onPress = this.props.onPress(this)
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
          navigateToArea={this.props.navigateToArea}
          newArea={this.props.newArea}
          onLongPress={this.props.onLongPress}
          onPress={this._onPress}
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
  newArea: ?NewArea,
  navigateToArea: Area => void,
  navigation: NavigationScreenProp<*>,
  onLongPress: () => void,
  onPress: MapScreen => PressEventHandler,
  saveRegion: Region => void,
  tag: ?Tag
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)
