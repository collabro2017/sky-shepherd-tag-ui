// @flow
import React from "react"
import { Text, View } from "react-native"
import type { Tag } from "../../data/types"
import styles from "../../styles"

type Props = {
  tag: Tag
}

const TagListItem = ({ tag }: Props) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{tag.name}</Text>
    </View>
  )
}

export default TagListItem
