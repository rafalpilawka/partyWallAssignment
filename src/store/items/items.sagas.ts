import {takeLeading, put} from 'redux-saga/effects';
import {
  createItemApi,
  getCollectionApi,
  removeItemApi,
  updateItemApi,
} from 'src/store/items/items.api';
import {ActionPayload} from 'src/store/reduxAction.types';
import {IDrink, IFood, TVariant} from 'src/store/items/items.types';

import {
  GET_COLLECTION,
  getCollectionPending,
  getCollectionResolved,
  getCollectionRejected,
  ADD_ITEM,
  addItemPending,
  addItemResolved,
  addItemRejected,
  getCollectionAction,
  UPDATE_ITEM,
  updateItemPending,
  updateItemResolved,
  updateItemRejected,
  REMOVE_ITEM,
  removeItemPending,
  removeItemResolved,
  removeItemRejected,
} from 'src/store/items/items.actions';

export function* getCollectionSaga({
  payload,
}: ActionPayload<string>): IterableIterator<any> {
  try {
    yield put(getCollectionPending());
    const response: any = yield getCollectionApi(payload);
    yield put(getCollectionResolved({list: response, variant: payload}));
  } catch (e) {
    put(getCollectionRejected());
  }
}

export function* createItemSaga({
  payload,
}: ActionPayload<IDrink | IFood>): IterableIterator<any> {
  try {
    yield put(addItemPending());
    yield createItemApi(payload);
    debugger;
    yield put(getCollectionAction(payload.variant));
    yield put(addItemResolved());
  } catch (e) {
    put(addItemRejected());
  }
}

export function* updateItemSaga({
  payload,
}: ActionPayload<IDrink | IFood>): IterableIterator<any> {
  try {
    yield put(updateItemPending());
    yield updateItemApi(payload);
    yield put(getCollectionAction(payload.variant));
    yield put(updateItemResolved());
  } catch (e) {
    put(updateItemRejected());
  }
}

export function* deleteItemSaga({
  payload,
}: ActionPayload<{id: string; variant: TVariant}>): IterableIterator<any> {
  try {
    yield put(removeItemPending());
    if (!payload.id) return;
    yield removeItemApi(payload);
    yield put(getCollectionAction(payload.variant));
    yield put(removeItemResolved());
  } catch (e) {
    put(removeItemRejected());
  }
}

export function* watchItemsSaga(): IterableIterator<any> {
  yield takeLeading(GET_COLLECTION.saga, getCollectionSaga);
  yield takeLeading(ADD_ITEM.saga, createItemSaga);
  yield takeLeading(UPDATE_ITEM.saga, updateItemSaga);
  yield takeLeading(REMOVE_ITEM.saga, deleteItemSaga);
}
