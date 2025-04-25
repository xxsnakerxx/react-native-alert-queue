import type { Alert } from './types';

export const alert: Alert = {
  clearQueue: () => {},
  confirm: () => Promise.resolve(true),
  error: <R>() => Promise.resolve<R>(undefined as R),
  getAlert: () => undefined,
  hide: () => {},
  isShown: false,
  show: <R>() => Promise.resolve<R>(undefined as R),
  success: <R>() => Promise.resolve<R>(undefined as R),
  update: () => {},
};
