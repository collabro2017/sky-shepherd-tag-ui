// @flow
import Promise from "promise"
import { Alert } from "react-native"
import { calculateLongitudeDelta } from "../utils/map"
import { coordinatesFromArea } from "../ui/MapScreen/areaConversion"
import type {
  Area,
  AreaChanges,
  Coordinate,
  Dispatch,
  GetState,
  MapAction,
  MapMode,
  MapRouteParams,
  MapState,
  Region,
  State,
  Tag,
  ThunkAction
} from "../types"

// ACTIONS
const actions = {
  addCoordinateToAreaChanges: (coordinate: Coordinate): MapAction => ({
    type: "tag/map/ADD_COORDINATE_TO_AREA",
    payload: coordinate
  }),

  regionChanged: (region: Region): MapAction => ({
    type: "tag/map/REGION_CHANGED",
    payload: { region }
  }),

  createBoundary: (): MapAction => ({
    type: "tag/map/CREATE_AREA",
    payload: {}
  }),

  changeMode: (params: MapRouteParams): MapAction => ({
    type: "Navigation/NAVIGATE",
    routeName: "map",
    params
  }),

  // TODO: Actually save the changes (replace Promise with an action)
  saveAreaChanges: (areaChanges: AreaChanges): ThunkAction => {
    return (dispatch: Dispatch, getState: GetState) => {
      Promise.resolve({})
        .then((area: Area) => {
          dispatch(actions.changeMode({ area: area, tag: null, mode: "view" }))
        })
        .catch(error => {
          Alert.alert("Error saving area", "", [{ text: "OK" }], {
            cancelable: false
          })
        })
    }
  },

  updateAreaChangesName: (name: string): MapAction => ({
    type: "tag/map/UPDATE_AREA_NAME",
    payload: name
  })
}

// SELECTORS
const selectors = {
  getArea: (state: State): ?Area => state.map.area,
  getLastMode: (state: State): MapMode => state.map.lastMode,
  getLastRegion: (state: State): Region => state.map.lastRegion,
  getMode: (state: State): MapMode => state.map.mode,
  getAreaChanges: (state: State): ?AreaChanges => state.map.areaChanges,
  getTag: (state: State): ?Tag => state.map.tag
}

// REDUCERS
const defaultLatitudeDelta = 0.00922
const defaultRegion: Region = {
  latitude: 44.906005,
  longitude: -93.198442,
  latitudeDelta: defaultLatitudeDelta,
  longitudeDelta: calculateLongitudeDelta(defaultLatitudeDelta)
}

const initialMapState: MapState = {
  area: null,
  lastMode: "view",
  lastRegion: defaultRegion,
  mode: "view",
  areaChanges: null,
  region: null,
  tag: null
}

const nextLastMode = (state: MapState, nextMode: MapMode): MapMode => {
  return nextMode !== state.mode ? state.mode : state.lastMode
}

const saveAreaChangesNextMode = (lastMode: MapMode): MapMode => {
  if (lastMode == "create") {
    return "create:save"
  } else if (lastMode == "edit") {
    return "edit:save"
  } else {
    return lastMode
  }
}

const areaChanges = (area: ?Area): AreaChanges => {
  if (area != null) {
    return {
      name: area.name,
      coordinates: coordinatesFromArea(area)
    }
  } else {
    return {
      name: "",
      coordinates: []
    }
  }
}

const reducer = (
  state: MapState = initialMapState,
  action: MapAction
): MapState => {
  switch (action.type) {
    case "tag/map/REGION_CHANGED":
      return {
        ...state,
        lastRegion: action.payload.region
      }
    case "tag/map/CREATE_AREA":
      return {
        ...state,
        lastMode: state.mode,
        mode: "create"
      }
    case "tag/map/CANCEL_AREA_CHANGES":
      return {
        ...state,
        mode: state.lastMode,
        areaChanges: null
      }
    case "tag/map/SAVE_AREA_CHANGES":
      return {
        ...state,
        lastMode: state.mode,
        mode: saveAreaChangesNextMode(state.mode)
      }
    case "tag/map/ADD_COORDINATE_TO_AREA":
      return {
        ...state,
        areaChanges: {
          ...state.areaChanges,
          coordinates: [
            ...(state.areaChanges != null ? state.areaChanges.coordinates : []),
            action.payload
          ]
        }
      }
    case "tag/map/UPDATE_AREA_NAME":
      return {
        ...state,
        areaChanges: {
          ...state.areaChanges,
          name: action.payload
        }
      }
    case "Navigation/NAVIGATE":
      switch (action.routeName) {
        case "map":
          if (action.params != null && action.params.mode === "create") {
            // Create mode
            const lastMode = nextLastMode(state, "create")
            const changes = areaChanges(null)
            return { ...state, lastMode, mode: "create", areaChanges: changes }
          } else if (action.params != null && action.params.mode === "edit") {
            // Create mode
            const lastMode = nextLastMode(state, "edit")
            const changes = areaChanges(state.area)
            return { ...state, lastMode, mode: "edit", areaChanges: changes }
          } else if (action.params != null && action.params.area != null) {
            // Area was selected to show on the map
            const area = action.params.area
            const mode = action.params.mode || "area"
            const lastMode: MapMode = nextLastMode(state, mode)
            return { ...state, area, lastMode, mode }
          } else if (action.params != null && action.params.tag != null) {
            // Tag was selected to show on the map
            const tag = action.params.tag
            const mode = action.params.mode || "area"
            const lastMode: MapMode = nextLastMode(state, mode)
            return { ...state, tag, lastMode, mode }
          } else if (action.params != null) {
            // Nothing selected, just viewing the map
            const mode = action.params.mode || state.mode
            const lastMode: MapMode = nextLastMode(state, mode)
            return { ...state, lastMode, mode }
          } else {
            return state
          }
        default:
          return state
      }
    default:
      return state
  }
}

// INTERFACE
export { selectors as mapSelectors }
export { actions as mapActions }
export { initialMapState, defaultLatitudeDelta }
export default reducer
