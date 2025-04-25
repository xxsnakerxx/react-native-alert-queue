import { type FC, useMemo } from 'react';
import { Animated, StyleSheet } from 'react-native';

import type { Props } from './types';

import { useAnimation } from '../../hooks/useAnimation';
import { styles } from './styles';

export const Backdrop: FC<Props> = ({ animationDuration, isHiding }) => {
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

  return (
    <Animated.View
      style={StyleSheet.compose(styles.container, animatedStyle)}
    />
  );
};
