import { type FC, useCallback, useMemo } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { AlertViewProps } from './types';

import { CloseIcon } from '../../components/icons/Close';

import { useAnimation } from '../../hooks/useAnimation';
import { useController } from './controller';
import { styles, useContainerDimensions } from './styles';
import { Button } from '../Button';

export const Alert: FC<AlertViewProps> = (props) => {
  const {
    afterButtonsSlot,
    animationDuration,
    beforeButtonsSlot,
    beforeMessageSlot,
    beforeTitleSlot,
    renderDismissButton,
    icon,
    iconColor = 'black',
    iconSize,
    isDismissible,
    isHiding,
    testID,
    buttons,
    titleAlign = 'center',
  } = props;

  const { animation } = useAnimation({
    animationDuration,
    isHiding,
  });

  const { onDismissButtonPress, onButtonPress } = useController(props);

  const containerDimensions = useContainerDimensions();

  const containerAnimation = useMemo(
    () => ({
      opacity: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          scaleX: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1],
          }),
        },
        {
          scaleY: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1],
          }),
        },
      ],
    }),
    [animation]
  );

  const containerStyle = useMemo(
    () =>
      StyleSheet.compose(
        StyleSheet.compose(styles.container, containerDimensions),
        containerAnimation
      ),
    [containerAnimation, containerDimensions]
  );

  const titleStyle = useMemo(
    () => StyleSheet.compose(styles.title, { textAlign: titleAlign }),
    [titleAlign]
  );

  const renderTitleCb = useCallback(() => {
    const title = props.title ? (
      <Text numberOfLines={4} style={titleStyle}>
        {props.title}
      </Text>
    ) : (
      props.renderTitle?.() || null
    );

    return title ? <View style={styles.titleContainer}>{title}</View> : null;
  }, [props, titleStyle]);

  const renderMessageCb = useCallback(() => {
    const message = props.message ? (
      <Text style={styles.message}>{props.message}</Text>
    ) : (
      props.renderMessage?.() || null
    );

    return message ? (
      <ScrollView bounces={false} style={styles.messageContainer}>
        {message}
      </ScrollView>
    ) : null;
  }, [props]);

  const renderIconCb = useCallback(() => {
    const Svg = icon;

    return Svg ? (
      <View style={styles.iconContainer}>
        <Svg fill={iconColor} width={iconSize} height={iconSize} />
      </View>
    ) : null;
  }, [icon, iconColor, iconSize]);

  const renderDismissButtonCb = useCallback(() => {
    const defaultDismissButton = (
      <Pressable onPress={onDismissButtonPress} style={styles.closeButton}>
        <CloseIcon width={24} height={24} fill="gray" />
      </Pressable>
    );

    const dismissButton = isDismissible
      ? renderDismissButton?.({ onPress: onDismissButtonPress }) ||
        defaultDismissButton
      : null;

    return dismissButton;
  }, [isDismissible, onDismissButtonPress, renderDismissButton]);

  const renderButtons = useCallback(() => {
    if (buttons?.length) {
      return (
        <View style={styles.buttonsContainer}>
          {buttons.map((button) => (
            <Button
              key={button.text}
              text={button.text}
              onPress={() => onButtonPress(button)}
            />
          ))}
        </View>
      );
    }

    return null;
  }, [buttons, onButtonPress]);

  return (
    <Animated.View style={containerStyle} testID={testID || 'Alert'}>
      {renderIconCb()}
      {beforeTitleSlot?.() || null}
      {renderTitleCb()}
      {beforeMessageSlot?.() || null}
      {renderMessageCb()}
      {beforeButtonsSlot?.() || null}
      {renderDismissButtonCb()}
      {renderButtons()}
      {afterButtonsSlot?.() || null}
    </Animated.View>
  );
};
