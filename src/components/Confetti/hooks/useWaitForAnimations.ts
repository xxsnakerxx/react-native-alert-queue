import {
  cancelAnimation,
  runOnJS,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useEffect, useState } from 'react';

export const useWaitForAnimations = () => {
  const [isReady, setIsReady] = useState(false);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 0 }, () => {
      runOnJS(setIsReady)(true);
    });

    return () => {
      cancelAnimation(progress);
    };
  }, [progress]);

  return isReady;
};
