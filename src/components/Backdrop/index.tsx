import { type FC, useMemo } from 'react';
import { Animated, StyleSheet } from 'react-native';

import type { Props } from './types';

import { useAnimation } from '../../hooks/useAnimation';

export const Backdrop: FC<Props> = ({
  animationDuration,
  isHiding,
  backgroundColor = 'rgba(0, 0, 0, 0.5)',
}) => {
  const { animation } = useAnimation({ animationDuration, isHiding });

  const animatedStyle = useMemo(
    () => ({
      opacity: animation.interpolate({
        extrapolate: 'clamp',
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    }),
    [animation]
  );

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
