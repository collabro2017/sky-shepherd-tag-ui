// @flow
import * as React from "react"
import { mapSelectors } from "../state/map"
import SaveNewAreaButton from "../ui/SaveNewAreaButton"
import DrawerButton from "../ui/DrawerButton"
import CancelButton from "../ui/CancelButton"
import styles from "../styles"
import type { NavigationScreenProp } from "react-navigation"
import type { Dispatch, GetState } from "redux-thunk"
import type { MapMode } from "../state/types"

type Params = { [string]: mixed }
const headerTitle = (routeName: string, params: Params): string => {
  const defaultMapTitle = "Map"
  const defaultTagsTitle = "Tags"
  const defaultAreasTitle = "Areas"

  switch (routeName) {
    case "map":
      if (params != null) {
        const mode = mapMode(params.mode)
        switch (mode) {
          case "create":
            return "New area"
          case "area":
            return nameFromParam(params.area, defaultMapTitle)
          case "tag":
            return nameFromParam(params.tag, defaultMapTitle)
          default:
            return defaultMapTitle
        }
      } else {
        return defaultMapTitle
      }
    case "tags":
      return defaultTagsTitle
    case "areas":
      return defaultAreasTitle
    default:
      return ""
  }
}

const mapMode = (param: mixed): MapMode => {
  if (
    typeof param === "string" &&
    (param === "view" ||
      param === "create" ||
      param === "edit" ||
      param === "area" ||
      param === "tag")
  ) {
    return param
  } else {
    return "view"
  }
}

const nameFromParam = (param: mixed, defaultTitle: string): string => {
  if (param != null && typeof param.name === "string") {
    return param.name
  } else {
    return defaultTitle
  }
}

const headerLeft = (navigation: NavigationScreenProp<*>): React.Node => {
  const { routeName, params } = navigation.state
  const drawerButton = <DrawerButton navigation={navigation} />

  switch (routeName) {
    case "map":
      if (params != null) {
        const mode = mapMode(params.mode)
        switch (mode) {
          case "create":
            return (
              <CancelButton
                style={styles.headerButtonLeft}
                onPress={() => {
                  // Flow doesn't like this, but it dispatches fine
                  navigation.dispatch(
                    (_dispatch: Dispatch, getState: GetState) => {
                      _dispatch({ type: "tag/map/CANCEL_NEW_AREA" })
                      _dispatch({
                        type: "Navigation/NAVIGATE",
                        routeName: "map",
                        params: {
                          mode: mapSelectors.getLastMode(getState())
                        }
                      })
                    }
                  )
                }}
              />
            )
          default:
            return drawerButton
        }
      } else {
        return drawerButton
      }
    default:
      return drawerButton
  }
}

const headerRight = (routeName: string, params: Params): ?React.Node => {
  switch (routeName) {
    case "map":
      if (params != null) {
        const mode = mapMode(params.mode)
        switch (mode) {
          case "create":
            return <SaveNewAreaButton style={styles.headerButtonRight} />
          default:
            return null
        }
      } else {
        return null
      }
    default:
      return null
  }
}

export { headerTitle, headerRight, headerLeft }
