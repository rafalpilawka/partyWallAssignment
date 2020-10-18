import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ActivityOverlayComponent from 'src/components/ActivityOverlay/ActivityOverlay';
import {DrawerNavigator} from 'src/navigation/DrawerNavigator';
import Screens from 'src/navigation/Screens';
import React, {ReactElement} from 'react';
import {useSelector} from 'react-redux';
import {RootStackParamList} from 'src/navigation/types';
import AuthStack from 'src/navigation/AuthorizationStack';
import {selectLoading} from 'src/store/items/items.selector';
import {selectLoginLoading, selectUser} from 'src/store/user/user.selector';

const Navigation = (): ReactElement => {
  //TODO ADD REFERENCE TO CURRENT NAVIGATOR AND NAVIGATION SERVICES
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = (): ReactElement => {
  //TODO ADD LOCAL LOADERS
  const loadingAuth = useSelector(selectLoginLoading);
  const loadingItems = useSelector(selectLoading);
  const user = useSelector(selectUser);
  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <Stack.Screen name={Screens.HOME} component={DrawerNavigator} />
        ) : (
          <Stack.Screen name={Screens.AUTHORIZATION} component={AuthStack} />
        )}
      </Stack.Navigator>
      {loadingAuth || (loadingItems && <ActivityOverlayComponent />)}
    </>
  );
};

export default Navigation;
