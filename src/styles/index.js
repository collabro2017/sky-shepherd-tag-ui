import { StyleSheet } from "react-native"

export const colors = {
  lightGray: "#aaaaaa",
  logoGray: "#505050",
  white: "#ffffff"
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
