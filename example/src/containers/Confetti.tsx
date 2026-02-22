import { Text, View } from "react-native";
import { alert } from "react-native-alert-queue";
import { Button } from "../components/Button";
import { Section } from "../components/Section";

export const Confetti = () => {
	return (
		<Section title="Confetti">
			<Button
				onPress={() =>
					alert.show({
						title: "Congrats!",
						confetti: true,
					})
				}
				text="Confetti Alert"
			/>
			<Button
				onPress={() =>
					alert.success({
						title: "Congratulations!",
						message: "You are a winner!",
						confetti: {
							colors: [
								"#4CAF50",
								"#8BC34A",
								"#CDDC39",
								"#81C784",
								"#A5D6A7",
								"#C8E6C9",
							],
							numberOfPieces: 200,
							pieceDimensions: {
								height: 10,
								width: 30,
							},
						},
					})
				}
				text="Custom Confetti"
			/>
			<Button
				onPress={() =>
					alert.show({
						beforeTitleSlot: () => (
							<Text style={{ fontSize: 70, textAlign: "center" }}>🎂</Text>
						),
						title: "Happy Birthday!",
						message: "Best wishes on your special day!",
						confetti: {
							numberOfPieces: 300,
							pieceDimensions: {
								height: 20,
								width: 20,
							},
							renderPiece: ({ style }) => (
								<View
									style={[style, { width: 20, height: 20, borderRadius: 10 }]}
								/>
							),
						},
					})
				}
				text="Custom Confetti Piece"
			/>
		</Section>
	);
};
