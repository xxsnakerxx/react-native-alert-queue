import { useEffect, useMemo, type FC } from 'react';
import type { Props } from './types';
import { alert } from './alert.api';
import { useController } from './controller';
import { Backdrop } from '../../components/Backdrop';
import { Alert } from '../../components/Alert';
import { StyleSheet, View } from 'react-native';
import { styles } from './styles';

export const AlertContainer: FC<Props> = ({ animationDuration = 200 }) => {
  const {
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
  } = useController({ animationDuration });

  useEffect(() => {
    // @ts-ignore: Type 'unknown' is not assignable to type 'R'
    alert.show = show;
    alert.hide = hide;
    // @ts-ignore: Type 'unknown' is not assignable to type 'R'
    alert.success = success;
    alert.update = update;
    alert.clearQueue = clearQueue;
    // @ts-ignore: Type 'unknown' is not assignable to type 'R'
    alert.getAlert = getAlert;
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
    getAlert,
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

  console.log('currentAlert', currentAlert);

  return currentAlert ? (
    <View style={containerStyle}>
      <Backdrop animationDuration={animationDuration} isHiding={isHiding} />
      <Alert
        {...currentAlert}
        animationDuration={animationDuration}
        isHiding={isHiding}
      />
    </View>
  ) : null;
};
