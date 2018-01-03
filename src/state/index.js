import { createStore, applyMiddleware, compose } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/es/storage"
import thunk from "redux-thunk"
import logger from "redux-logger"
import { composeWithDevTools } from "redux-devtools-extension"
import rootReducer from "./reducers"
import { mapModes } from "../state/reducers/map"
import { calculateLongitudeDelta } from "../utils/map"

const defaultLatitudeDelta = 0.00922
const defaultRegion = {
  latitude: 44.906005,
  longitude: -93.198442,
  latitudeDelta: defaultLatitudeDelta,
  longitudeDelta: calculateLongitudeDelta(defaultLatitudeDelta)
}

// TODO: Prefer to load last region from storage instead or current location, if available,
// instead of using a default region
const defaultState = {
  map: { lastRegion: defaultRegion, mode: mapModes.VIEW_MODE }
}

const persistConfig = {
  key: "root",
  storage
}

const reducer = persistReducer(persistConfig, rootReducer)

// TODO: Use normal compose in production builds
const composeEnhancers = composeWithDevTools || compose
const enhancer = composeEnhancers(applyMiddleware(thunk, logger))

function createTagStore(initialState = {}) {
  const state = { ...defaultState, ...initialState }
  return createStore(reducer, state, enhancer)
}

function configureStore() {
  const store = createTagStore()
  const persistor = persistStore(store)
  return { store, persistor }
}

export { configureStore }
