import {MaterialCommunityIcons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import normalize from 'react-native-normalize';
import {useTheme} from 'react-native-paper';
import Screens from 'src/navigation/Screens';
import * as React from 'react';
import FoodScreen from 'src/screens/main/FoodScreen';
import DrinkScreen from 'src/screens/main/DrinkScreen';
import AddScreen from 'src/screens/main/AddScreen';

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
        component={FoodScreen}
        options={{
          tabBarIcon: ({color}) => (
            <TabBarIcon name="food-apple" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name={Screens.DRINK}
        component={DrinkScreen}
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
    <MaterialCommunityIcons
      size={normalize(35)}
      style={{marginTop: normalize(5)}}
      {...props}
    />
  );
}
