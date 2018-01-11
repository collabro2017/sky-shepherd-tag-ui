// @flow
import React from "react"
import { connect } from "react-redux"
import { FlatList, View } from "react-native"
import { tagSelectors } from "../../state/tag"
import TagListItem from "./TagListItem"
import ItemSeparator from "../ListItemSeparator"
import StatusBar from "../StatusBar"
import type { Tag } from "../../data/types"
import type { State } from "../../state/types"

type Props = {
  data: Tag[]
}

const mapStateToProps = (state: State): Props => {
  return {
    data: tagSelectors.getTags(state)
  }
}

const keyExtractor = (item: Tag) => item.objectId

const TagScreen = (props: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <FlatList
        data={props.data}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => {
          return <TagListItem tag={item} />
        }}
      />
    </View>
  )
}

export default connect(mapStateToProps)(TagScreen)
