import {Action} from 'src/store/reduxAction.types';
import {
  IUserRegisterData,
  TCredentials,
  TUserData,
} from 'src/store/user/user.types';

import {createAsyncTypes} from 'src/utils/services/createAsyncTypes';

export const LOGIN = createAsyncTypes('LOGIN');
export const loginAction = (
  credentials: TCredentials,
): Action<TCredentials> => ({
  type: LOGIN.saga,
  payload: credentials,
});

export const loginPending = (): Action<null> => ({
  type: LOGIN.pending,
});
export const loginResolved = (data: TUserData): Action<TUserData> => ({
  type: LOGIN.resolved,
  payload: data,
});
export const loginRejected = (): Action<null> => ({
  type: LOGIN.rejected,
});

export const REGISTER = createAsyncTypes('REGISTER');
export const registerAction = (
  userData: IUserRegisterData,
): Action<IUserRegisterData> => ({
  type: REGISTER.saga,
  payload: userData,
});

export const registerPending = (): Action<null> => ({
  type: REGISTER.pending,
});
export const registerResolved = (): Action<TUserData> => ({
  type: REGISTER.resolved,
});
export const registerRejected = (): Action<null> => ({
  type: REGISTER.rejected,
});

export const LOGOUT = createAsyncTypes('LOGOUT');
export const logoutAction = (): Action<null> => ({
  type: LOGOUT.saga,
});

export const logoutPending = (): Action<null> => ({
  type: LOGOUT.pending,
});
export const logoutResolved = (): Action<TUserData> => ({
  type: LOGOUT.resolved,
});
export const logoutRejected = (): Action<null> => ({
  type: LOGOUT.rejected,
});
