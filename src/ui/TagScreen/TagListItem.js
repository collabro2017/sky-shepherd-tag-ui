// @flow
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import { humanDateTime } from "../../utils/format"
import { tagStatusColor } from "../tagDisplay"
import styles from "../../styles"
import type { Area, Tag } from "../../types"

type Props = {
  tag: Tag,
  onPress: Tag => void
}

const areaName = (area: ?Area): string => {
  if (area != null) {
    return area.name
  } else {
    return "Inactive"
  }
}

const TagListItem = ({ tag, onPress }: Props) => {
  const onPressThis = () => {
    onPress(tag)
  }
  return (
    <TouchableOpacity onPress={onPressThis}>
      <View style={styles.tagListItem}>
        <View style={styles.tagListItemIcon}>
          <Icon color={tagStatusColor(tag)} name="tag" size={30} />
        </View>
        <View style={styles.tagListItemTitle}>
          <Text style={styles.tagListItemTitleText}>{tag.name}</Text>
          <Text style={styles.tagListItemSubtitleText}>
            {areaName(tag.area)}
          </Text>
          <Text style={styles.tagListItemTitleLastSeen}>
            Last seen {humanDateTime(tag.updatedAt)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default TagListItem
