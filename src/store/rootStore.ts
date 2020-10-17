import {all, call} from 'redux-saga/effects';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import {watchDrinksSaga} from 'src/store/items/items.sagas';
import { Action, ActionPayload } from "src/store/reduxAction.types";
import userReducer from 'src/store/user/user.reducer';
import itemsReducer from 'src/store/items/items.reducer';
import {watchUserSaga} from 'src/store/user/user.sagas';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([
    call(watchUserSaga),
    call(watchDrinksSaga),
    //OTHER WATCHERS GOES HERE
  ]);
}

const store = combineReducers({
  user: userReducer,
  items: itemsReducer,
});

const rootStore = (state: any, action: Action| ActionPayload<any>) => {
  if (action.type === 'CLEAR_FULL_STORE') {
    state = undefined;
  }
  return store(state, action);
};

export type RootState = ReturnType<typeof rootStore>;
export default createStore(
  rootStore,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);
sagaMiddleware.run(rootSaga);
