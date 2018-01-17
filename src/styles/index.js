// @flow
import { StyleSheet } from "react-native"

const lightGray = "#aaaaaa"
const logoBlue = "#00A9E0"
const logoGray = "#505050"
const statusBlue = "#0074D9"
const statusGreen = "#2ECC40"
const statusRed = "#FF4136"
const statusYellow = "#FFDC00"
const white = "#ffffff"

// Precomputed alpha values in hex
const alpha50 = "80"

const colorWithAlpha = (color: string, alpha: string): string =>
  `${color}${alpha}`

export const colors = {
  lightGray,
  logoBlue,
  logoGray,
  statusBlue,
  statusGreen,
  statusGreenAlpha50: colorWithAlpha(statusGreen, alpha50),
  statusRed,
  statusYellow,
  white
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  listItem: {
    padding: 16
  },
  listItemText: {
    fontSize: 20
  },
  listItemSeparator: {
    backgroundColor: colors.lightGray,
    height: 1,
    width: "100%"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  map: {
    flex: 1
  },
  drawerButton: {
    paddingLeft: 12
  },
  navigationHeader: {
    backgroundColor: colors.logoGray
  },
  drawerHeader: {
    backgroundColor: "#333333",
    height: 100
  }
})

export default styles
