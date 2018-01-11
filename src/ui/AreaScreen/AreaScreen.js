// @flow
import React from "react"
import { connect } from "react-redux"
import { FlatList, View } from "react-native"
import { areaSelectors } from "../../state/area"
import AreaListItem from "./AreaListItem"
import ItemSeparator from "../ListItemSeparator"
import StatusBar from "../StatusBar"
import type { Area } from "../../data/types"
import type { AreaState } from "../../state/types"

type Props = {
  data: Area[]
}

const mapStateToProps = (state: { area: AreaState }): Props => {
  return {
    data: areaSelectors.getAreas(state)
  }
}

const keyExtractor = (item: Area) => item.objectId

const AreaScreen = (props: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <FlatList
        data={props.data}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => {
          return <AreaListItem area={item} />
        }}
      />
    </View>
  )
}

export default connect(mapStateToProps)(AreaScreen)
