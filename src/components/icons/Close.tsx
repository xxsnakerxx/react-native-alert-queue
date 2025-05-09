import Svg, { type SvgProps, Path } from 'react-native-svg';

export const CloseIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 32 32" {...props}>
    <Path d="m21.728 23.36-5.632-5.632-5.664 5.632a1.152 1.152 0 0 1-1.598-1.634l-.002.002 5.664-5.664-5.664-5.632a1.152 1.152 0 0 1 1.603-1.598l-.004-.003 5.664 5.632 5.632-5.632a1.152 1.152 0 0 1 1.598 1.603l.003-.004-5.6 5.664 5.632 5.632a1.154 1.154 0 0 1-1.632 1.632z" />
  </Svg>
);
