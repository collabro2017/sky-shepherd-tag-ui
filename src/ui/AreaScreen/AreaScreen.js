// @flow
import React from "react"
import { connect } from "react-redux"
import { FlatList, View } from "react-native"
import AreaListItem from "./AreaListItem"
import StatusBar from "../StatusBar"
import type { Area } from "../../data/types"
import styles from "../../styles"

type Props = {
  data: [Area]
}

const mapStateToProps = () => {
  return {
    data: [
      { objectId: "1", title: "Backyard" },
      { objectId: "2", title: "Naomi's" },
      { objectId: "3", title: "Dog Park" }
    ]
  }
}

const keyExtractor = (item: Area) => item.objectId
const itemSeparator = () => {
  return <View style={styles.listItemSeparator} />
}

const AreaScreen = (props: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <FlatList
        data={props.data}
        ItemSeparatorComponent={itemSeparator}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => {
          return <AreaListItem area={item} />
        }}
      />
    </View>
  )
}

export default connect(mapStateToProps)(AreaScreen)
