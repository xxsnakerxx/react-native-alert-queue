import Svg, { type SvgProps, Path } from 'react-native-svg';

export const DangerIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path
      d="M4.723 21.167h-.04a2.833 2.833 0 0 1-2.476-3.89L9.53 4.45a2.833 2.833 0 0 1 4.946.009l7.273 12.728c.162.381.23.691.248 1.007a2.8 2.8 0 0 1-.725 2.042 2.8 2.8 0 0 1-1.956.93l-14.52.001z"
      opacity={0.4}
    />
    <Path
      fillRule="evenodd"
      d="M11.124 10.02c0-.481.393-.874.875-.874s.875.393.875.875v2.828a.876.876 0 0 1-1.75 0zm0 6.25c0-.485.393-.88.875-.88s.875.39.875.869a.88.88 0 0 1-.875.886.877.877 0 0 1-.875-.875"
      clipRule="evenodd"
    />
  </Svg>
);
