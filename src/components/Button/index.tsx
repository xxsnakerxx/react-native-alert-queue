import { Pressable, StyleSheet, Text } from 'react-native';

export const Button = ({
  onPress,
  text,
  testID,
  disabled,
}: {
  onPress?: () => void;
  text: string;
  testID?: string;
  disabled?: boolean;
}) => {
  return (
    <Pressable
      style={StyleSheet.compose(styles.button, {
        opacity: disabled ? 0.5 : 1,
      })}
      onPress={onPress}
      testID={testID}
      disabled={disabled}
    >
      <Text
        style={StyleSheet.compose(styles.buttonText, {
          color: disabled ? 'gray' : 'black',
        })}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
});
