import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		borderRadius: 15,
		paddingTop: 17,
		backgroundColor: "#fff",
		zIndex: 7,
		overflow: "hidden",
		marginHorizontal: 20,
	},
	iconContainer: {
		alignItems: "center",
		marginBottom: 10,
	},
	titleContainer: {
		flexDirection: "row",
		paddingTop: 0,
		paddingBottom: 15,
		paddingHorizontal: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	dismissibleTitleContainer: {
		paddingHorizontal: 60,
	},
	title: {
		fontSize: 20,
		lineHeight: 28,
		textAlign: "center",
		fontWeight: "bold",
		color: "#000",
		flex: 1,
	},
	dismissButton: {
		width: 28,
		height: 28,
		borderRadius: 14,
		position: "absolute",
		right: 16,
		top: 16,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#ccc",
	},
	messageContainer: {
		paddingHorizontal: 20,
		marginBottom: 20,
		display: "flex",
		flexDirection: "column",
		flexGrow: 0,
	},
	message: {
		fontSize: 15,
		lineHeight: 20,
		textAlign: "center",
		color: "#000",
	},
	buttonsContainer: {
		flexDirection: "column",
		justifyContent: "flex-end",
		marginHorizontal: 20,
		marginBottom: 20,
	},
});
