import type { ReactElement, FC } from 'react';
import type { ColorValue, StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { AlertConfig } from '../../containers/AlertContainer/types';

type IconProps = {
  fill?: ColorValue;
  stroke?: ColorValue;
  width?: number;
  height?: number;
};

export type ConfettiProps = {
  colors?: string[];
  numberOfPieces: number;
  opacity?: number;
  pieceDimensions?: {
    height: number;
    width: number;
  };
  startOffset?: number;
  renderPiece?: (props: { style: StyleProp<ViewStyle> }) => ReactElement<any>;
};

export interface Props<R = unknown> {
  id?: string;
  testID?: string;
  afterButtonsSlot?: () => ReactElement<any>;
  beforeButtonsSlot?: () => ReactElement<any>;
  beforeMessageSlot?: () => ReactElement<any>;
  beforeTitleSlot?: () => ReactElement<any>;
  icon?: FC<IconProps>;
  iconColor?: ColorValue;
  iconSize?: number;
  isDismissible?: boolean;
  message?: string;
  confetti?: boolean | ConfettiProps;
  onAwaitableDismiss?: (resolve: (value: R) => void) => void;
  onDismiss?: (() => Promise<R>) | (() => R);
  renderMessage?: ({
    style,
    text,
  }: {
    style: StyleProp<TextStyle>;
    text: string;
  }) => ReactElement<any>;
  renderTitle?: ({
    style,
    text,
  }: {
    style: StyleProp<TextStyle>;
    text: string;
  }) => ReactElement<any>;
  renderDismissButton?: ({
    onPress,
  }: {
    onPress: () => void;
  }) => ReactElement<any>;
  buttons?: AlertButton[];
  buttonsDirection?: 'row' | 'column';
  renderButton?: (
    props: Pick<AlertButton, 'text' | 'testID' | 'disabled' | 'customProps'> & {
      onPress: () => void;
    }
  ) => ReactElement<any>;
  title?: string;
}

export interface AlertButtonCustomProps {}

export type AlertButton<R = unknown> = {
  text: string;
  onPress?: (() => Promise<R>) | (() => R);
  disabled?: boolean;
  testID?: string;
  hideAlertOnPress?: boolean;
  onAwaitablePress?: (resolve: (value: R) => void) => void;
  customProps?: AlertButtonCustomProps;
};

export type ConfirmProps = Omit<Props, 'buttons'> & {
  buttons?: Pick<AlertButton, 'text' | 'customProps'>[];
  hideAlertOnButtonPress?: boolean;
};

export type AlertViewProps<R = unknown> = Props<R> & {
  animationDuration: number;
  isHiding: boolean;
  resolve: (value?: R) => void;
  config?: AlertConfig;
};
