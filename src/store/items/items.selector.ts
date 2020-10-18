import {RootState} from 'src/store/rootStore';

export const selectLoading = (state: RootState): boolean => state.items.loading;
export const selectFood = (state: RootState): any => state.items.food;
export const selectDrinks = (state: RootState): any => state.items.drink;
