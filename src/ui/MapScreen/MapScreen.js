// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { View } from "react-native"
import { mapSelectors, mapActions } from "../../state/map"
import { areaSelectors } from "../../state/area"
import Map from "./Map"
import InputBar from "../InputBar"
import SlideDownFromTopView from "../SlideDownFromTopView"
import StatusBar from "../StatusBar"
import { headerLeft, headerRight, headerTitle } from "../../nav"
import { inputBarHeight } from "../../styles"
import type {
  NavigationScreenConfigProps,
  NavigationScreenProp
} from "react-navigation"
import type { Area, AreaChanges, Tag } from "../../data/types"
import type {
  Dispatch,
  Region,
  MapMode,
  MapType,
  PressEvent,
  State
} from "../../state/types"

const mapStateToProps = (state: State, ownProps: Props) => {
  const areaChanges = mapSelectors.getAreaChanges(state)
  const areaChangesName = areaChanges != null ? areaChanges.name : ""
  return {
    ...ownProps,
    area: mapSelectors.getArea(state),
    areas: areaSelectors.getAreas(state),
    areaChanges,
    areaChangesName,
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
          dispatch(mapActions.addCoordinateToAreaChanges(coordinate))
        }
      }
    },
    onLongPress: () => {
      ownProps.navigation.navigate("map", { mode: "create" })
    },

    onAreaNameChanged: (name: string) => {
      dispatch(mapActions.updateAreaChangesName(name))
    },

    saveRegion: (region: Region) => {
      dispatch(mapActions.regionChanged(region))
    }
  }
}

class MapScreen extends Component<Props> {
  static navigationOptions = ({ navigation }: NavigationScreenConfigProps) => {
    const { routeName, params } = navigation.state
    return {
      title: "Map",
      headerLeft: headerLeft(navigation),
      headerRight: headerRight(routeName, params),
      headerTitle: headerTitle(routeName, params)
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
        {this.props.mode == "create" && (
          <SlideDownFromTopView height={inputBarHeight}>
            <InputBar
              onChangeText={this.props.onAreaNameChanged}
              placeholder="New area"
              value={this.props.areaChangesName}
            />
          </SlideDownFromTopView>
        )}
        <Map
          area={this.props.area}
          areas={this.props.areas}
          lastRegion={this.props.lastRegion}
          mapType={this.props.mapType}
          mode={this.props.mode}
          navigateToArea={this.props.navigateToArea}
          areaChanges={this.props.areaChanges}
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
  areaChanges: ?AreaChanges,
  areaChangesName: string,
  navigateToArea: Area => void,
  navigation: NavigationScreenProp<*>,
  onAreaNameChanged: string => void,
  onLongPress: () => void,
  onPress: MapScreen => PressEventHandler,
  saveRegion: Region => void,
  tag: ?Tag
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)
