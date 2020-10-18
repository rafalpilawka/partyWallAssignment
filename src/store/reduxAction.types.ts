export type Action = {
  type: string;
  payload?: null;
};

export type ActionPayload<T> = {
  type: string;
  payload: T;
};
export type AsyncTypes = {
  pending: string;
  resolved: string;
  rejected: string;
  saga: string;
};
