// @flow
import React from "react"
import { Alert } from "react-native"
import { connect } from "react-redux"
import { mapSelectors, mapActions } from "../state/map"
import SaveButton from "./SaveButton"
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes"
import type { Dispatch, NewArea, State } from "../types"

const mapStateToProps = (state: State, ownProps: Props): Props => {
  return {
    ...ownProps,
    newArea: mapSelectors.getNewArea(state)
  }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: Props): Props => {
  return {
    ...ownProps,
    onPress: () => {
      // newArea not passed into props yet
      Alert.alert(
        "Save not implemented",
        "Pending identifier calculation",
        [{ text: "OK" }],
        { cancelable: false }
      )
      const newArea = ownProps.newArea
      console.log({ newArea, props: ownProps })
      if (newArea != null) {
        dispatch(mapActions.saveNewArea(newArea))
      }
    }
  }
}

const areaHasEnoughPoints = (area: NewArea): boolean =>
  area.coordinates.length >= 3

const newAreaValid = (newArea: NewArea): boolean =>
  areaHasEnoughPoints(newArea) && newArea.name.length > 0

const SaveNewAreaButton = (props: Props) => {
  return (
    <SaveButton
      disabled={props.newArea == null || !newAreaValid(props.newArea)}
      onPress={props.onPress}
      style={props.style}
    />
  )
}

type Props = {
  newArea: ?NewArea,
  onPress: () => void,
  style: StyleObj
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveNewAreaButton)
