import {CommonActions} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';
import type {ScreensType} from 'src/navigation/Screens';

let navigator: any;

export const setTopLevelNavigator = (navigatorRef: any) => {
  navigator = navigatorRef;
};

export const getRef = () => {
  return navigator;
};

export const navigate = (name: ScreensType, params: any) => {
  navigator.dispatch(
    CommonActions.navigate({
      name,
      params,
    }),
  );
};
export const popToTop = () => {
  navigator.dispatch(StackActions.popToTop());
};

export const goBack = () => {
  navigator.dispatch(CommonActions.goBack());
};

export const resetParams = () => {
  navigator.dispatch(
    CommonActions.setParams({item: undefined, variant: undefined}),
  );
};
