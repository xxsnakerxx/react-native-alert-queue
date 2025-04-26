import type { Props as AlertProps } from '../../components/Alert/types';

export const processAlertProps = (props: AlertProps) => {
  const result = { ...props };

  const shouldAppendOkButton = !result.buttons || !result.buttons?.length;

  if (shouldAppendOkButton) {
    result.buttons = [
      {
        text: 'OK',
        testID: 'Alert.button.ok',
      },
    ];
  }

  return result;
};
