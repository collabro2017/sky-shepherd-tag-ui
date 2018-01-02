import Drawer from "../../ui/Drawer"

// REDUCERS
const initialNavState = Drawer.router.getStateForAction(
  Drawer.router.getActionForPathAndParams("Map")
)

const reducer = (state = initialNavState, action) => {
  const nextState = Drawer.router.getStateForAction(action, state)
  return nextState || state
}

// INTERFACE
export default reducer
