// @flow
import console from "console"
import { AsyncStorage, InteractionManager } from "react-native"
import Parse from "parse/react-native"

// Consider different settings for development/staging/production
import { PARSE_APPLICATION_ID, PARSE_SERVER_URL } from "./env-production"
import { PARSE_EMAIL, PARSE_PASSWORD } from "./env-production"
import { Cloud } from "./types"
import type { ThunkAction } from "../../state/types"

Parse.setAsyncStorage(AsyncStorage)
Parse.initialize(PARSE_APPLICATION_ID)
Parse.serverURL = PARSE_SERVER_URL

const logError = (error: any) => console.log(error)

const loadParseQuery = (type: string, query: Parse.Query): ThunkAction => {
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
