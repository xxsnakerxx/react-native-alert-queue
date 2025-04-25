import { useCallback, useEffect, useRef, useState } from 'react';

import type { AlertProps, CurrentAlert, Props } from './types';

// import SuccessSvg from '../../../../assets/icons/primary/Tick Square.svg';
import { EventEmitter } from '../../utils/EventEmitter';

import { usePlatformController } from './controller.platform';
import { processAlertProps } from './utils';

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
    (alert?: AlertProps) => {
      const title = alert?.title || 'Are you sure?';

      // const buttons: Required<AlertProps<boolean>>['buttons'] =
      //   alert?.buttons?.length === 2
      //     ? [
      //         {
      //           label: alert.buttons[0]!,
      //           onAwaitableClick: (resolve) => resolve(true),
      //           scheme: alert.confirmButtonScheme || 'primary',
      //         },
      //         {
      //           label: alert.buttons[1]!,
      //           onAwaitableClick: (resolve) => resolve(false),
      //         },
      //       ]
      //     : [
      //         {
      //           label: 'Yes',
      //           onAwaitableClick: (resolve) => resolve(true),
      //           scheme: alert?.confirmButtonScheme || 'primary',
      //         },
      //         {
      //           label: 'No',
      //           onAwaitableClick: (resolve) => resolve(false),
      //         },
      //       ];

      return show({
        ...alert,
        title,
      });
    },

    [show]
  );

  const showError = useCallback(
    (error: Error) => {
      show({
        message: error.message,
        title: 'Oops! Something went wrong!',
      });
    },
    [show]
  );

  const success = useCallback(
    (alert?: AlertProps) => {
      show({
        // icon: SuccessSvg,
        iconColor: 'icon.primary',
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
