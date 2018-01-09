// @flow
import React from "react"
import { Text, View } from "react-native"
import type { Area } from "../../data/types"
import styles from "../../styles"

type Props = {
  area: Area
}

const AreaListItem = ({ area }: Props) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{area.title}</Text>
    </View>
  )
}

export default AreaListItem
