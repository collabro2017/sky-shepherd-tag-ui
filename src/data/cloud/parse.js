import { AsyncStorage } from "react-native"
import Parse from "parse/react-native"

// Consider different settings for development/staging/production
import { PARSE_APPLICATION_ID, PARSE_SERVER_URL } from "./env-production"
import type { Backend } from "./types"

Parse.setAsyncStorage(AsyncStorage)
Parse.initialize(PARSE_APPLICATION_ID)
Parse.serverURL = PARSE_SERVER_URL

const getAreas = () => {
  return Parse.Cloud.run("getBoundariesForUser", {})
}

const getTags = () => {}

const ParseBackend: Backend = {
  getAreas,
  getTags
}

export default ParseBackend
