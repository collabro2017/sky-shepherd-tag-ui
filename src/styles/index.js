import { StyleSheet } from "react-native"

export const colors = {
  logoGray: "#505050"
}

const navigationBar = {
  width: "100%",
  height: 44,
  backgroundColor: colors.logoGray
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
  navigationBarAndroid: { ...navigationBar },
  navigationBarIos: { ...navigationBar, height: 64 },
  drawer: {
    flex: 1
  },
  drawerHeader: {
    backgroundColor: "#333333",
    height: 100
  }
})

export default styles
