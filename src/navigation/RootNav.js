import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import Home from "../screens/Home";
import Chat from "../screens/Chat"
import Post from "../screens/Post";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { createStackNavigator } from "react-navigation-stack"
import DetailImageScreen from "../screens/detailImageScreen"
import Profile from "../screens/profile"


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



const TabNavigator = createBottomTabNavigator({
  Spring: {
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
    screen: Chat,
    navigationOptions: {
      tabBarIcon: () => {
        return <AntDesign name="swap" size={24} color={"black"} />;
      },
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarIcon: () => {
        return <AntDesign name="swap" size={24} color={"black"} />;
      },
    },
  },
});

export default createAppContainer(TabNavigator);
