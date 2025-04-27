import { type FC, useCallback, useMemo } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
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
    title,
    renderTitle,
    message,
    renderMessage,
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

  const beforeTitleSlotElement = useMemo(() => {
    return beforeTitleSlot?.() || null;
  }, [beforeTitleSlot]);

  const titleContainerStyle = useMemo(() => {
    const style: StyleProp<ViewStyle>[] = [styles.titleContainer];

    if (isDismissible && !(icon || beforeTitleSlotElement)) {
      style.push(styles.dismissibleTitleContainer);
    }

    return StyleSheet.flatten(style);
  }, [isDismissible, icon, beforeTitleSlotElement]);

  const renderTitleCb = useCallback(() => {
    const titleElement = title ? (
      <Text numberOfLines={4} style={styles.title}>
        {title}
      </Text>
    ) : (
      renderTitle?.({ style: styles.title, text: title ?? '' }) || null
    );

    return titleElement ? (
      <View style={titleContainerStyle}>{titleElement}</View>
    ) : null;
  }, [title, renderTitle, titleContainerStyle]);

  const renderMessageCb = useCallback(() => {
    const messageElement = message ? (
      <Text style={styles.message}>{message}</Text>
    ) : (
      renderMessage?.({ style: styles.message, text: message ?? '' }) || null
    );

    return messageElement ? (
      <ScrollView bounces={false} style={styles.messageContainer}>
        {messageElement}
      </ScrollView>
    ) : null;
  }, [message, renderMessage]);

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
      {beforeTitleSlotElement}
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
