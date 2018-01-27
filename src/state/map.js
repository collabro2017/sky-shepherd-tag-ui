// @flow
import { calculateLongitudeDelta } from "../utils/map"
import type {
  MapAction,
  MapMode,
  MapRouteParams,
  MapState,
  Region,
  State
} from "./types"
import type { Area, Coordinate, NewArea, Tag } from "../data/types"

// ACTIONS
const actions = {
  addCoordinateToNewArea: (coordinate: Coordinate): MapAction => ({
    type: "tag/map/ADD_COORDINATE_TO_NEW_AREA",
    payload: coordinate
  }),

  regionChanged: (region: Region): MapAction => ({
    type: "tag/map/REGION_CHANGED",
    payload: { region }
  }),

  createBoundary: (): MapAction => ({
    type: "tag/map/CREATE_BOUNDARY",
    payload: {}
  }),

  changeMode: (params: MapRouteParams): MapAction => ({
    type: "Navigation/NAVIGATE",
    routeName: "map",
    params
  }),

  saveNewArea: (newArea: NewArea): MapAction => ({
    type: "tag/map/SAVE_NEW_AREA",
    payload: newArea
  }),

  updateNewAreaName: (name: string): MapAction => ({
    type: "tag/map/UPDATE_NEW_AREA_NAME",
    payload: name
  })
}

// SELECTORS
const selectors = {
  getArea: (state: State): ?Area => state.map.area,
  getLastMode: (state: State): MapMode => state.map.lastMode,
  getLastRegion: (state: State): Region => state.map.lastRegion,
  getMode: (state: State): MapMode => state.map.mode,
  getNewArea: (state: State): ?NewArea => state.map.newArea,
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
  newArea: null,
  region: null,
  tag: null
}

const nextLastMode = (state: MapState, nextMode: MapMode): MapMode => {
  return nextMode !== state.mode ? state.mode : state.lastMode
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
    case "tag/map/CREATE_BOUNDARY":
      return {
        ...state,
        lastMode: state.mode,
        mode: "create"
      }
    case "tag/map/CANCEL_NEW_AREA":
      return {
        ...state,
        newArea: null
      }
    case "tag/map/SAVE_NEW_AREA":
      return {
        ...state,
        lastMode: state.mode,
        mode: "create:save"
      }
    case "tag/map/ADD_COORDINATE_TO_NEW_AREA":
      return {
        ...state,
        newArea: {
          ...state.newArea,
          coordinates: [
            ...(state.newArea != null ? state.newArea.coordinates : []),
            action.payload
          ]
        }
      }
    case "tag/map/UPDATE_NEW_AREA_NAME":
      return {
        ...state,
        newArea: {
          ...state.newArea,
          name: action.payload
        }
      }
    case "Navigation/NAVIGATE":
      switch (action.routeName) {
        case "map":
          if (action.params != null && action.params.mode === "create") {
            // Create mode
            const lastMode = nextLastMode(state, "create")
            const newArea = state.newArea || {
              name: "New area",
              coordinates: []
            }
            return { ...state, lastMode, mode: "create", newArea }
          }
          if (action.params != null && action.params.area != null) {
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
