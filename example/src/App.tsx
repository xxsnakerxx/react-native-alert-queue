import { Text, View, StyleSheet, ScrollView } from 'react-native';

import { AlertContainer } from 'react-native-alert-queue';

import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Basics } from './containers/Basics';
import { Customizations } from './containers/Customizations';
import { Updating } from './containers/Updating';
export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <SafeAreaView style={styles.wrapper}>
          <Text style={styles.title}>React Native Alert Queue</Text>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Basics />
            <Customizations />
            <Updating />
          </ScrollView>
        </SafeAreaView>
        <AlertContainer />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
});
