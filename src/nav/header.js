// @flow
import React from "react"
import SaveNewAreaButton from "../ui/SaveNewAreaButton"
import DrawerButton from "../ui/DrawerButton"
import CancelButton from "../ui/CancelButton"
import styles from "../styles"
import type { Element } from "react"
import type { NavigationScreenProp } from "react-navigation"
import type { MapMode } from "../state/types"

const headerTitle = (navigation: NavigationScreenProp<*>): string => {
  const defaultMapTitle = "Map"
  const defaultTagsTitle = "Tags"
  const defaultAreasTitle = "Areas"

  const { routeName, params } = navigation.state

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

const headerLeft = (navigation: NavigationScreenProp<*>): ?Element<*> => {
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
                  navigation.dispatch({ type: "tag/map/CANCEL_NEW_AREA" })
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

const headerRight = (navigation: NavigationScreenProp<*>): ?Element<*> => {
  const { routeName, params } = navigation.state
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
