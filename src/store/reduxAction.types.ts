export type Action<T> = {
  type: string;
  payload?: T | undefined;
};

export type AsyncTypes = {
  pending: string;
  resolved: string;
  rejected: string;
  saga: string;
};

export type MetaT = {
  currentPage: number;
  maxPage: number;
  total: number;
};
