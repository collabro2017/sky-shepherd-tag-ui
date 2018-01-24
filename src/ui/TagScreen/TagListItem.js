// @flow
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import type { Tag } from "../../data/types"
import styles from "../../styles"

type Props = {
  tag: Tag,
  onPress: Tag => void
}

const TagListItem = ({ tag, onPress }: Props) => {
  const onPressThis = () => {
    onPress(tag)
  }
  return (
    <TouchableOpacity onPress={onPressThis}>
      <View style={styles.listItem}>
        <Text style={styles.listItemText}>{tag.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default TagListItem
