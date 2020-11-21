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

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

const rootReducer = combineReducers({
  UserReducer
})

const store =  createStore(rootReducer)

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  if (loading) {
    return (
      <></>
    )
  }

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

    <Provider store={store}>
    <NavigationContainer>
      {user ? (
        <RootNav props={user}></RootNav>
      ) : (
          <Stack.Navigator>
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Registration" component={RegistrationScreen} />
            </>

          </Stack.Navigator>
        )}
    </NavigationContainer>
    </Provider>

  );
}
