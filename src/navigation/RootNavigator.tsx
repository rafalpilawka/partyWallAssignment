import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Screens from 'src/navigation/Screens';
import {Store} from 'src/contexts/contexts';
import React, {ReactElement} from 'react';
import {RootStackParamList} from 'src/navigation/types';
import BottomTabNavigator from 'src/navigation/BottomTabNavigator';
import LinkingConfiguration from 'src/config/LinkingConfiguration';
import AuthStack from 'src/navigation/AuthorizationStack';

const Navigation = (): ReactElement => {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
};

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator(): ReactElement {
  const {user} = React.useContext(Store);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!user ? (
        <Stack.Screen name={Screens.AUTHORIZATION} component={AuthStack} />
      ) : (
        <Stack.Screen name={Screens.HOME} component={BottomTabNavigator} />
      )}
    </Stack.Navigator>
  );
}

export default Navigation;
