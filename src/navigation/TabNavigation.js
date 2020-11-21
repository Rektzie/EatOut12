import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { ChatScreen, TestScreen, HomeScreen } from '../screens'
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TabNavigator = createBottomTabNavigator({
  ChatScreen: {
    screen: ChatScreen,
    navigationOptions: {
      tabBarIcon: () => {
        return <AntDesign name="shake" size={24} color={"black"} />;
      },
    },
  },
  TestScreen: {
    screen: TestScreen,
    navigationOptions: {
      tabBarIcon: () => {
        return <AntDesign name="retweet" size={24} color={"black"} />;
      },
    },
  }
});


// const TabNavigator = createBottomTabNavigator()

// function MyTabs() {
//     return (
//         <TabNavigator.Navigator
//             initialRouteName="Home"
//             tabBarOptions={{
//                 activeTintColor: '#e91e63',
//             }}>
//             <TabNavigator.Screen
//                 // props={props.extraData}
//                 name="Home"
//                 component={HomeScreen}
//                 options={{
//                     tabBarLabel: 'Home',
//                     tabBarIcon: ({ color, size }) => (
//                         <AntDesign name="retweet" size={24} color={"black"} />
//                     ),
//                 }}
//             />
//             <TabNavigator.Screen
//                 name="Test"
//                 component={TestScreen}
//                 options={{
//                     tabBarLabel: 'TestScreen',
//                     tabBarIcon: ({ color, size }) => (
//                         <AntDesign name="retweet" size={24} color={"black"} />
//                     ),
//                 }}
//             />
//         </TabNavigator.Navigator>
//     )
// }

// {
//     Spring: {
//         screen: HomeScreen(props.extraData),
//             navigationOptions: {
//             tabBarIcon: () => {
//                 return <AntDesign name="shake" size={24} color={"black"} />;
//             },
//       },
//     },
//     Sequence: {
//         screen: TestScreen,
//             navigationOptions: {
//             tabBarIcon: () => {
//                 return <AntDesign name="retweet" size={24} color={"black"} />;
//             },
//       },
//     }
// });

export default createAppContainer(TabNavigator);
