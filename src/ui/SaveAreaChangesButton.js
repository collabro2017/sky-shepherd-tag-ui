// @flow
import React from "react"
import { Alert } from "react-native"
import { connect } from "react-redux"
import { mapSelectors, mapActions } from "../state/map"
import SaveButton from "./SaveButton"
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes"
import type { AreaChanges, Dispatch, State } from "../types"

const mapStateToProps = (state: State, ownProps: Props): Props => {
  return {
    ...ownProps,
    areaChanges: mapSelectors.getAreaChanges(state)
  }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: Props): Props => {
  return {
    ...ownProps,
    onPress: () => {
      // areaChanges not passed into props yet
      Alert.alert(
        "Save not implemented",
        "Pending identifier calculation",
        [{ text: "OK" }],
        { cancelable: false }
      )
      const areaChanges = ownProps.areaChanges
      if (areaChanges != null) {
        dispatch(mapActions.saveAreaChanges(areaChanges))
      }
    }
  }
}

const areaHasEnoughPoints = (area: AreaChanges): boolean =>
  area.coordinates.length >= 3

const areaChangesValid = (areaChanges: AreaChanges): boolean =>
  areaHasEnoughPoints(areaChanges) && areaChanges.name.length > 0

const SaveAreaChangesButton = (props: Props) => {
  return (
    <SaveButton
      disabled={
        props.areaChanges == null || !areaChangesValid(props.areaChanges)
      }
      onPress={props.onPress}
      style={props.style}
    />
  )
}

type Props = {
  areaChanges: ?AreaChanges,
  onPress: () => void,
  style: StyleObj
}

export default connect(mapStateToProps, mapDispatchToProps)(
  SaveAreaChangesButton
)
