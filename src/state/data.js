import type { Reducer } from "redux"
import type {
  Area,
  DataAction,
  DataState,
  Dispatch,
  State,
  Tag
} from "../types"

// ACTIONS
const actions = {
  saveAreas: (areas: Area[]) => {
    return (dispatch: Dispatch) => {
      // TODO: Handle new and updated areas differently
      dispatch({ type: "AREAS_FETCH_SUCCESS", payload: areas })
    }
  },

  saveTags: (tags: Tag[]) => {
    return (dispatch: Dispatch) => {
      // TODO: Handle new and updated tags differently
      dispatch({ type: "TAGS_FETCH_SUCCESS", payload: tags })
    }
  }
}

const initialState = {
  areas: {},
  tags: {}
}

// SELECTORS
const selectors = {
  getArea: (state: State, id: string): ?Area => state.data.areas[id],
  getAreas: (state: State): Area[] => all(state.data.areas),
  getTags: (state: State): Tag[] => all(state.data.tags)
}

const all = function<T>(keyValue: { [key: string]: T }): [T] {
  return Object.values(keyValue)
}

const reducer: Reducer<DataState, DataAction> = (
  state: DataState = initialState,
  action: DataAction
): DataState => {
  switch (action.type) {
    case "AREAS_FETCH_SUCCESS":
      return addAreasToStore(state, action.payload)
    case "TAGS_FETCH_SUCCESS":
      return addTagsToStore(state, action.payload)
    default:
      return state
  }
}

const addAreasToStore = (state: DataState, incoming: Area[]): DataState => {
  var areas = state.areas

  incoming.forEach(area => {
    areas[area.id] = area
  })

  return { ...state, areas }
}

const addTagsToStore = (state: DataState, incoming: Tag[]): DataState => {
  var tags = state.tags

  incoming.forEach(tag => {
    tags[tag.id] = tag
  })

  return { ...state, tags }
}

// INTERFACE
export default reducer
export { actions as dataActions }
export { selectors as dataSelectors }
export { initialState as initialDataState }
