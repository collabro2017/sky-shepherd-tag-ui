import React from "react"
import { DrawerNavigator, StackNavigator } from "react-navigation"
import AreasScreen from "../ui/AreasScreen"
import MapScreen from "../ui/MapScreen"
import TagsScreen from "../ui/TagsScreen"
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
        title: title || ""
      }
    }
  }
}

const MapStack = StackNavigator(
  {
    map: {
      screen: MapScreen
    }
  },
  drawerItemStackOptions({ title: "Map" })
)

const AreasStack = StackNavigator(
  {
    areas: {
      screen: AreasScreen
    }
  },
  drawerItemStackOptions({ title: "Areas" })
)

const TagsStack = StackNavigator(
  {
    tags: {
      screen: TagsScreen
    }
  },
  drawerItemStackOptions({ title: "Tags" })
)

// TODO: Add custom DrawerContent
const DrawerNav = DrawerNavigator({
  mapStack: {
    screen: MapStack
  },
  areasStack: {
    screen: AreasStack
  },
  tags: {
    screen: TagsStack
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
  {
    headerMode: "none"
  }
)

export default PrimaryNav
