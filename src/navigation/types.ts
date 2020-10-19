import Screens from './Screens';

export type RootStackParamList = {
  [Screens.HOME]: undefined;
  [Screens.AUTHORIZATION]: undefined;
};

export type BottomTabParamList = {
  [Screens.FOOD]: undefined;
  [Screens.DRINK]: undefined;
  [Screens.ADD]: undefined;
};

export type AuthStackParamList = {
  [Screens.LOGIN]: undefined;
  [Screens.REGISTER]: undefined;
};

export type DrawerStackParamList = {
  [Screens.HOME]: undefined;
  [Screens.EDIT]: undefined;
};
