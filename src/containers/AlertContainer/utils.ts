import type { Props as AlertProps } from '../../components/Alert/types';
import type { AlertConfig } from './types';

export const processAlertProps = (props: AlertProps, config?: AlertConfig) => {
  const result = { ...props };

  const shouldAppendOkButton = !result.buttons || !result.buttons?.length;

  if (shouldAppendOkButton) {
    result.buttons = config?.buttons?.default
      ? [config.buttons.default]
      : [
          {
            text: 'OK',
            testID: 'Alert.button.ok',
          },
        ];
  }

  return result;
};
