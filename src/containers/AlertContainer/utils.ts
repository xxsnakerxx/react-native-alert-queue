import type { Props as AlertProps } from '../../components/Alert/types';

export const processAlertProps = (props: AlertProps) => {
  const result = { ...props };

  // const shouldAppendOkButton =
  //   (!result.buttons || !result.buttons?.length) && !result.buttonsV2?.length;

  // if (shouldAppendOkButton) {
  //   result.buttons = [
  //     {
  //       label: 'OK',
  //       testID: 'Alert.button.ok',
  //     },
  //   ];
  // }

  return result;
};
