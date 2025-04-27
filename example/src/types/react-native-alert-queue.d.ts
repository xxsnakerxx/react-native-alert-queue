import 'react-native-alert-queue';

declare module 'react-native-alert-queue' {
  export interface AlertButtonCustomProps {
    scheme?: 'primary' | 'secondary';
  }
}
