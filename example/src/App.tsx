import { Text, View, StyleSheet, Pressable } from 'react-native';

import { alert, AlertContainer } from 'react-native-alert-queue';

export default function App() {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() =>
          alert.show({
            title: 'Hello',
            message: 'I am an alert',
          })
        }
      >
        <Text>Show Alert</Text>
      </Pressable>
      <AlertContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
