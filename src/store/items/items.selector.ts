import {IDrink, IFood} from 'src/store/items/items.types';
import {RootState} from 'src/store/rootStore';

export const selectLoading = (state: RootState): boolean => state.items.loading;
export const selectFood = (state: RootState): IFood[] => state.items.food;
export const selectDrinks = (state: RootState): IDrink[] => state.items.drink;
export const selectActiveItem = (
  state: RootState,
): {
  item: IDrink | IFood | null;
  variant: string;
} | null => state.items.activeItem;
