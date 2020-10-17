import type {Action} from 'src/store/reduxAction.types';

export type ReduxState = {
  loading: boolean;
};

const INITIAL_STATE: ReduxState = {
  loading: false,
};

export default (
  state: ReduxState = INITIAL_STATE,
  action: Action<any>,
): ReduxState => {
  switch (action.type) {
    default:
      return state;
  }
};
