import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import * as React from 'react';
import Main from '../screens/Main';
import Join from '../screens/Join';
import Logout from '../screens/Logout';
import Login from '../screens/Login';
import Check from '../screens/Check';
import Complete from '../screens/Complete';
import Start from '../screens/Start';
import Push from '../screens/Push';
import StateBody from '../screens/StateBody';
import CalenderScreen from '../screens/CalenderScreen';
import Terms from '../screens/Terms';
import CheckTap from '../screens/CheckTap';

// const Drow = createDrawerNavigator();
const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Main';

export default function StackNav({ navigation, route }) {
  
  return (
    <Stack.Navigator 
      initialRouteName={INITIAL_ROUTE_NAME} 
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
    >
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          title: 'main',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="Login" 
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Join"
        component={Join}
        options={{
          title: '회원가입',
          headerTitleAlign:"center"
        }}
      />
      <Stack.Screen
        name="Complete"
        component={Complete}
        options={{
          title: "설문에 응해주셔서 감사합니다!",
          headerTitleAlign:"center",
          headerLeft:null
        }}
      />
      <Stack.Screen
        name="Logout"
        component={Logout}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Start"
        component={Start}
        options={{
          title: "설문의 목적 및 목표 소개",
          headerTitleAlign:"center",
          headerLeft:null
         
        }}
      />
      <Stack.Screen
        name="StateBody"
        component={StateBody}
        options={{
          title: "몸 상태",
          headerTitleAlign:"center",
        }}
      />
      <Stack.Screen
        name="CalenderScreen"
        component={CalenderScreen}
        options={{
          title: "달력",
          headerTitleAlign:"center",
        }}
      />
      <Stack.Screen
        name="CheckTap"
        component={CheckTap}
        options={{
          title: "증상체크",
          headerTitleAlign:"center",
        }}
      />
      <Stack.Screen
        name="Push"
        component={Push}
        options={{
          title: "알림",
          headerTitleAlign:"center",
        }}
      />
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{
          title: "가입약관",
          headerTitleAlign:"center",
        }}
      />
      <Stack.Screen name="Ckeck1" component={Check} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Ckeck2" component={Check} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Ckeck3" component={Check} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Ckeck4" component={Check} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Ckeck5" component={Check} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Ckeck6" component={Check} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Ckeck7" component={Check} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Ckeck8" component={Check} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Ckeck9" component={Check} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Ckeck10" component={Check} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Ckeck11" component={Check} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Ckeck12" component={Check} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Ckeck13" component={Check} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Ckeck14" component={Check} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Ckeck15" component={Check} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Ckeck16" component={Check} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Ckeck17" component={Check} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Ckeck18" component={Check} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Ckeck19" component={Check} options={{headerTitleAlign:"center"}}/>
      <Stack.Screen name="Ckeck20" component={Check} options={{headerTitleAlign:"center"}}/>
    </Stack.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'How to get started';
    case 'Links':
      return 'Links to learn more';
  }
}
