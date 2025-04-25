import type { Props as AlertProps } from './components/Alert/types';

export type Alert = {
  clearQueue: (hideDisplayedAlert?: boolean) => void;
  confirm: (alert?: AlertProps) => Promise<boolean>;
  error: <R = unknown>(error: Error, isFixable?: boolean) => Promise<R>;
  getAlert: <R = unknown>(id?: string) => AlertProps<R> | undefined;
  hide: () => void;
  isShown: boolean;
  show: <R = unknown>(alert: AlertProps<R>) => Promise<R>;
  success: <R = unknown>(alert: AlertProps<R>) => Promise<R>;
  update: <R = unknown>(alert: AlertProps<R>) => void;
};
