// @flow
import React from "react"
import { Text, View, TouchableOpacity } from "react-native"
import type { Area } from "../../data/types"
import styles from "../../styles"

type Props = {
  area: Area,
  onPress: (area: Area) => typeof undefined
}

const AreaListItem = ({ area, onPress }: Props) => {
  const onPressThis = () => {
    onPress(area)
  }
  return (
    <TouchableOpacity onPress={onPressThis}>
      <View style={styles.listItem}>
        <Text style={styles.listItemText}>{area.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default AreaListItem
