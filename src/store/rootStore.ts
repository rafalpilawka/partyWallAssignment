import {all, call} from 'redux-saga/effects';
import {applyMiddleware, combineReducers, createStore, Reducer} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import {watchDrinksSaga} from 'src/store/drinks/drinks.sagas';
import {Action} from 'src/store/reduxAction.types';
import userReducer from 'src/store/user/user.reducer';
import drinksReducer from 'src/store/drinks/drinks.reducer';
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
  drink: drinksReducer,
});

const rootStore = (state: any, action: Action<any>) => {
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
