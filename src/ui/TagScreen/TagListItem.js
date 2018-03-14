// @flow
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import { humanDateTime } from "../../utils/format"
import type { Tag } from "../../data/types"
import styles, { colors } from "../../styles"

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
      <View style={styles.tagListItem}>
        <View style={styles.tagListItemIcon}>
          <Icon color={colors.logoGray} name="tag" size={30} />
        </View>
        <View style={styles.tagListItemTitle}>
          <Text style={styles.tagListItemTitleText}>{tag.name}</Text>
          <Text style={styles.tagListItemSubtitleText}>Back yard</Text>
          <Text style={styles.tagListItemTitleLastSeen}>
            Last seen {humanDateTime(tag.updatedAt)}
          </Text>
        </View>
        <View style={styles.tagListItemStatus}>
          <View style={styles.tagListItemStatusIndicator} />
          <Text style={styles.tagListItemSubtitleText}>Out!</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default TagListItem
