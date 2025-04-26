import { Text, View, StyleSheet, Pressable, ScrollView } from 'react-native';

import { alert, AlertContainer } from 'react-native-alert-queue';

import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <SafeAreaView style={styles.wrapper}>
          <Text style={styles.title}>React Native Alert Queue</Text>
          <ScrollView style={styles.scrollView}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Basics</Text>
              <Button
                onPress={() =>
                  alert.show({
                    title: 'Hello',
                    message: 'I am an alert',
                  })
                }
                text="Show Alert"
              />
              <Button
                onPress={() => {
                  alert.show({
                    title: 'Alert 1',
                    message: 'I am an alert 1',
                  });
                  alert.show({
                    title: 'Alert 2',
                    message: 'I am an alert 2',
                  });
                }}
                text="Show 2 Alerts"
              />
            </View>
          </ScrollView>
        </SafeAreaView>
        <AlertContainer />
      </View>
    </SafeAreaProvider>
  );
}

const Button = ({ onPress, text }: { onPress: () => void; text: string }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  section: {
    gap: 10,
  },
  button: {
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
