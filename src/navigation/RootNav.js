import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import Home from "../screens/Home";
import Chat from "../screens/Chat"
import Homechat from "../screens/Homechat"
import Post from "../screens/Post";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { createStackNavigator } from "react-navigation-stack"
import DetailImageScreen from "../screens/detailImageScreen"
import Profile from "../screens/profile"
import EditProfileScreen from "../screens/EditProfileScreen"
import { Entypo , MaterialCommunityIcons} from '@expo/vector-icons';

const Stack = createStackNavigator ({
  Screen1: {
      screen: Home,
      
  },
 
  DetailImage: {
      screen: DetailImageScreen,
      navigationOptions:{
          title: "Detail"
      }
  }

  
  
}, {defaultNavigationOptions: {
  headerShown : false
}})

const StackEdit = createStackNavigator ({
  Screen1: {
      screen: Profile,
      
  },
 
  EditProfile: {
    screen: EditProfileScreen,
    navigationOptions:{
        title: "Edit"
      }
  }
}, {defaultNavigationOptions: {
  headerShown : false
}})


const chatEdit = createStackNavigator ({
  
  HomeChat: {
      screen: Homechat,
      navigationOptions: {
        title:"Chats",
        headerStyle: {
          backgroundColor: '#006FFF'
        },
        headerTitleStyle: {
          color: 'white'
        }
      }
      
  },

  Chat: {
    screen: Chat,
    navigationOptions: {
      title:"Chats",
      headerStyle: {
        backgroundColor: '#FDD37A'
      },
    }
  }

})



const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: Stack,
    navigationOptions: {
      tabBarIcon: () => {
        return <AntDesign name="shake" size={24} color={"black"} />;
      },
    },
  },
  Post: {
    screen: Post,
    navigationOptions: {
      tabBarIcon: () => {
        return <AntDesign name="retweet" size={24} color={"black"} />;
      },
    },
  },
  Chat: {
    screen: chatEdit,
    navigationOptions: {
      tabBarIcon: () => {
        return <AntDesign name="swap" size={24} color={"black"} />;
      },
    },
  },
  Profile: {
    screen: StackEdit,
    navigationOptions: {
      tabBarIcon: () => {
        return <AntDesign name="swap" size={24} color={"black"} />;
      },
    },
  },
});

export default createAppContainer(TabNavigator);
