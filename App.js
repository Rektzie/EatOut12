import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { firebase } from './src/firebase/config'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'
import { decode, encode } from 'base-64'
import StackNav from './src/navigation/Stack'
import TabNavigation from './src/navigation/TabNavigation'
import { View } from 'react-native';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import UserReducer from './src/store/reducer/user.reducer'
import RootNav from "./src/navigation/RootNav"

// hihi its mona
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

// const rootReducer = combineReducers({
//   UserReducer
// })

// const store =  createStore(rootReducer)

export default function App() {

  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     {user ? (
    //       <Stack.Screen name="Home">
    //         {props => <HomeScreen {...props} extraData={user} />}
    //       </Stack.Screen>
    //     ) : (
    //         <>
    //           <Stack.Screen name="Login" component={LoginScreen} />
    //           <Stack.Screen name="Registration" component={RegistrationScreen} />
    //         </>
    //       )}
    //   </Stack.Navigator>
    // </NavigationContainer>

    // <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode="none">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Main" component={RootNav} />
      </Stack.Navigator>
    </NavigationContainer>
    // </Provider>

  );
}
