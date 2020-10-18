import {takeLeading, put, call} from 'redux-saga/effects';
import {ActionPayload} from 'src/store/reduxAction.types';
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
  SETUP_USER,
  setupUserResolved,
  setupUserRejected,
  setupUserPending,
} from 'src/store/user/user.actions';
import {IUserRegisterData, TCredentials} from 'src/store/user/user.types';
import {
  createProfileApi,
  getUserdataApi,
  loginUserApi,
  logoutUserApi,
  registerUserApi,
} from 'src/store/user/user.api';

export function* setUserSaga({
  payload,
}: ActionPayload<{uid: string; email: string}>): IterableIterator<any> {
  if (!payload) return;
  try {
    yield put(setupUserPending());
    const {email, uid} = payload;
    const response: any = yield getUserdataApi(uid);
    const {name, surname} = response.data();
    yield put(setupUserResolved({name, surname, email, uid}));
  } catch (e) {
    yield put(setupUserRejected());
  }
}

export function* loginUserSaga({
  payload,
}: ActionPayload<TCredentials>): IterableIterator<any> {
  if (!payload) return;
  try {
    yield put(loginPending());
    const response: any = yield call(loginUserApi, payload);
    const {uid} = response!.user;
    yield call(setUserSaga, uid);
    yield put(loginResolved(payload));
  } catch (e) {
    yield put(loginRejected());
  }
}
export function* registerUserSaga({
  payload,
}: ActionPayload<IUserRegisterData>): IterableIterator<any> {
  try {
    yield put(registerPending());
    const {name, surname, email, password} = payload;
    const credentials = {email, password};
    const response: any = yield registerUserApi(credentials);
    yield call(createProfileApi, response.user.uid, name, surname);
    yield put(registerResolved({name, surname}));
  } catch (e) {
    yield put(registerRejected());
  }
}

export function* logoutSaga(): IterableIterator<any> {
  try {
    yield put(logoutPending());
    yield call(logoutUserApi);
    yield put(logoutResolved());
  } catch (e) {
    yield put(logoutRejected());
  }
}

export function* watchUserSaga(): IterableIterator<any> {
  yield takeLeading(SETUP_USER.saga, setUserSaga);
  yield takeLeading(LOGIN.saga, loginUserSaga);
  yield takeLeading(REGISTER.saga, registerUserSaga);
  yield takeLeading(LOGOUT.saga, logoutSaga);
}
