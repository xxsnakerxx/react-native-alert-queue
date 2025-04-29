import { type FC, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import type { Props } from './types';

import { useAnimation } from '../../hooks/useAnimation';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

export const Backdrop: FC<Props> = ({
  animationDuration,
  isHiding,
  backgroundColor = 'rgba(0, 0, 0, 0.5)',
}) => {
  const { animation } = useAnimation({ animationDuration, isHiding });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: animation.value,
  }));

  const style = useMemo(
    () =>
      StyleSheet.compose(
        StyleSheet.absoluteFillObject,
        StyleSheet.compose(animatedStyle, { backgroundColor })
      ),
    [animatedStyle, backgroundColor]
  );

  return <Animated.View style={style} />;
};
