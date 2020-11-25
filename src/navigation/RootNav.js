import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from '@react-navigation/stack'
import Home from "../screens/Home";
import Chat from "../screens/Chat"
import Homechat from "../screens/Homechat"
import Post from "../screens/Post";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {StatusBar} from 'react-native';
// import { createStackNavigator } from "react-navigation-stack"
import DetailImageScreen from "../screens/detailImageScreen"
import Profile from "../screens/profile"
import EditProfileScreen from "../screens/EditProfileScreen"
import { Entypo , MaterialCommunityIcons} from '@expo/vector-icons'; 

const Stack = createStackNavigator()
StatusBar.setHidden(false, 'slide');

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Eatout" component={Home} options={{
          headerStyle: {
            backgroundColor: '#FDD37A'
          }
        }} />
        <Stack.Screen name="DetailImage" component={DetailImageScreen} options={{
          headerStyle: {
            backgroundColor: '#FDD37A'
          }
        }}/>
      </Stack.Navigator>
  )
}

const newsFeedStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="NewsFeed" component={Post} options={{
          headerStyle: {
            backgroundColor: '#FDD37A'
          }
        }} />
        <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  )
}

const ChatStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="HistoryChat" component={Homechat} options={{
          headerStyle: {
            backgroundColor: '#FDD37A'
          }
        }}/>
        <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  )
}

const ProfileStack = () => {
    return <Stack.Navigator>
        <Stack.Screen name="Profile" component={Profile} options={{
          headerStyle: {
            backgroundColor: '#F23939',
          },
          headerTitleStyle: {
            color: 'white'
          }
        }}/>
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{
          headerStyle: {
            backgroundColor: '#F23939',
          },
          headerTitleStyle: {
            color: 'white'
          }
        }}/>
    </Stack.Navigator>
}

const Tab = createBottomTabNavigator()
const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} options={{
          tabBarIcon: () => {
            return <Entypo name="home" size={24} color="#707070" />
          },
          tabBarOptions:{
            //other properties
            pressColor: 'red',//for click (ripple) effect color
            style: {
              backgroundColor: '#FDD37A',//color you want to change
            }
        }
      }
      }/>
      <Tab.Screen name="NewsFeed" component={newsFeedStack} options={{
        tabBarIcon: () => {
          return <MaterialCommunityIcons name="food-fork-drink" size={24} color="#707070" />
        },
        tabBarOptions:{
          //other properties
          pressColor: 'red',//for click (ripple) effect color
          style: {
            backgroundColor: '#FDD37A',//color you want to change
          }
      }
      }} />
      <Tab.Screen name="Chat" component={ChatStack} options={{
        tabBarIcon: () => {
          return <Entypo name="chat" size={24} color="#707070" />;
        },
        tabBarOptions:{
          //other properties
          pressColor: 'red',//for click (ripple) effect color
          style: {
            backgroundColor: '#FDD37A',//color you want to change
          }
        }
      }}/>
      <Tab.Screen name="Profile" component={ProfileStack} options={{
          tabBarIcon: () => {
            return <AntDesign name="profile" size={24} color="#707070" />;
          },
          tabBarOptions:{
            //other properties
            pressColor: 'red',//for click (ripple) effect color
            style: {
              backgroundColor: '#FDD37A',//color you want to change
            }
        }
        }}/>
    </Tab.Navigator>
  )
}
// const Stack = createStackNavigator ({
//   Eatout: {
//       screen: Home,
//       navigationOptions: {
//       headerStyle: {
//         backgroundColor: '#FDD37A'
//       },
//     }
//   },
 
//   DetailImage: {
//       screen: DetailImageScreen,
//       navigationOptions:{
//           title: "Detail"
//       },
//       headerStyle: {
//         backgroundColor: '#FDD37A'
//       },
//   }

  
  
// }, {defaultNavigationOptions: {
//   headerShown : true,
// }})

// const StackEdit = createStackNavigator ({
  
//   Profile: {
//       screen: Profile,
//       navigationOptions: {
//         title:"Profile",
//         headerStyle: {
//           backgroundColor: '#E83232'
//         },
//         headerTitleStyle: {
//           color: 'white'
//         }
//       }
//   },


 
//   EditProfile: {
//     screen: EditProfileScreen,
//     navigationOptions: {
//       title:"Edit Profile",
//       headerStyle: {
//         backgroundColor: '#E83232'
//       },
//       headerTitleStyle: {
//         color: 'white'
//       }
//     }
//   }
// })

// const chatEdit = createStackNavigator ({
  
//   HomeChat: {
//       screen: Homechat,
//       navigationOptions: {
//         title:"Chats",
//         headerStyle: {
//           backgroundColor: '#006FFF'
//         },
//         headerTitleStyle: {
//           color: 'white'
//         }
//       }
      
//   },

//   Chat: {
//     screen: Chat,
//     navigationOptions: {
//       title:"Chats",
//       headerStyle: {
//         backgroundColor: '#FDD37A'
//       },
//     }
//   }

// })



// const TabNavigator = createBottomTabNavigator({
//   Home: {
//     screen: HomeStack,
//     navigationOptions: {
//       tabBarIcon: () => {
//         return <Entypo name="home" size={24} color="#707070" />
//       },
//       tabBarOptions:{
//         //other properties
//         pressColor: 'red',//for click (ripple) effect color
//         style: {
//           backgroundColor: '#FDD37A',//color you want to change
//         }
//     }
//    },
//   },
//   NewsFeed: {
//     screen: newsfeedEdit,
//     navigationOptions: {
//       tabBarIcon: () => {
//         return <MaterialCommunityIcons name="food-fork-drink" size={24} color="#707070" />
//       },
//       tabBarOptions:{
//         //other properties
//         pressColor: 'red',//for click (ripple) effect color
//         style: {
//           backgroundColor: '#FDD37A',//color you want to change
//         }
//     }
//     },
    
    
//   },
//   Chat: {
//     screen: chatEdit,
//     navigationOptions: {
//       tabBarIcon: () => {
//         return <Entypo name="chat" size={24} color="#707070" />;
//       },
//       tabBarOptions:{
//         //other properties
//         pressColor: 'red',//for click (ripple) effect color
//         style: {
//           backgroundColor: '#FDD37A',//color you want to change
//         }
//     }
//     },
//   },
//   Profile: {
//     screen: StackEdit,
//     navigationOptions: {
//       tabBarIcon: () => {
//         return <AntDesign name="profile" size={24} color="#707070" />;
//       },
//       tabBarOptions:{
//         //other properties
//         pressColor: 'red',//for click (ripple) effect color
//         style: {
//           backgroundColor: '#FDD37A',//color you want to change
//         }
//     }
//     },
//   },
// });

export default TabNavigator;
