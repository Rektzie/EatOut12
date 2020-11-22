import { createStackNavigator } from "react-navigation-stack"
import { createAppContainer } from "react-navigation"
import { ChatScreen, TestScreen } from '../screens'
import RootNav from "./TabNavigation"
import DetailImageScreen from "../screens/detailImageScreen"
import EditProfileScreen from "../screens/EditProfileScreen"

const Stack = createStackNavigator ({
    Screen1: {
        screen: TestScreen,
        navigationOptions: {
            title: "TestScreen"
        }
    },
    Screen2: {
        screen: RootNav,
  
    },
    Screen3: {
        screen: ChatScreen,
        navigationOptions: {
            title: "ChatScreen"
        }
    },
    // DetailImage: {
    //     screen: DetailImageScreen,
    //     navigationOptions:{
    //         title: "Detail"
    //     }
    // },
    // EditProfile: {
    //     screen: EditProfileScreen,
    //     navigationOptions:{
    //         title: "Edit"
    //     }
    // }
})
export default createAppContainer(Stack)