import React from "react"
import { Text, TextInput, View } from "react-native"
import styles from "../styles"

export default function InputBar(props: Props) {
  return (
    <View style={styles.inputBar}>
      <Text style={styles.inputBarLabel}>{props.label}</Text>
      <TextInput
        style={styles.inputBarTextField}
        onChangeText={props.onChangeText}
        value={props.value}
      />
    </View>
  )
}

InputBar.defaultProps = {
  title: "Name",
  onChangeText: () => {}
}

type Props = {
  label: string,
  onChangeText: string => void,
  value: string
}
