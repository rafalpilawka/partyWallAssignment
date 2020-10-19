import React, {ReactElement} from 'react';
import {View} from 'react-native';
import {
  DrawerItem,
  DrawerContentScrollView,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {
  Avatar,
  Title,
  Caption,
  Drawer,
  Text,
  Switch,
  Button,
} from 'react-native-paper';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useDispatch, useSelector} from 'react-redux';
import BottomTabNavigator from 'src/navigation/BottomTabNavigator';
import Screens from 'src/navigation/Screens';
import {DrawerStackParamList} from 'src/navigation/types';
import EditScreen from 'src/screens/main/EditScreen';
import {logoutAction} from 'src/store/user/user.actions';
import {selectUser} from 'src/store/user/user.selector';
import {styles} from 'src/navigation/styles';

const DrawerStack = createDrawerNavigator<DrawerStackParamList>();

export const DrawerNavigator = (): ReactElement => {
  return (
    <DrawerStack.Navigator drawerContent={() => <DrawerContent />}>
      <DrawerStack.Screen name={Screens.HOME} component={BottomTabNavigator} />
      <DrawerStack.Screen name={Screens.EDIT} component={EditScreen} />
    </DrawerStack.Navigator>
  );
};

export function DrawerContent(props: any) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const _logoutHandler = () => dispatch(logoutAction());

  const _generateInitials = (name: string, surname: string) =>
    (name.substring(0, 1) + surname.substring(0, 1)).toUpperCase();

  //TODO ADD HANDLER TO USE DARK THEME
  return (
    <>
      {user && (
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              <Avatar.Text
                label={_generateInitials(user.name, user.surname)}
                size={50}
              />
              <Title style={styles.title}>
                {user.name} {user.surname}
              </Title>
              <Caption style={styles.caption}>{user.email}</Caption>
            </View>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={({color, size}) => (
                  <MaterialCommunityIcons
                    name="account-outline"
                    color={color}
                    size={size}
                  />
                )}
                label="ADD ABILITY TO EDIT PROFILE STACK"
                onPress={() => {}}
              />
            </Drawer.Section>
            <Drawer.Section>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={false} />
                </View>
              </View>
            </Drawer.Section>
            <Drawer.Section title="Logout">
              <View style={styles.preference}>
                <Button icon="logout" compact onPress={_logoutHandler}>
                  LOGOUT
                </Button>
              </View>
            </Drawer.Section>
          </View>
        </DrawerContentScrollView>
      )}
    </>
  );
}
