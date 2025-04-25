import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

export const useAnimation = ({
  animationDuration,
  isHiding,
}: {
  animationDuration: number;
  isHiding: boolean;
}) => {
  const [animation] = useState(() => new Animated.Value(0));

  const prevIsHidingRef = useRef<boolean>(null);

  if (isHiding !== prevIsHidingRef.current) {
    animation.setValue(isHiding ? 1 : 0);

    Animated.timing(animation, {
      duration: animationDuration,
      toValue: isHiding ? 0 : 1,
      useNativeDriver: true,
    }).start();
  }

  useEffect(() => {
    prevIsHidingRef.current = isHiding;
  }, [isHiding]);

  return { animation };
};
