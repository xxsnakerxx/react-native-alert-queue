import { useCallback, useEffect, useRef, useState } from 'react';

import type { AlertProps, CurrentAlert, Props } from './types';

import { InfoIcon } from '../../components/icons/Info';
import { SuccessIcon } from '../../components/icons/Success';
import { EventEmitter } from '../../utils/EventEmitter';

import { usePlatformController } from './controller.platform';
import { processAlertProps } from './utils';
import type { ConfirmProps } from '../../components/Alert/types';

export const useController = ({ animationDuration, config }: Props) => {
  const [isShown, setIsShown] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const [currentAlert, setCurrentAlert] = useState<CurrentAlert>();
  const [hideEmitter] = useState(() => new EventEmitter());

  const isMounted = useRef(false);
  const queue = useRef<CurrentAlert[]>([]);
  const hideTimeout = useRef(0);
  const isShownRef = useRef(false);

  const { bottomOffset, onBeforeUpdate, onHide, onShow } =
    usePlatformController();

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const show = useCallback(
    (alert: AlertProps) => {
      return new Promise<unknown>((resolve) => {
        if (!isMounted.current) {
          resolve(undefined);

          return;
        }

        alert = processAlertProps(alert, config);

        if (isShownRef.current) {
          queue.current.push({ ...alert, resolve, config });

          return;
        }

        setIsShown(true);

        isShownRef.current = true;

        onShow();

        setCurrentAlert({ ...alert, resolve, config });
      });
    },
    [onShow, config]
  );

  const update = useCallback(
    (id: string, alert: AlertProps = {}) => {
      if (!isShownRef.current) {
        return;
      }

      const isCurrentAlert = currentAlert?.id === id;

      if (isCurrentAlert) {
        alert = processAlertProps(alert);

        onBeforeUpdate();

        setCurrentAlert((prev) => ({
          ...alert,
          resolve: prev!.resolve,
          config,
        }));
      } else {
        const alertIndex = queue.current.findIndex((a) => a.id === id);

        if (alertIndex >= 0) {
          queue.current.splice(alertIndex, 1, {
            ...alert,
            resolve: queue.current[alertIndex]!.resolve,
            config,
          });
        }
      }
    },
    [currentAlert?.id, onBeforeUpdate, config]
  );

  useEffect(() => {
    const handleHide = () => {
      const nextAlert = queue.current.shift();

      if (nextAlert) {
        // prevent automatic batching in React 18
        setTimeout(() => {
          setIsShown(true);
          isShownRef.current = true;

          onShow();

          setCurrentAlert(nextAlert);
        }, 100);
      }
    };

    hideEmitter.on(handleHide);

    return () => hideEmitter.off(handleHide);
  }, [onShow, hideEmitter]);

  const hide = useCallback(() => {
    if (!isShownRef.current || isHiding) {
      return;
    }

    setIsHiding(true);

    hideTimeout.current = +setTimeout(() => {
      onHide();

      setCurrentAlert(undefined);
      setIsShown(false);
      isShownRef.current = false;
      setIsHiding(false);

      hideEmitter.emit();
    }, animationDuration);
  }, [animationDuration, isHiding, onHide, hideEmitter]);

  useEffect(() => {
    return () => {
      clearTimeout(hideTimeout.current);
    };
  }, []);

  const clearQueue = useCallback(
    (hideDisplayedAlert?: boolean) => {
      queue.current = [];

      if (hideDisplayedAlert) {
        hide();
      }
    },
    [hide]
  );

  const getAlertData = useCallback(
    (id: string) => {
      return [currentAlert, ...queue.current].find((a) => a?.id === id);
    },
    [currentAlert]
  );

  const confirm = useCallback(
    (alert?: ConfirmProps) => {
      const { confirm: confirmConfig } = config || {};

      const title = alert?.title || confirmConfig?.title || 'Are you sure?';

      const passedButtons = alert?.buttons || confirmConfig?.buttons;

      const hideAlertOnPress = alert?.hideAlertOnButtonPress ?? true;

      let buttons: Required<AlertProps<boolean>>['buttons'] = [
        {
          text: 'Yes',
          onAwaitablePress: (resolve) => resolve(true),
          hideAlertOnPress,
        },
        {
          text: 'No',
          onAwaitablePress: (resolve) => resolve(false),
          hideAlertOnPress,
        },
      ];

      if (passedButtons && passedButtons.length !== 2) {
        // eslint-disable-next-line no-console
        console.warn(
          `[React Native Alert Queue] Confirm props must have 2 buttons, got ${passedButtons?.length}`,
          alert
        );
      } else if (passedButtons) {
        const [resolveButton, rejectButton] = passedButtons;

        buttons = [
          {
            text: resolveButton!.text,
            onAwaitablePress: (resolve) => resolve(true),
            hideAlertOnPress,
            customProps: resolveButton!.customProps,
          },
          {
            text: rejectButton!.text,
            onAwaitablePress: (resolve) => resolve(false),
            hideAlertOnPress,
            customProps: rejectButton!.customProps,
          },
        ];
      }

      return show({
        icon: confirmConfig?.icon,
        iconColor: confirmConfig?.iconColor,
        iconSize: confirmConfig?.iconSize,
        ...alert,
        buttons,
        buttonsDirection: 'row',
        title,
      });
    },

    [show, config]
  );

  const showError = useCallback(
    (error: Error) => {
      const { error: errorConfig } = config || {};

      show({
        icon: errorConfig?.icon ?? InfoIcon,
        iconColor: errorConfig?.iconColor ?? 'red',
        iconSize: errorConfig?.iconSize ?? 72,
        message: error.message,
        title: errorConfig?.title ?? 'Oops! Something went wrong!',
      });
    },
    [show, config]
  );

  const success = useCallback(
    (alert?: AlertProps) => {
      const { success: successConfig } = config || {};

      show({
        icon: successConfig?.icon ?? SuccessIcon,
        iconColor: successConfig?.iconColor ?? 'green',
        iconSize: successConfig?.iconSize ?? 72,
        title: successConfig?.title ?? 'Success!',
        ...alert,
      });
    },
    [show, config]
  );

  return {
    bottomOffset,
    clearQueue,
    confirm,
    currentAlert,
    getAlertData,
    hide,
    isHiding,
    isShown,
    show,
    showError,
    success,
    update,
  };
};
