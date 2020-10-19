import type {Action, ActionPayload} from 'src/store/reduxAction.types';
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  SETUP_USER,
  SWITCH_LOADER,
} from 'src/store/user/user.actions';

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
  action: ActionPayload<any> | Action,
): ReduxState => {
  switch (action.type) {
    case SETUP_USER.pending: {
      return {
        ...state,
        loading: true,
      };
    }
    case SETUP_USER.resolved: {
      return {
        ...state,
        loading: false,
        user: {...state.user, ...action.payload},
      };
    }
    case SETUP_USER.rejected: {
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    }
    case REGISTER.pending:
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
      };
    }
    case REGISTER.rejected:
    case REGISTER.resolved:
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
    case SWITCH_LOADER: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    default:
      return state;
  }
};
