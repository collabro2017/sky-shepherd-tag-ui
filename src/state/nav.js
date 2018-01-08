import AppNav from "../nav/AppNav"
import { NavigationActions } from "react-navigation"

// TYPES
const createType = name => `tag/nav/${name}`
const types = {
  TOGGLE_DRAWER: createType("TOGGLE_DRAWER")
}

// ACTIONS
const toggleDrawer = () => ({ type: types.TOGGLE_DRAWER })
const actions = {
  toggleDrawer
}

// REDUCERS

// Init the main router. See
//   https://github.com/react-navigation/react-navigation/issues/1919
const router = AppNav.router
const initialNavState = router.getStateForAction(NavigationActions.init())

const reducer = (state = initialNavState, action) => {
  // Only handle navigation actions
  if (action.type === "Navigation/NAVIGATE") {
    const nextState = router.getStateForAction(action, state)
    return nextState || state
  } else {
    return state
  }
}

// INTERFACE
export default reducer
export { actions as navActions }
export { initialNavState }
