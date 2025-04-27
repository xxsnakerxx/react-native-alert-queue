import { Pressable, StyleSheet, Text } from 'react-native';

export const Button = ({
  onPress,
  text,
  testID,
}: {
  onPress?: () => void;
  text: string;
  testID?: string;
}) => {
  return (
    <Pressable style={styles.button} onPress={onPress} testID={testID}>
      <Text style={styles.buttonText}>{text}</Text>
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
