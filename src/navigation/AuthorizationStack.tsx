import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from 'src/screens/authorization/LoginScreen';
import RegisterScreen from 'src/screens/authorization/RegisterScreen';
import Screens from './Screens';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screens.LOGIN}
        component={LoginScreen}
        options={{title: Screens.LOGIN, headerLeft: undefined}}
      />
      <Stack.Screen
        name={Screens.REGISTER}
        component={RegisterScreen}
        options={{title: Screens.REGISTER, headerLeft: () => <></>}}
      />
    </Stack.Navigator>
  );
}
