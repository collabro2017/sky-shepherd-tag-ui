// @flow
import { AsyncStorage, InteractionManager } from "react-native"
import Parse from "parse/react-native"

// Consider different settings for development/staging/production
import { PARSE_APPLICATION_ID, PARSE_SERVER_URL } from "./env-production"
import { PARSE_EMAIL, PARSE_PASSWORD } from "./env-production"

import { dataActions } from "../../state/data"

import type {
  Action,
  Area,
  Cloud,
  Coordinate,
  Dispatch,
  GetState,
  Tag,
  ThunkAction
} from "../../types"

Parse.setAsyncStorage(AsyncStorage)
Parse.initialize(PARSE_APPLICATION_ID)
Parse.serverURL = PARSE_SERVER_URL

const logError = (error: any) => console.log(error)

const loadParseList = (
  query: Object,
  transform: (
    list: Array<Object>,
    dispatch: Dispatch,
    getState: GetState
  ) => void
): ThunkAction => {
  return (dispatch, getState) => {
    return query.find().then((list: Array<Object>) => {
      // We don't want data loading to interfere with smooth animations
      InteractionManager.runAfterInteractions(() => {
        transform(list, dispatch, getState)
      })
    }, logError)
  }
}

// No cloud functions for now. Commented out to prevent warnings
// const runParseCloudFunction = (
//   type: string,
//   func: string,
//   params: { [string]: string | number }
// ): ThunkAction => {
//   return dispatch => {
//     return Parse.Cloud.run(func, params).then(list => {
//       // We don't want data loading to interfere with smooth animations
//       InteractionManager.runAfterInteractions(() => {
//         // Flow can't guarantee {type, list} is a valid action
//         dispatch(({ type, list }: any))
//       })
//     }, logError)
//   }
// }

const ParseArea = Parse.Object.extend("Boundary")
const getAreas = (): ThunkAction => {
  return loadParseList(
    new Parse.Query(ParseArea),
    (list: Array<Object>, dispatch: Dispatch) => {
      const areas = list.map(areaFromParse)
      dispatch(dataActions.saveAreas(areas))
    }
  )
}

// const getDevicesForUser = (): ThunkAction => {
//   return runParseCloudFunction("tag/tag/LOADED_TAGS", "getDevicesForUser", {})
// }

const tagFromParse = (boundary: Object): Tag => {
  return {
    boundaryId: boundary.get("boundaryId"),
    coreId: boundary.get("coreId"),
    id: boundary.id,
    name: tagName(boundary.id),
    position: coordinateFromParse(boundary.get("position")),
    region: boundary.get("region"),
    createdAt: boundary.get("createdAt"),
    updatedAt: boundary.get("updatedAt")
  }
}

// Hack around the fact that ActiveBoundaries don't have names yet.
// Just assign a name to the ActiveBoundaries we know.
const tagName = (id: string): string => {
  switch (id) {
    case "ZZpH27ziVl":
      return "Mausi"
    case "CNBnEesR9Q":
      return "Star"
    default:
      return "Tag"
  }
}

const areaFromParse = (boundary: Object): Area => {
  return {
    centroid: coordinateFromParse(boundary.get("centroid")),
    id: boundary.id,
    identifier: boundary.get("identifier"),
    maxIdx: boundary.get("maxIdx"),
    maxPos: boundary.get("maxPos"),
    minPos: boundary.get("minPos"),
    name: boundary.get("name"),
    points: boundary.get("points"),
    ptCnt: boundary.get("ptCnt"),
    scale: boundary.get("scale"),
    createdAt: boundary.get("createdAt"),
    updatedAt: boundary.get("updatedAt")
  }
}

// Parse GeoPoints can be treated as Coordinates for type purposes
const coordinateFromParse = (geoPoint: Coordinate): Coordinate => {
  return {
    latitude: geoPoint.latitude,
    longitude: geoPoint.longitude
  }
}

const ParseActiveBoundary: Object = Parse.Object.extend("ActiveBoundary")
const activeBoundaryQuery: Object = new Parse.Query(ParseActiveBoundary)
  .exists("updatedAt")
  .ascending("createdAt")

const getActiveBoundaries = (): ThunkAction => {
  return loadParseList(
    activeBoundaryQuery,
    (list: Array<Object>, dispatch: Dispatch) => {
      const tags: Array<Tag> = list.map(tagFromParse)
      dispatch(dataActions.saveTags(tags))
    }
  )
}

const subscribeToAreaUpdates = (): ThunkAction => {
  return dispatch => {
    const subscription = activeBoundaryQuery.subscribe()
    subscription.on("open", () => {
      InteractionManager.runAfterInteractions(() => {
        dispatch({ type: "tag/tag/SUBSCRIBED" })
      })
    })
    subscription.on("create", (parseBoundary: Object) => {
      InteractionManager.runAfterInteractions(() => {
        const tag = tagFromParse(parseBoundary)
        dispatch(({ type: "tag/tag/CREATED", payload: tag }: Action))
      })
    })
    subscription.on("update", (parseBoundary: Object) => {
      InteractionManager.runAfterInteractions(() => {
        const tag = tagFromParse(parseBoundary)
        dispatch(({ type: "tag/tag/UPDATED", payload: tag }: Action))
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
        dispatch(getActiveBoundaries())
        dispatch(subscribeToAreaUpdates())
      })
    }, logError)
  }
}

const ParseBackend: Cloud = {
  authenticate,
  getAreas,
  getActiveBoundaries,
  tagStubs: () => []
}

export default ParseBackend
