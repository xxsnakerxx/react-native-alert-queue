import type { ReactElement } from 'react';
import type { ColorValue } from 'react-native';

type IconProps = {
  fill?: ColorValue;
  stroke?: ColorValue;
  width?: number;
  height?: number;
};

export interface Props<R = unknown> {
  id?: string;
  testID?: string;
  afterButtonsSlot?: () => ReactElement<any>;
  beforeButtonsSlot?: () => ReactElement<any>;
  beforeMessageSlot?: () => ReactElement<any>;
  beforeTitleSlot?: () => ReactElement<any>;
  icon?: React.FC<IconProps>;
  iconColor?: ColorValue;
  iconSize?: number;
  isDismissible?: boolean;
  message?: string;
  onAwaitableDismiss?: (resolve: (value: R) => void) => void;
  onDismiss?: (() => Promise<R>) | (() => R);
  renderMessage?: () => ReactElement<any>;
  renderTitle?: () => ReactElement<any>;
  renderDismissButton?: ({
    onPress,
  }: {
    onPress: () => void;
  }) => ReactElement<any>;
  buttons?: AlertButton[];
  title?: string;
  titleAlign?: 'center' | 'left' | 'right';
}

export type AlertButton<R = unknown> = {
  text: string;
  onPress?: (() => Promise<R>) | (() => R);
  testID?: string;
  hideAlertOnPress?: boolean;
  onAwaitablePress?: (resolve: (value: R) => void) => void;
};

export type ConfirmProps = Omit<Props, 'buttons'> & {
  buttons?: string[];
};

export type AlertViewProps<R = unknown> = Props<R> & {
  animationDuration: number;
  isHiding: boolean;
  resolve: (value?: R) => void;
};
