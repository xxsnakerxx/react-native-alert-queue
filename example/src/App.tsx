import { ScrollView, StyleSheet, Text, View } from "react-native";

import { AlertContainer } from "react-native-alert-queue";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Basics } from "./containers/Basics";
import { Confetti } from "./containers/Confetti";
import { Customizations } from "./containers/Customizations";
import { KeyboardAvoiding } from "./containers/Keyboard";
import { Updating } from "./containers/Updating";

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
						<KeyboardAvoiding />
						<Confetti />
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
		fontWeight: "bold",
		marginVertical: 20,
		textAlign: "center",
	},
});
