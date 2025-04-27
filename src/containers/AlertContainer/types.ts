import type { ColorValue } from 'react-native';
import type {
  Props as AlertProps,
  AlertViewProps as AlertViewProps,
} from '../../components/Alert/types';

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

export type CurrentAlert = AlertProps &
  Pick<AlertViewProps, 'resolve'> &
  Pick<Props, 'config'>;

export type { AlertProps };

export type Props = {
  animationDuration?: number;
  config?: AlertConfig;
};

export type AlertConfig = {
  backdropBackgroundColor?: ColorValue;
  success?: Partial<
    Pick<AlertProps, 'icon' | 'iconColor' | 'iconSize' | 'title'>
  >;
  error?: Partial<
    Pick<AlertProps, 'icon' | 'iconColor' | 'iconSize' | 'title'>
  >;
};
