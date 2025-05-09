import { useEffect, useMemo, useCallback, type FC } from 'react';
import type { Props } from './types';
import { alert } from './alert.api';
import { useController } from './controller';
import { Backdrop } from '../../components/Backdrop';
import { Alert } from '../../components/Alert';
import { StyleSheet, View } from 'react-native';
import { styles } from './styles';
import { ConfettiContainer } from '../ConfettiContainer';

export const AlertContainer: FC<Props> = ({
  animationDuration = 200,
  config,
}) => {
  const {
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
  } = useController({ animationDuration, config });

  useEffect(() => {
    // @ts-ignore: Type 'unknown' is not assignable to type 'R'
    alert.show = show;
    alert.hide = hide;
    // @ts-ignore: Type 'unknown' is not assignable to type 'R'
    alert.success = success;
    alert.update = update;
    alert.clearQueue = clearQueue;
    // @ts-ignore: Type 'unknown' is not assignable to type 'R'
    alert.getAlertData = getAlertData;
    // @ts-ignore: Type 'unknown' is not assignable to type 'R'
    alert.confirm = confirm;
    // @ts-ignore: Type 'unknown' is not assignable to type 'R'
    alert.error = showError;
    alert.isShown = isShown;
  }, [
    clearQueue,
    hide,
    show,
    success,
    update,
    getAlertData,
    isShown,
    confirm,
    showError,
  ]);

  const containerStyle = useMemo(
    () =>
      StyleSheet.compose(styles.container, {
        bottom: bottomOffset,
      }),
    [bottomOffset]
  );

  const renderConfetti = useCallback(() => {
    const shouldRender = currentAlert?.confetti;

    if (shouldRender) {
      const currentAlertConfettiProps =
        typeof currentAlert.confetti === 'boolean'
          ? undefined
          : currentAlert.confetti;

      const globalProps = config?.confetti;

      const confettiProps = {
        ...globalProps,
        ...currentAlertConfettiProps,
      };

      return <ConfettiContainer {...confettiProps} />;
    }

    return null;
  }, [currentAlert?.confetti, config?.confetti]);

  return currentAlert ? (
    <View style={containerStyle}>
      <Backdrop
        animationDuration={animationDuration}
        isHiding={isHiding}
        backgroundColor={config?.backdropBackgroundColor}
      />
      {renderConfetti()}
      <Alert
        {...currentAlert}
        animationDuration={animationDuration}
        isHiding={isHiding}
      />
    </View>
  ) : null;
};
