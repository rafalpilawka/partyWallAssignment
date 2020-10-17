import type {Action} from 'src/store/reduxAction.types';
import {LOGIN, LOGOUT} from 'src/store/user/user.actions';

export type ReduxState = {
  loading: boolean;
  errors: any;
  user: any;
};

const INITIAL_STATE: ReduxState = {
  loading: false,
  errors: undefined,
  user: null,
};

export default (
  state: ReduxState = INITIAL_STATE,
  action: Action<any>,
): ReduxState => {
  switch (action.type) {
    case LOGIN.pending: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOGIN.resolved: {
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    }
    case LOGIN.rejected: {
      return {
        ...state,
        loading: false,
      };
    }

    case LOGOUT.pending: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOGOUT.resolved: {
      return {
        ...state,
        loading: false,
        user: null,
      };
    }
    case LOGOUT.rejected: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};
