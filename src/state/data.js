import type { Reducer } from "redux"
import type { Area, Tag } from "../data/types"
import type { DataAction, DataState, Dispatch, State } from "./types"

// ACTIONS
const actions = {
  saveAreas: (areas: Area[]) => {
    return (dispatch: Dispatch) => {
      // TODO: Handle new and updated areas differently
      dispatch({ type: "tag/data/AREAS_LOADED", payload: areas })
      dispatch({ type: "tag/area/LOADED", payload: areas })
    }
  },

  saveTags: (tags: Tag[]) => {
    return (dispatch: Dispatch) => {
      // TODO: Handle new and updated tags differently
      dispatch({ type: "tag/data/TAGS_LOADED", payload: tags })
      dispatch({ type: "tag/tag/LOADED", payload: tags })
    }
  }
}

const initialState = {
  areas: {},
  tags: {}
}

// SELECTORS
const selectors = {
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
    case "tag/data/AREAS_LOADED":
      return addAreasToStore(state, action.payload)
    case "tag/data/TAGS_LOADED":
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
