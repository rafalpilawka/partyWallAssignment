import type {Action, ActionPayload} from 'src/store/reduxAction.types';

export type ReduxState = {
  loading: boolean;
  food: any[];
  drinks: any[];
  selectedFood: any;
  selectedDrinks: any;
};

const INITIAL_STATE: ReduxState = {
  loading: false,
  food: [],
  drinks: [],
  selectedFood:null,
  selectedDrinks: null,
};

export default (
  state: ReduxState = INITIAL_STATE,
  action: ActionPayload<any> | Action,
): ReduxState => {
  switch (action.type) {
    default:
      return state;
  }
};
