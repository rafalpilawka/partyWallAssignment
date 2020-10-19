import {
  ADD_ITEM,
  GET_COLLECTION,
  REMOVE_ITEM,
  UPDATE_ITEM,
  SET_ACTIVE_ITEM,
} from 'src/store/items/items.actions';
import {IDrink, IFood} from 'src/store/items/items.types';
import type {Action, ActionPayload} from 'src/store/reduxAction.types';

export type ReduxState = {
  loading: boolean;
  food: IFood[];
  drink: IDrink[];
  activeItem: {item: IDrink | IFood | null; variant: string} | null;
};

const INITIAL_STATE: ReduxState = {
  loading: false,
  food: [],
  drink: [],
  activeItem: null,
};

export default (
  state: ReduxState = INITIAL_STATE,
  action: ActionPayload<any> | Action,
): ReduxState => {
  switch (action.type) {
    case GET_COLLECTION.pending: {
      return {
        ...state,
        loading: true,
      };
    }
    case ADD_ITEM.pending:
    case UPDATE_ITEM.pending:
    case REMOVE_ITEM.pending: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_COLLECTION.resolved: {
      const {variant, list} = action.payload;
      return {
        ...state,
        [variant]: list,
        loading: false,
      };
    }
    case GET_COLLECTION.rejected:
    case ADD_ITEM.resolved:
    case ADD_ITEM.rejected:
    case UPDATE_ITEM.resolved:
    case UPDATE_ITEM.rejected:
    case REMOVE_ITEM.resolved:
    case REMOVE_ITEM.rejected: {
      return {
        ...state,
        loading: false,
      };
    }
    case SET_ACTIVE_ITEM: {
      return {
        ...state,
        activeItem: action.payload,
      };
    }
    default:
      return state;
  }
};
