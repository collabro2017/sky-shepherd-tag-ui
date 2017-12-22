import Reactotron from "reactotron-react-native"
import { reactotronRedux } from "reactotron-redux"

export default () => {
  Reactotron.configure({ name: "Tag" })
    .useReactNative()
    .use(reactotronRedux())
    .connect()
}
