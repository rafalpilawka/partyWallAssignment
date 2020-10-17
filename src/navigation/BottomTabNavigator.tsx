import {MaterialCommunityIcons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from 'react-native-paper';
import Screens from 'src/navigation/Screens';
import * as React from 'react';
import LoginScreen from 'src/screens/authorization/LoginScreen';
import MainScreen from 'src/screens/main/MainScreen';

import {
  BottomTabParamList,
  TabOneParamList,
  TabTwoParamList,
} from 'src/navigation/types';

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
        component={LoginScreen}
        options={{
          tabBarIcon: ({color}) => (
            <TabBarIcon name="cup-water" color={color} />
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

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={LoginScreen}
        options={{headerTitle: 'Tab One Title'}}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={LoginScreen}
        options={{headerTitle: 'Tab Two Title'}}
      />
    </TabTwoStack.Navigator>
  );
}
