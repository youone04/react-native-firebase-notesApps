import React,{Component} from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import Home from '../container/Home'
import {Platform} from 'react-native';
//import the list component that will fetch the data.
//import provider to connect component to redux store.
import { Provider} from 'react-redux';
//import your store to connect your component.
import store from '../config/redux/index';
// const Stack = createStackNavigator();

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
      'Double tap R on your keyboard to reload,\n' +
      'Shake or press menu button for dev menu',
  });
export default class Router extends Component{
    render() {
      return <Provider store={store}>
                <Home />
              </Provider>
    }
  }
