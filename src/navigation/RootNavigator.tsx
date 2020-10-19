import React, {ReactElement} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {setTopLevelNavigator} from 'src/navigation/topLevelNavigator';
import {RootStackParamList} from 'src/navigation/types';
import {DrawerNavigator} from 'src/navigation/DrawerNavigator';
import AuthStack from 'src/navigation/AuthorizationStack';
import Screens from 'src/navigation/Screens';
import ActivityOverlayComponent from 'src/components/ActivityOverlay/ActivityOverlay';
import {useSelector} from 'react-redux';
import {selectLoading} from 'src/store/items/items.selector';
import {selectLoginLoading, selectUser} from 'src/store/user/user.selector';

const Navigation = (): ReactElement => {
  return (
    <NavigationContainer
      ref={(navigatorRef: any) => {
        setTopLevelNavigator(navigatorRef);
      }}>
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
      {(loadingAuth || loadingItems) && <ActivityOverlayComponent />}
    </>
  );
};

export default Navigation;
