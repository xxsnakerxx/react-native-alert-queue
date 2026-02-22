import type { FC, PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = PropsWithChildren<{
	title: string;
}>;

export const Section: FC<Props> = ({ children, title }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginVertical: 20,
	},
	container: {
		gap: 10,
	},
});
