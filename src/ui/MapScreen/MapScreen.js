// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { View } from "react-native"
import {
  mapSelectors,
  mapOperations,
  defaultLatitudeDelta
} from "../../state/map"
import { areaSelectors } from "../../state/area"
import Map from "./Map"
import StatusBar from "../StatusBar"
import type {
  NavigationScreenConfigProps,
  NavigationScreenProp
} from "react-navigation"
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

const mapDispatchToProps = (dispatch: Dispatch, ownProps: Props): Props => {
  return {
    ...ownProps,
    navigateToArea: (area: Area) => {
      ownProps.navigation.navigate("map", { mode: "area", area })
    },
    onLongPress: () => {
      ownProps.navigation.navigate("map", { mode: "create" })
    },
    saveRegion: (region: Region) => {
      dispatch(mapOperations.regionChanged(region))
    }
  }
}

const titleForMapParams = (params: ?{ [key: string]: mixed }): string => {
  const defaultTitle = "Map"
  if (params != null) {
    const mode = mapMode(params.mode)
    switch (mode) {
      case "create":
        return "New area"
      // TODO: Use area name when area, tag name when tag
      case "area":
        return nameFromParam(params.area, defaultTitle)
      case "tag":
        return nameFromParam(params.tag, defaultTitle)
      default:
        return defaultTitle
    }
  } else {
    return defaultTitle
  }
}

const mapMode = (param: mixed): MapMode => {
  if (
    typeof param === "string" &&
    (param === "view" ||
      param === "create" ||
      param === "edit" ||
      param === "area" ||
      param === "tag")
  ) {
    return param
  } else {
    return "area"
  }
}

const nameFromParam = (param: mixed, defaultTitle: string): string => {
  if (param != null && typeof param.name === "string") {
    return param.name
  } else {
    return defaultTitle
  }
}

class MapScreen extends Component<Props> {
  static navigationOptions = (params: NavigationScreenConfigProps) => {
    const navigation: NavigationScreenProp<*> = params.navigation
    return {
      title: "Map",
      headerTitle: titleForMapParams(navigation.state.params)
      // headerRight: <Button color={screenProps.tintColor} />,
    }
  }

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
          navigateToArea={this.props.navigateToArea}
          onLongPress={this.props.onLongPress}
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
  navigateToArea: Area => void,
  navigation: NavigationScreenProp<*>,
  onLongPress: () => void,
  saveRegion: Region => void,
  tag: ?Tag
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)
