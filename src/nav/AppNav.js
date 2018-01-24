import React from "react"
import { DrawerNavigator, StackNavigator } from "react-navigation"
import AreaScreen from "../ui/AreaScreen"
import MapScreen from "../ui/MapScreen"
import TagScreen from "../ui/TagScreen"
import DrawerButton from "../ui/DrawerButton"
import styles, { colors } from "../styles"

const drawerButton = navigation => {
  return <DrawerButton navigation={navigation} />
}

// Each item in the drawer needs its own stack, to show the
// navigation bar, title, and menu button
const drawerItemStackOptions = ({ title }) => {
  return {
    headerMode: "float",
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: drawerButton(navigation),
        headerStyle: styles.navigationHeader,
        headerTintColor: colors.white,
        title: title
      }
    }
  }
}

// TODO: Add custom DrawerContent
const DrawerNav = DrawerNavigator({
  map: {
    screen: MapScreen
  },
  areas: {
    screen: AreaScreen,
    navigationOptions: {
      title: "Areas",
      headerTitle: "Areas"
    }
  },
  tags: {
    screen: TagScreen,
    navigationOptions: {
      title: "Tags",
      headerTitle: "Tags"
    }
  }
})

const PrimaryNav = StackNavigator(
  {
    // TODO: Add login flow
    // Login: {},
    main: {
      screen: DrawerNav
    }
  },
  drawerItemStackOptions({})
)

export default PrimaryNav
