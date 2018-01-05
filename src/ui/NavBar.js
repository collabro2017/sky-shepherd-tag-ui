import React from "react"
import { View } from "react-native"
import styles from "../styles"
import Hamburger from "./Hamburger"

const NavBar = props => {
  return (
    <View {...props} style={styles.navigationBarAndroid}>
      <Hamburger onPress={() => {}} />
    </View>
  )
}

export default NavBar
