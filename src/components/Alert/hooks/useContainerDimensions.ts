import type { ViewStyle, StyleProp } from 'react-native';

import { Platform, useWindowDimensions } from 'react-native';

export const useContainerDimensions = (): StyleProp<ViewStyle> => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const maxWidth = Platform.select({
    web: 450,
    default: 340,
  });
  const maxHeight = Math.round(windowHeight * 0.85);

  return {
    width: windowWidth - 10 * 2,
    maxWidth,
    maxHeight,
  };
};
