import { useCallback } from 'react';

import type { ViewProps } from './types';
import { alert } from '../../alert.api';

export const useController = <R = unknown>({
  onAwaitableDismiss,
  onDismiss,
  resolve,
}: ViewProps<R>) => {
  const onDismissButtonPress = useCallback(() => {
    const resolveWrapper = (value: R) => {
      resolve(value);

      alert.hide();
    };

    if (onAwaitableDismiss) {
      onAwaitableDismiss(resolveWrapper);
    } else {
      onDismiss?.();

      resolveWrapper(undefined as R);
    }
  }, [onAwaitableDismiss, onDismiss, resolve]);

  return { onDismissButtonPress };
};
