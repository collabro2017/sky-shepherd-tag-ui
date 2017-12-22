import console from "reactotron-react-native"

// TYPES
const createType = name => `tag/map/${name}`
const types = {
  MOVE_TO_LOCATION: createType("MOVE_TO_LOCATION"),
  CREATE_BOUNDARY: createType("CREATE_BOUNDARY")
}

// ACTIONS
const moveToLocationAction = location => {
  return { type: types.MOVE_TO_LOCATION, payload: { location } }
}

const createBoundaryAction = () => {
  return { type: types.CREATE_BOUNDARY, payload: {} }
}

// OPERATIONS
const moveToLocation = moveToLocationAction
const createBoundary = createBoundaryAction

const operations = { moveToLocation, createBoundary }

// SELECTORS
const selectors = {
  getRegion: ({ map }) => map.region,
  getMode: ({ map }) => map.mode
}

// REDUCERS
const updateRegion = (region, newLocation) => {
  return {
    ...region,
    latitude: newLocation.latitude,
    longitude: newLocation.longitude
  }
}

const modes = {
  VIEW_MODE: "view",
  CREATE_MODE: "create"
}

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case types.MOVE_TO_LOCATION:
      return {
        ...state,
        region: updateRegion(state.maps.region, payload.location)
      }
    case types.CREATE_BOUNDARY:
      return {
        ...state,
        mode: modes.CREATE_MODE
      }
    default:
      return state
  }
}

// INTERFACE
export { selectors as mapSelectors }
export { operations as mapOperations }
export { modes as mapModes }
export default reducer
