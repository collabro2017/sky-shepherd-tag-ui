import React, { ScrollView, View } from "react"
import { DrawerItems, DrawerNavigator, SafeAreaView } from "react-navigation"
import Home from "./Home"
import styles from "../styles"

const DrawerContent = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.drawer}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <View style={styles.drawerHeader} />
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
)

const Drawer = DrawerNavigator(
  {
    Map: {
      screen: Home
    }
  }
  // TODO: Get drawer styling to work. Adding this options object causes the routes to go null
  // {
  // contentComponent: DrawerContent,
  // drawerWidth: "80%"
  //}
)

export default Drawer
