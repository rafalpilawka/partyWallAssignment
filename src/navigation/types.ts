import Screens from './Screens';

export type RootStackParamList = {
  [Screens.HOME]: undefined;
  [Screens.AUTHORIZATION]: undefined;
};

export type BottomTabParamList = {
  [Screens.FOOD]: undefined;
  [Screens.DRINK]: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type AuthStackParamList = {
  [Screens.LOGIN]: undefined;
  [Screens.REGISTER]: undefined;
};
