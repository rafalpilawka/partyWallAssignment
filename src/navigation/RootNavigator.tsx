import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { ReactElement } from "react";
import { ColorSchemeName } from "react-native";
import { RootStackParamList } from "src/navigation/types";
import BottomTabNavigator from "src/navigation/BottomTabNavigator";
import LinkingConfiguration from "config/LinkingConfiguration";
import AuthStack from "src/navigation/AuthorizationStack";

export default function Navigation({
  colorScheme
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator(): ReactElement {
  const [user, setUser] = React.useState(false);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user
        ? <Stack.Screen name="Authorization" component={AuthStack} />
        : <Stack.Screen name="Main" component={BottomTabNavigator} />}
    </Stack.Navigator>
  );
}
