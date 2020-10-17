import {AsyncStatus} from 'src/constants/asyncStatuses';
import type {AsyncTypes} from 'src/store/reduxAction.types';

export const createAsyncType = (type: string, asyncStatus: string): string =>
  `${type}_${asyncStatus}`;

export const createAsyncTypes = (type: string): AsyncTypes => ({
  pending: createAsyncType(type, AsyncStatus.pending),
  resolved: createAsyncType(type, AsyncStatus.resolved),
  rejected: createAsyncType(type, AsyncStatus.rejected),
  saga: createAsyncType(type, AsyncStatus.saga),
});
