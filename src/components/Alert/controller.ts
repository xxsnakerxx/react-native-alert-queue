import { useCallback } from 'react';

import type { AlertButton, AlertViewProps } from './types';
import { alert } from '../../containers/AlertContainer/alert.api';

export const useController = <R = unknown>({
  onAwaitableDismiss,
  onDismiss,
  resolve,
}: AlertViewProps<R>) => {
  const onButtonPress = useCallback(
    (button: AlertButton<R>) => {
      const resolveWrapper = (value: R) => {
        resolve(value);

        if (button.hideAlertOnPress !== false) {
          alert.hide();
        }
      };

      if (button.onAwaitablePress) {
        button.onAwaitablePress(resolveWrapper);
      } else {
        button.onClick?.();

        resolveWrapper(undefined as R);
      }
    },
    [resolve]
  );

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

  return { onDismissButtonPress, onButtonPress };
};
