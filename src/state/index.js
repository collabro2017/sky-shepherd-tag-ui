// @flow
import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/es/storage"
import thunk from "redux-thunk"
import logger from "redux-logger"
import { composeWithDevTools } from "redux-devtools-extension"
import area, { initialAreaState, areaSelectors } from "./area"
import tag, { initialTagState, tagSelectors } from "./tag"
import map, { initialMapState } from "./map"
import nav, { initialNavState } from "./nav"

import type { Reducer, Store, StoreCreator } from "redux"
import type { Action, Region, State, TagState } from "./types"
import type { AreaState } from "./area"

const rootReducer: Reducer = combineReducers({
  map,
  nav,
  area,
  tag
})

let initialDataState = {
  areas: {},
  tags: {}
}

// TODO: Prefer to load last region from storage instead or current location, if available,
// instead of using a default region
const defaultState: State = {
  data: initialDataState,
  map: initialMapState,
  nav: initialNavState,
  area: initialAreaState,
  tag: initialTagState
}

const persistConfig = {
  key: "root",
  storage
}

const reducer = persistReducer(persistConfig, rootReducer)

// TODO: Use normal compose in production builds
const composeEnhancers = composeWithDevTools || compose
const enhancer = composeEnhancers(applyMiddleware(thunk, logger))

function createTagStore(initialState = {}): StoreCreator {
  const state = { ...defaultState, ...initialState }
  return createStore(reducer, state, enhancer)
}

export type StoreWithPersistor = {
  store: Store,
  persistor: Object
}

function configureStore(): StoreWithPersistor {
  const store = createTagStore()
  const persistor: Object = persistStore(store)
  return { store, persistor }
}

export { configureStore, areaSelectors, tagSelectors }
export type { AreaState, State, TagState }
export type { Action, Region }
