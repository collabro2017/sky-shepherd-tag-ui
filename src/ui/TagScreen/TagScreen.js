// @flow
import React from "react"
import { connect } from "react-redux"
import { FlatList, View } from "react-native"
import { tagSelectors } from "../../state/tag"
import TagListItem from "./TagListItem"
import ItemSeparator from "../ListItemSeparator"
import StatusBar from "../StatusBar"
import type { NavigationScreenProp } from "react-navigation"
import type { Tag } from "../../data/types"
import type { State } from "../../state/types"

type Props = {
  data: Tag[],
  navigation: NavigationScreenProp<*>,
  onPressItem: Tag => void
}

const mapStateToProps = (state: State, ownProps: Props): Props => {
  return {
    ...ownProps,
    data: tagSelectors.getTags(state),
    onPressItem: (tag: Tag) => {
      ownProps.navigation.navigate("map", { tag })
    }
  }
}

const keyExtractor = (item: Tag) => item.id

const TagScreen = (props: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <FlatList
        data={props.data}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => {
          return <TagListItem tag={item} onPress={props.onPressItem} />
        }}
      />
    </View>
  )
}

export default connect(mapStateToProps)(TagScreen)
