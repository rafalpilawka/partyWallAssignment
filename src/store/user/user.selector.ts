import {RootState} from 'src/store/rootStore';

export const selectLoginLoading = (state: RootState): boolean =>
  state.user.loading;
export const selectUser = (state: RootState): any => state.user.user;
