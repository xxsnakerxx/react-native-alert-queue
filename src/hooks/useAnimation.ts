import { useEffect, useRef } from 'react';
import { useSharedValue, withTiming } from 'react-native-reanimated';

export const useAnimation = ({
  animationDuration,
  isHiding,
}: {
  animationDuration: number;
  isHiding: boolean;
}) => {
  const animation = useSharedValue(isHiding ? 1 : 0);
  const prevIsHidingRef = useRef<boolean>(null);

  if (isHiding !== prevIsHidingRef.current) {
    animation.value = withTiming(isHiding ? 0 : 1, {
      duration: animationDuration,
    });
  }

  useEffect(() => {
    prevIsHidingRef.current = isHiding;
  }, [isHiding]);

  return { animation };
};
