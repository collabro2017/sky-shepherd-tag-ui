import { DrawerNavigator, StackNavigator } from "react-navigation"
import { headerLeft } from "./header"
import AreaScreen from "../ui/AreaScreen"
import MapScreen from "../ui/MapScreen"
import TagScreen from "../ui/TagScreen"
import styles, { colors } from "../styles"

// Each item in the drawer needs its own stack, to show the
// navigation bar, title, and menu button
const drawerItemStackOptions = ({ title }) => {
  return {
    headerMode: "float",
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: headerLeft(navigation),
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
