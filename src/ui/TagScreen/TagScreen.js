// @flow
import React from "react"
import { connect } from "react-redux"
import { FlatList, View } from "react-native"
import TagListItem from "./TagListItem"
import StatusBar from "../StatusBar"
import type { Tag } from "../../data/types"
import styles from "../../styles"

type Props = {
  data: [Tag]
}

const mapStateToProps = () => {
  return {
    data: [
      { objectId: "1", title: "Andy" },
      { objectId: "2", title: "Wallet" },
      { objectId: "3", title: "Backpack" }
    ]
  }
}

const keyExtractor = (item: Tag) => item.objectId
const itemSeparator = () => {
  return <View style={styles.listItemSeparator} />
}

const TagScreen = (props: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <FlatList
        data={props.data}
        ItemSeparatorComponent={itemSeparator}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => {
          return <TagListItem tag={item} />
        }}
      />
    </View>
  )
}

export default connect(mapStateToProps)(TagScreen)
