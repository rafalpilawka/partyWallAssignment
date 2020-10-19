import React, {ReactElement} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from 'src/screens/authorization/LoginScreen';
import RegisterScreen from 'src/screens/authorization/RegisterScreen';
import Screens from './Screens';

const Stack = createStackNavigator();

const AuthStack = (): ReactElement => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={Screens.LOGIN} component={LoginScreen} />
      <Stack.Screen name={Screens.REGISTER} component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
