import {
  StyleSheet,
  useWindowDimensions,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

export const useContainerDimensions = (): StyleProp<ViewStyle> => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const maxWidth = 340;
  const maxHeight = Math.round(windowHeight * 0.85);

  return {
    width: windowWidth - 10 * 2,
    maxWidth,
    maxHeight,
  };
};

export const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    paddingTop: 17,
    backgroundColor: '#fff',
    zIndex: 7,
    overflow: 'hidden',
    marginHorizontal: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    paddingTop: 0,
    paddingBottom: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    position: 'absolute',
    right: 16,
    top: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },
  messageContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 0,
  },
  message: {
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
    color: '#000',
  },
});
