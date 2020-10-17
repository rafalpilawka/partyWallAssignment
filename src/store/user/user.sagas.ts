import {takeLeading, put} from 'redux-saga/effects';
import {Action} from 'src/store/reduxAction.types';
import {
  LOGIN,
  loginPending,
  loginRejected,
  loginResolved,
  REGISTER,
  registerPending,
  registerResolved,
  registerRejected,
  LOGOUT,
  logoutPending,
  logoutResolved,
  logoutRejected,
} from 'src/store/user/user.actions';
import {IUserRegisterData, TCredentials} from 'src/store/user/user.types';

export function* loginUserSaga({
  payload,
}: Action<TCredentials>): IterableIterator<any> {
  try {
    yield put(loginPending());
    yield put(loginResolved(payload));
  } catch (e) {
    yield put(loginRejected());
  }
}
export function* registerUserSaga({
  payload,
}: Action<IUserRegisterData>): IterableIterator<any> {
  try {
    yield put(registerPending());
    yield put(registerResolved());
  } catch (e) {
    yield put(registerRejected());
  }
}

export function* logoutSaga({
  payload,
}: Action<IUserRegisterData>): IterableIterator<any> {
  try {
    yield put(logoutPending());
    yield put(logoutResolved());
  } catch (e) {
    yield put(logoutRejected());
  }
}

export function* watchUserSaga(): IterableIterator<any> {
  yield takeLeading(LOGIN.saga, loginUserSaga);
  yield takeLeading(REGISTER.saga, registerUserSaga);
  yield takeLeading(LOGOUT.saga, logoutSaga);
}
