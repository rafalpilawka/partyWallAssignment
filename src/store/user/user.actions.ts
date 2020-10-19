import {Action, ActionPayload} from 'src/store/reduxAction.types';
import {
  IUserRegisterData,
  TCredentials,
  TUserData,
} from 'src/store/user/user.types';

import {createAsyncTypes} from 'src/utils/services/createAsyncTypes';

export const SETUP_USER = createAsyncTypes('SETUP_USER');
export const setupUserAction = (
  uid: string,
  email: string,
): ActionPayload<{uid: string; email: string}> => ({
  type: SETUP_USER.saga,
  payload: {uid, email},
});
export const setupUserPending = (): Action => ({
  type: SETUP_USER.pending,
});
export const setupUserResolved = (
  data: TUserData,
): ActionPayload<TUserData> => ({
  type: SETUP_USER.resolved,
  payload: data,
});
export const setupUserRejected = (): Action => ({
  type: SETUP_USER.rejected,
});
/*
   LOGIN
 */
export const LOGIN = createAsyncTypes('LOGIN');
export const loginAction = (
  credentials: TCredentials,
): ActionPayload<TCredentials> => ({
  type: LOGIN.saga,
  payload: credentials,
});

export const loginPending = (): Action => ({
  type: LOGIN.pending,
});
export const loginResolved = (): Action => ({
  type: LOGIN.resolved,
});
export const loginRejected = (): Action => ({
  type: LOGIN.rejected,
});
/*
  REGISTRATION
 */
export const REGISTER = createAsyncTypes('REGISTER');
export const registerAction = (
  userData: IUserRegisterData,
): ActionPayload<IUserRegisterData> => ({
  type: REGISTER.saga,
  payload: userData,
});
export const registerPending = (): Action => ({
  type: REGISTER.pending,
});
export const registerResolved = (user: any): ActionPayload<TUserData> => ({
  type: REGISTER.resolved,
  payload: user,
});
export const registerRejected = (): Action => ({
  type: REGISTER.rejected,
});
/*
   LOGOUT
 */
export const LOGOUT = createAsyncTypes('LOGOUT');
export const logoutAction = (): Action => ({
  type: LOGOUT.saga,
});

export const logoutPending = (): Action => ({
  type: LOGOUT.pending,
});
export const logoutResolved = (): Action => ({
  type: LOGOUT.resolved,
});
export const logoutRejected = (): Action => ({
  type: LOGOUT.rejected,
});

export const SWITCH_LOADER = 'SWITCH_LOADER';
export const switchLoader = (state: boolean): ActionPayload<boolean> => ({
  type: SWITCH_LOADER,
  payload: state,
});
