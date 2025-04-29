import type { FC } from 'react';
import type { ConfettiProps } from '../../components/Alert/types';
import { Confetti } from '../../components/Confetti';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

export const ConfettiContainer: FC<Partial<ConfettiProps>> = (props) => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <Confetti {...props} />
    </View>
  );
};
