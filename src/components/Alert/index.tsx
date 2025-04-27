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
    iconColor,
    iconSize,
    isDismissible,
    isHiding,
    testID,
    buttons,
    buttonsDirection = 'column',
    title,
    renderTitle,
    message,
    renderMessage,
    config,
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
      StyleSheet.flatten([
        styles.container,
        containerDimensions,
        containerAnimation,
      ]),
    [containerAnimation, containerDimensions]
  );

  const beforeTitleSlotElement = useMemo(() => {
    return beforeTitleSlot?.() || config?.beforeTitleSlot?.() || null;
  }, [beforeTitleSlot, config]);

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
      renderTitle?.({ style: styles.title, text: title ?? '' }) ||
      config?.renderTitle?.({ style: styles.title, text: title ?? '' }) ||
      null
    );

    return titleElement ? (
      <View style={titleContainerStyle}>{titleElement}</View>
    ) : null;
  }, [title, renderTitle, titleContainerStyle, config]);

  const beforeMessageSlotElement = useMemo(() => {
    return beforeMessageSlot?.() || config?.beforeMessageSlot?.() || null;
  }, [beforeMessageSlot, config]);

  const renderMessageCb = useCallback(() => {
    const messageElement = message ? (
      <Text style={styles.message}>{message}</Text>
    ) : (
      renderMessage?.({ style: styles.message, text: message ?? '' }) ||
      config?.renderMessage?.({ style: styles.message, text: message ?? '' }) ||
      null
    );

    return messageElement ? (
      <ScrollView bounces={false} style={styles.messageContainer}>
        {messageElement}
      </ScrollView>
    ) : null;
  }, [message, renderMessage, config]);

  const renderIconCb = useCallback(() => {
    const Svg = icon;

    const iconConfig = config?.icon;

    const defaultIconSize = iconSize || iconConfig?.size || 72;
    const defaultIconColor = iconColor || iconConfig?.color || 'black';

    return Svg ? (
      <View style={styles.iconContainer}>
        <Svg
          fill={defaultIconColor}
          width={defaultIconSize}
          height={defaultIconSize}
        />
      </View>
    ) : null;
  }, [icon, iconColor, iconSize, config]);

  const renderDismissButtonCb = useCallback(() => {
    const defaultDismissButton = (
      <Pressable onPress={onDismissButtonPress} style={styles.closeButton}>
        <CloseIcon width={24} height={24} fill="gray" />
      </Pressable>
    );

    const dismissButton = isDismissible
      ? renderDismissButton?.({ onPress: onDismissButtonPress }) ||
        config?.renderDismissButton?.({ onPress: onDismissButtonPress }) ||
        defaultDismissButton
      : null;

    return dismissButton;
  }, [isDismissible, onDismissButtonPress, renderDismissButton, config]);

  const buttonsContainerStyle = useMemo(() => {
    return StyleSheet.compose(styles.buttonsContainer, {
      flexDirection: buttonsDirection,
    });
  }, [buttonsDirection]);

  const beforeButtonsSlotElement = useMemo(() => {
    return beforeButtonsSlot?.() || config?.beforeButtonsSlot?.() || null;
  }, [beforeButtonsSlot, config]);

  const afterButtonsSlotElement = useMemo(() => {
    return afterButtonsSlot?.() || config?.afterButtonsSlot?.() || null;
  }, [afterButtonsSlot, config]);

  const renderButtons = useCallback(() => {
    if (buttons?.length) {
      return (
        <View style={buttonsContainerStyle}>
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
  }, [buttons, onButtonPress, buttonsContainerStyle]);

  return (
    <Animated.View style={containerStyle} testID={testID || 'Alert'}>
      {renderIconCb()}
      {beforeTitleSlotElement}
      {renderTitleCb()}
      {beforeMessageSlotElement}
      {renderMessageCb()}
      {beforeButtonsSlotElement}
      {renderDismissButtonCb()}
      {renderButtons()}
      {afterButtonsSlotElement}
    </Animated.View>
  );
};
