/*
import HomeStack from "./HomeStack"
import { DrawerNavigator } from "react-navigation"
// import React, { ScrollView, View } from "react"
// import { DrawerItems, DrawerNavigator, SafeAreaView } from "react-navigation"
// import styles from "../styles"

// Custom drawer component.
// TODO: Passing it to the navigator breaks routes. Seems like a library bug?
// const DrawerContent = props => (
//   <ScrollView>
//     <SafeAreaView
//       style={styles.drawer}
//       forceInset={{ top: "always", horizontal: "never" }}
//     >
//       <View style={styles.drawerHeader} />
//       <DrawerItems {...props} />
//     </SafeAreaView>
//   </ScrollView>
// )

const Drawer = DrawerNavigator(
  {
    Map: {
      screen: HomeStack
    }
  }
  // TODO: Get drawer styling to work. Adding this options object causes the routes to go null
  // {
  // contentComponent: DrawerContent,
  // drawerWidth: "80%"
  //}
)

export default Drawer
*/
