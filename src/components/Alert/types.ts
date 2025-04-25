import type { ReactElement } from 'react';
import type { ColorValue } from 'react-native';

type IconProps = {
  fill?: ColorValue;
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
  title?: string;
  titleAlign?: 'center' | 'left' | 'right';
}

export type ViewProps<R = unknown> = Props<R> & {
  animationDuration: number;
  isHiding: boolean;
  resolve: (value?: R) => void;
};
