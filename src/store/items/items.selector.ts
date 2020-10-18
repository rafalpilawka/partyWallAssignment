import {RootState} from 'src/store/rootStore';

export const selectLoginLoading = (state: RootState): boolean =>
  state.items.loading;
export const selectFood = (state: RootState): any => state.items.food;
export const selectDrinks = (state: RootState): any => state.items.drinks;
