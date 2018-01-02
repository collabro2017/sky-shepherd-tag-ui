import { DrawerNavigator } from "react-navigation"
import Home from "./Home"

const Drawer = DrawerNavigator({
  Map: {
    screen: Home
  }
})

export default Drawer
