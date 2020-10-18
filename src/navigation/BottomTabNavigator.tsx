import {MaterialCommunityIcons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from 'react-native-paper';
import Screens from 'src/navigation/Screens';
import * as React from 'react';
import AddScreen from 'src/screens/main/AddScreen';
import FoodScreen from 'src/screens/main/FoodScreen';
import MainScreen from 'src/screens/main/MainScreen';

import {BottomTabParamList} from 'src/navigation/types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const {colors} = useTheme();

  return (
    <BottomTab.Navigator
      initialRouteName={Screens.FOOD}
      tabBarOptions={{activeTintColor: colors.primary}}>
      <BottomTab.Screen
        name={Screens.FOOD}
        component={MainScreen}
        options={{
          tabBarIcon: ({color}) => (
            <TabBarIcon name="food-apple" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name={Screens.DRINK}
        component={FoodScreen}
        options={{
          tabBarIcon: ({color}) => (
            <TabBarIcon name="cup-water" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name={Screens.ADD}
        component={AddScreen}
        options={{
          tabBarIcon: ({color}) => (
            <TabBarIcon name="plus-circle" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {name: string; color: string}) {
  return (
    <MaterialCommunityIcons size={30} style={{marginBottom: -3}} {...props} />
  );
}
