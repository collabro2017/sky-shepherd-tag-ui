// @flow
import console from "console"
import { AsyncStorage, InteractionManager } from "react-native"
import Parse from "parse/react-native"

// Consider different settings for development/staging/production
import { PARSE_APPLICATION_ID, PARSE_SERVER_URL } from "./env-production"
import { PARSE_EMAIL, PARSE_PASSWORD } from "./env-production"

import { Cloud, ActiveBoundary, Coordinate } from "./types"
import type { Action, ThunkAction } from "../../state/types"

Parse.setAsyncStorage(AsyncStorage)
Parse.initialize(PARSE_APPLICATION_ID)
Parse.serverURL = PARSE_SERVER_URL

const logError = (error: any) => console.log(error)

const loadParseQuery = (type: string, query: Object): ThunkAction => {
  return dispatch => {
    return query.find(list => {
      // We don't want data loading to interfere with smooth animations
      InteractionManager.runAfterInteractions(() => {
        // Flow can't guarantee {type, list} is a valid action
        dispatch(({ type, list }: any))
      })
    }, logError)
  }
}

const runParseCloudFunction = (
  type: string,
  func: string,
  params: { [string]: string | number }
): ThunkAction => {
  return dispatch => {
    return Parse.Cloud.run(func, params).then(list => {
      // We don't want data loading to interfere with smooth animations
      InteractionManager.runAfterInteractions(() => {
        // Flow can't guarantee {type, list} is a valid action
        dispatch(({ type, list }: any))
      })
    }, logError)
  }
}

const ParseArea = Parse.Object.extend("Boundary")
const getAreas = (): ThunkAction => {
  return loadParseQuery("tag/area/LOADED_AREAS", new Parse.Query(ParseArea))
}

const getTags = (): ThunkAction => {
  return runParseCloudFunction("tag/tag/LOADED_TAGS", "getDevicesForUser", {})
}

const coordinateFromParse = (point: Object): Coordinate => {
  return {
    latitude: point.get("latitude"),
    longitude: point.get("longitude")
  }
}

const activeBoundaryFromParse = (boundary: Object): ActiveBoundary => {
  return {
    objectId: boundary.get("objectId"),
    createdAt: boundary.get("createdAt"),
    updatedAt: boundary.get("updatedAt"),
    position: coordinateFromParseGeoPoint(boundary.get("position")),
    region: boundary.get("region"),
    coreId: boundary.get("coreId"),
    boundaryId: boundary.get("boundaryId")
  }
}

const ParseActiveBoundary: Object = Parse.Object.extend("ActiveBoundary")
const subscribeToAreaUpdates = (): ThunkAction => {
  const query = new Parse.Query(ParseActiveBoundary)
    .exists("updatedAt")
    .ascending("createdAt")
  return dispatch => {
    const subscription = query.subscribe()
    subscription.on("open", () => {
      InteractionManager.runAfterInteractions(() => {
        dispatch({ type: "tag/activeBoundary/SUBSCRIBED" })
      })
    })
    subscription.on("create", (parseBoundary: Object) => {
      InteractionManager.runAfterInteractions(() => {
        const boundary = activeBoundaryFromParse(parseBoundary)
        dispatch(
          ({ type: "tag/activeBoundary/CREATED", payload: boundary }: Action)
        )
      })
    })
    subscription.on("update", (parseBoundary: Object) => {
      InteractionManager.runAfterInteractions(() => {
        const boundary = activeBoundaryFromParse(parseBoundary)
        dispatch(
          ({ type: "tag/activeBoundary/UPDATED", payload: boundary }: Action)
        )
      })
    })
  }
}

const authenticate = (): ThunkAction => {
  const type = "tag/auth/LOGGED_IN"
  return dispatch => {
    return Parse.User.logIn(PARSE_EMAIL, PARSE_PASSWORD).then(user => {
      // We don't want data loading to interfere with smooth animations
      InteractionManager.runAfterInteractions(() => {
        // Flow can't guarantee {type, list} is a valid action
        dispatch(({ type, user }: any))
        dispatch(getAreas())
        dispatch(getTags())
        dispatch(subscribeToAreaUpdates())
      })
    }, logError)
  }
}

const ParseBackend: Cloud = {
  areaStubs: () => [],
  tagStubs: () => [],
  areaFromJson: () => null,
  authenticate,
  getAreas,
  getTags
}

export default ParseBackend
