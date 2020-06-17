import * as React from 'react';
import { Platform, StatusBar, StyleSheet, Text,View,Vibration,SafeAreaView } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import StackNav from './navigation/StackNav';
import useLinking from './navigation/useLinking';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList,DrawerItem } from '@react-navigation/drawer';

import {createStore} from 'redux';
import DataApp from './reducers';
import {Provider} from 'react-redux';
import Login from './screens/Login';
import SideBar from './navigation/SideBar';

const Drow = createDrawerNavigator();
export function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <SideBar {...props}/>
    </DrawerContentScrollView>
  );
}


export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const store = createStore(DataApp);
  const { getInitialState } = useLinking(containerRef);
  const getPush = notification => {
    Vibration.vibrate();
    console.log(notification);
    console.log(notification.data);
  };
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();
        setInitialNavigationState(await getInitialState());
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {

      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }
    console.log(store.getState());
    loadResourcesAndDataAsync();
    
  }, []);
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Provider store = {store}>
        <SafeAreaView style={styles.container}>
          
          {Platform.OS === 'ios' && 
              <StatusBar backgroundColor="#f5ac4f" translucent={false}/>
          }
          {Platform.OS === 'android' && 
              <StatusBar backgroundColor="#f5ac4f" barStyle="light-content" translucent={false}/>
          }
          <NavigationContainer  >
            <Drow.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
              <Drow.Screen name="Root" component={StackNav}/>     
            </Drow.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  iosstyles:{
    width:"100%",
    height:20,
    backgroundColor:"#f5ac4f"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sbarStyle: {
    backgroundColor:"#fff",
  },
  
});
