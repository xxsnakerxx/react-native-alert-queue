import { useCallback, useEffect, useRef, useState } from 'react';

import type { AlertProps, CurrentAlert, Props } from './types';

import { InfoIcon } from '../../components/icons/Info';
import { SuccessIcon } from '../../components/icons/Success';
import { EventEmitter } from '../../utils/EventEmitter';

import { usePlatformController } from './controller.platform';
import { processAlertProps } from './utils';
import type { ConfirmProps } from '../../components/Alert/types';

export const useController = ({ animationDuration }: Props) => {
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

        alert = processAlertProps(alert);

        if (isShownRef.current) {
          queue.current.push({ ...alert, resolve });

          return;
        }

        setIsShown(true);

        isShownRef.current = true;

        onShow();

        setCurrentAlert({ ...alert, resolve });
      });
    },
    [onShow]
  );

  const update = useCallback(
    (alert: AlertProps = {}) => {
      if (!isShownRef.current) {
        return;
      }

      alert = processAlertProps(alert);

      onBeforeUpdate();

      setCurrentAlert((prev) => ({ ...alert, resolve: prev!.resolve }));
    },
    [onBeforeUpdate]
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

  const getAlert = useCallback(() => currentAlert, [currentAlert]);

  const confirm = useCallback(
    (alert?: ConfirmProps) => {
      const title = alert?.title || 'Are you sure?';

      const passedButtons = alert?.buttons;

      let buttons: Required<AlertProps<boolean>>['buttons'] = [
        {
          text: 'Yes',
          onAwaitablePress: (resolve) => resolve(true),
        },
        {
          text: 'No',
          onAwaitablePress: (resolve) => resolve(false),
        },
      ];

      if (passedButtons?.length !== 2) {
        console.warn(
          `[React Native Alert Queue] Confirm props must have 2 buttons, got ${passedButtons?.length}`,
          alert
        );
      } else {
        buttons = [
          {
            text: passedButtons[0]!,
            onAwaitablePress: (resolve) => resolve(true),
          },
          {
            text: passedButtons[1]!,
            onAwaitablePress: (resolve) => resolve(false),
          },
        ];
      }

      return show({
        ...alert,
        buttons,
        buttonsDirection: 'row',
        title,
      });
    },

    [show]
  );

  const showError = useCallback(
    (error: Error) => {
      show({
        icon: InfoIcon,
        iconColor: 'red',
        iconSize: 72,
        message: error.message,
        title: 'Oops! Something went wrong!',
      });
    },
    [show]
  );

  const success = useCallback(
    (alert?: AlertProps) => {
      show({
        icon: SuccessIcon,
        iconColor: 'green',
        iconSize: 72,
        title: 'Success!',
        ...alert,
      });
    },
    [show]
  );

  return {
    bottomOffset,
    clearQueue,
    confirm,
    currentAlert,
    getAlert,
    hide,
    isHiding,
    isShown,
    show,
    showError,
    success,
    update,
  };
};
