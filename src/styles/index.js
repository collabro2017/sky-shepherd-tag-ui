import { StyleSheet } from "react-native"

export const colors = {
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
