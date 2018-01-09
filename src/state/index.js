// @flow
import { createStore, applyMiddleware, compose } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/es/storage"
import thunk from "redux-thunk"
import logger from "redux-logger"
import { composeWithDevTools } from "redux-devtools-extension"
import { calculateLongitudeDelta } from "../utils/map"
import map, { mapModes, mapTypes } from "./map"
import nav, { initialNavState } from "./nav"

import type { Reducer, Store, StoreCreator } from "redux"

import { combineReducers } from "redux"

const rootReducer: Reducer = combineReducers({
  map,
  nav
})

type Region = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number
}

export type State = {
  map: {
    lastRegion: Region,
    mode: mapTypes.MapMode
  },
  nav: ?Object
}

type StoreWithPersistor = {
  store: Store,
  persistor: Object
}

const defaultLatitudeDelta = 0.00922
const defaultRegion: Region = {
  latitude: 44.906005,
  longitude: -93.198442,
  latitudeDelta: defaultLatitudeDelta,
  longitudeDelta: calculateLongitudeDelta(defaultLatitudeDelta)
}

// TODO: Prefer to load last region from storage instead or current location, if available,
// instead of using a default region
const viewMode: mapTypes.MapMode = mapModes.VIEW_MODE

const defaultState: State = {
  map: { lastRegion: defaultRegion, mode: viewMode },
  nav: initialNavState
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

function configureStore(): StoreWithPersistor {
  const store = createTagStore()
  const persistor: Object = persistStore(store)
  return { store, persistor }
}

export { configureStore }
