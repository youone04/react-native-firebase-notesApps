import React from 'react'
// import Router from './src/router';
// import {Platform} from 'react-native';
//import the list component that will fetch the data.
//import provider to connect component to redux store.
import { Provider} from 'react-redux';
//import your store to connect your component.
import { NavigationContainer } from '@react-navigation/native';
import store from './src/config/redux/store';
import Home from './src/container/Home';
import { createStackNavigator } from '@react-navigation/stack';
import TambahData from './src/container/TambahNotes';
const Stack = createStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
       <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
              name="halamanutama" 
              component={Home} 
              options={{headerShown: false}}
              />
           <Stack.Screen 
              name="tambahData" 
              component={TambahData} 
              options={{headerShown: true}}
              />
        </Stack.Navigator>
       </NavigationContainer>
    </Provider>
  )
}

export default App;

// watchman watch-del-all
// rm -rf node_modules and run yarn install
// yarn start --reset-cache
// rm -rf /tmp/metro-*