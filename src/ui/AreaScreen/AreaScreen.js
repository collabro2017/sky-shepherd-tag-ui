// @flow
import Promise from "promise"
import React from "react"
import { connect } from "react-redux"
import { FlatList, View } from "react-native"
import { areaSelectors } from "../../state/area"
import AreaListItem from "./AreaListItem"
import ItemSeparator from "../ListItemSeparator"
import StatusBar from "../StatusBar"
import type { NavigationScreenProp, NavigationAction } from "react-navigation"
import type { Dispatch } from "redux-thunk"
import type { Area } from "../../data/types"
import type { MapAction, State, ThunkAction } from "../../state/types"

type Props = {
  data: Area[],
  navigation: NavigationScreenProp<*>,
  onPressItem: (area: Area) => typeof undefined
}

const mapStateToProps = (state: State, ownProps: Props): Props => {
  return {
    ...ownProps,
    data: areaSelectors.getAreas(state)
  }
}

const showArea = (area: Area): ThunkAction => {
  return dispatch => {
    dispatch({
      type: "tag/map/SHOW_AREA",
      payload: area
    })
  }
}
const mapDispatchToProps = (dispatch: Dispatch, ownProps: Props): Props => {
  return {
    ...ownProps,
    onPressItem: (area: Area) => {
      dispatch(showArea(area))
      ownProps.navigation.navigate("map")
    }
  }
}

const keyExtractor = (item: Area) => item.id

const AreaScreen = (props: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <FlatList
        data={props.data}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={keyExtractor}
        onPressItem={props.onPressItem}
        renderItem={({ item }) => {
          return <AreaListItem area={item} onPress={props.onPressItem} />
        }}
      />
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaScreen)
