// TYPES
const typePrefix = "tag/map"
const types = { MOVE_TO_LOCATION: `${typePrefix}/MOVE_TO_LOCATION` }

// ACTIONS
const moveToLocationAction = location => {
  return { type: types.MOVE_TO_LOCATION, payload: { location } }
}

// OPERATIONS
const moveToLocationOperation = moveToLocationAction

const operations = {
  moveToLocation: moveToLocationOperation
}

// SELECTORS
const selectors = {
  getRegion: ({ map }) => map.region
}

// REDUCERS
const updateRegion = (region, newLocation) => {
  return {
    ...region,
    latitude: newLocation.latitude,
    longitude: newLocation.longitude
  }
}

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case types.MOVE_TO_LOCATION:
      return {
        ...state,
        map: {
          ...state.maps,
          region: updateRegion(state.maps.region, payload.location)
        }
      }
    default:
      return state
  }
}

// INTERFACE
export { selectors as mapSelectors }
export { operations as mapOperations }
export default reducer
