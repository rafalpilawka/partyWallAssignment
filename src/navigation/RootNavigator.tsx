import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ActivityOverlayComponent from 'src/components/ActivityOverlay/ActivityOverlay';
import Screens from 'src/navigation/Screens';
import React, {ReactElement} from 'react';
import {useSelector} from 'react-redux';
import {RootStackParamList} from 'src/navigation/types';
import BottomTabNavigator from 'src/navigation/BottomTabNavigator';
import LinkingConfiguration from 'src/config/LinkingConfiguration';
import AuthStack from 'src/navigation/AuthorizationStack';
import {selectLoginLoading, selectUser} from 'src/store/user/user.selector';

const Navigation = (): ReactElement => {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = (): ReactElement => {
  const loading = useSelector(selectLoginLoading);
  const user = useSelector(selectUser);
  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!user ? (
          <Stack.Screen name={Screens.AUTHORIZATION} component={AuthStack} />
        ) : (
          <Stack.Screen name={Screens.HOME} component={BottomTabNavigator} />
        )}
      </Stack.Navigator>
      {loading && <ActivityOverlayComponent />}
    </>
  );
};

export default Navigation;
