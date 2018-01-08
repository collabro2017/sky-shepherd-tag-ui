import React from "react"
import { DrawerNavigator, StackNavigator } from "react-navigation"
import MapScreen from "../ui/MapScreen"
import DrawerButton from "../ui/DrawerButton"
import styles, { colors } from "../styles"

const drawerButton = navigation => {
  return <DrawerButton navigation={navigation} />
}

const MapStack = StackNavigator(
  {
    map: {
      screen: MapScreen
    }
  },
  {
    headerMode: "float",
    navigationOptions: ({ navigation }) => ({
      headerLeft: drawerButton(navigation),
      headerStyle: styles.navigationHeader,
      headerTintColor: colors.white,
      title: "Map"
    })
  }
)

// TODO: Add custom DrawerContent
const DrawerNav = DrawerNavigator({
  mapStack: {
    screen: MapStack
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
