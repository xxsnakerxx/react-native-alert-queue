import type { FC } from 'react';
import type { ConfettiPieceProps } from './types';
import Animated, {
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  cancelAnimation,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

export const ConfettiPiece: FC<ConfettiPieceProps> = ({
  startOffset = 50,
  angle,
  angleVel,
  canvasHeight,
  color,
  delay,
  elasticity,
  opacity,
  pieceDimensions,
  renderPiece,
  x,
  xVel,
  y,
  yVel,
}) => {
  const getDuration = () => {
    // Calculate total distance: from above screen to below screen
    const totalDistance = canvasHeight + startOffset * 2; // Offset for both top and bottom
    return (totalDistance / yVel) * 1000;
  };

  const clock = useSharedValue(0);
  const duration = useSharedValue(getDuration());

  // Because our clock.value is going from 0 to 1, it's value will let us
  // get the actual number of milliseconds by taking it multiplied by the
  // total duration of the animation.
  const timeDiff = useDerivedValue(() => clock.value * duration.value);
  const dt = useDerivedValue(() => timeDiff.value / 1000);
  const dy = useDerivedValue(() => dt.value * yVel);
  const dx = useDerivedValue(() => dt.value * xVel * -elasticity);
  const localX = useDerivedValue(() => x + dx.value);
  const dAngle = useDerivedValue(() => (dt.value * angleVel * 180) / Math.PI);
  const localY = useDerivedValue(() => y + dy.value);
  const localAngleD = useDerivedValue(() => angle + dAngle.value);

  useEffect(() => {
    // delay is multiplied by 1000 to convert into milliseconds
    clock.value = withDelay(
      delay * 1000,
      withTiming(1, { duration: duration.value })
    );

    return () => {
      cancelAnimation(clock);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uas = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: localX.value },
        { translateY: localY.value },
        { rotateX: localAngleD.value * 0.2 + 'deg' },
        { rotateY: localAngleD.value * 0.3 + 'deg' },
      ],
    };
  }, []);

  return (
    <Animated.View style={[styles.pieceWrapper, pieceDimensions, uas]}>
      {renderPiece ? (
        renderPiece({
          style: StyleSheet.compose(styles.piece, {
            backgroundColor: color,
            opacity,
          }),
        })
      ) : (
        <View
          style={[
            { backgroundColor: color, opacity },
            pieceDimensions,
            styles.piece,
          ]}
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  pieceWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
  },
  piece: {
    left: 0,
    position: 'absolute',
    top: 0,
  },
});
