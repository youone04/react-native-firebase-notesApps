import React ,{useEffect} from 'react'
import { Provider} from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/config/redux/store';
import Home from './src/container/Home';
import { createStackNavigator } from '@react-navigation/stack';
import TambahData from './src/container/TambahNotes';
import UpdateDataNotes from './src/container/UpdateDataNotes';
import Login from './src/container/Login';
import Registrasi from './src/container/Registrasi';
import SplashScreen from './src/components/SplashScreen';
import SinggleCatatan from './src/container/SinggleCatatan';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);
import NetInfo from "@react-native-community/netinfo";
import Snackbar from 'react-native-snackbar';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    NetInfo.addEventListener(state => {
      if(!state.isConnected){
        Snackbar.show({
            text: 'Tidak Ada Koneksi Internet!',
            duration: Snackbar.LENGTH_INDEFINITE,
            backgroundColor:'red',
            
          })
      }else{
        Snackbar.show({
            text: 'Internet Terhubung!',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor:'green',
            
          })
      }
  });
  },[])

  return (
    <Provider store={store}>
       <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen 
              name="splash" 
              component={SplashScreen} 
              options={{headerShown: false}}
              />
        <Stack.Screen 
              name="halamanLogin" 
              component={Login} 
              options={{headerShown: false}}
              />
          <Stack.Screen 
              name="halamanutama" 
              component={Home} 
              options={{headerShown: false}}
              />
           <Stack.Screen 
              name="tambahData" 
              component={TambahData} 
              options={{headerShown: true ,title: 'Tambah Data'}}
              />
            <Stack.Screen 
              name="updateData" 
              component={UpdateDataNotes} 
              options={{headerShown: true , title: 'Update Data'}}
              />
              <Stack.Screen 
              name="registrasi" 
              component={Registrasi} 
              options={{headerShown: false}}
              />
              <Stack.Screen 
              name="detailcatatan" 
              component={SinggleCatatan} 
              options={{headerShown: false}}
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