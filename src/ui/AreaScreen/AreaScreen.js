// @flow
import React from "react"
import { connect } from "react-redux"
import { FlatList, View } from "react-native"
import { areaSelectors } from "../../state/area"
import AreaListItem from "./AreaListItem"
import ItemSeparator from "../ListItemSeparator"
import StatusBar from "../StatusBar"
import type { NavigationScreenProp } from "react-navigation"
import type { Dispatch } from "redux-thunk"
import type { Area } from "../../data/types"
import type { State } from "../../state/types"

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

const mapDispatchToProps = (dispatch: Dispatch, ownProps: Props): Props => {
  return {
    ...ownProps,
    onPressItem: (area: Area) => {
      ownProps.navigation.navigate("map", { area })
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
