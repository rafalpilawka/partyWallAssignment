import {Action, ActionPayload} from 'src/store/reduxAction.types';
import {IDrink, IFood, TVariant} from 'src/store/items/items.types';
import {createAsyncTypes} from 'src/utils/services/createAsyncTypes';

export const GET_COLLECTION = createAsyncTypes('GET_COLLECTION');
export const getCollectionAction = (
  variant: TVariant,
): ActionPayload<TVariant> => ({
  type: GET_COLLECTION.saga,
  payload: variant,
});
export const getCollectionPending = (): Action => ({
  type: GET_COLLECTION.pending,
});
export const getCollectionResolved = (payload: {
  list: Array<IDrink | IFood>;
  variant: string;
}): ActionPayload<{list: Array<IDrink | IFood>; variant: string}> => ({
  type: GET_COLLECTION.resolved,
  payload: payload,
});
export const getCollectionRejected = (): Action => ({
  type: GET_COLLECTION.rejected,
});

export const ADD_ITEM = createAsyncTypes('ADD_ITEM');
export const addItemAction = (
  item: IDrink | IFood,
): ActionPayload<IDrink | IFood> => ({
  type: ADD_ITEM.saga,
  payload: item,
});
export const addItemPending = (): Action => ({
  type: ADD_ITEM.pending,
});
export const addItemResolved = (): Action => ({
  type: ADD_ITEM.resolved,
});
export const addItemRejected = (): Action => ({
  type: ADD_ITEM.rejected,
});

export const UPDATE_ITEM = createAsyncTypes('UPDATE_ITEM');
export const updateItemAction = (
  item: IDrink | IFood,
): ActionPayload<IDrink | IFood> => ({
  type: UPDATE_ITEM.saga,
  payload: item,
});
export const updateItemPending = (): Action => ({
  type: UPDATE_ITEM.pending,
});
export const updateItemResolved = (): Action => ({
  type: UPDATE_ITEM.resolved,
});
export const updateItemRejected = (): Action => ({
  type: UPDATE_ITEM.rejected,
});

export const REMOVE_ITEM = createAsyncTypes('REMOVE_ITEM');
export const removeItemAction = (
  id: string,
  variant: string,
): ActionPayload<{id: string; variant: string}> => ({
  type: REMOVE_ITEM.saga,
  payload: {
    id,
    variant,
  },
});
export const removeItemPending = (): Action => ({
  type: REMOVE_ITEM.pending,
});
export const removeItemResolved = (): Action => ({
  type: REMOVE_ITEM.resolved,
});
export const removeItemRejected = (): Action => ({
  type: REMOVE_ITEM.rejected,
});
