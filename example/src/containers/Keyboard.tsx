import { TextInput } from "react-native";
import { alert } from "react-native-alert-queue";
import { Button } from "../components/Button";
import { Section } from "../components/Section";

export const KeyboardAvoiding = () => {
	return (
		<Section title="Keyboard avoiding">
			<Button
				onPress={async () => {
					let reason = "";

					await alert.show({
						title: "Type the reason",
						renderMessage: () => {
							return (
								<TextInput
									placeholder="Type the reason here..."
									autoFocus
									onChangeText={(text) => {
										reason = text;
									}}
									style={{
										textAlignVertical: "top",
										borderWidth: 1,
										borderColor: "gray",
										borderRadius: 5,
										padding: 10,
										height: 100,
									}}
									multiline
								/>
							);
						},
					});

					if (reason) {
						alert.success({ message: `Reason: ${reason}` });
					} else {
						alert.error(new Error("Reason is required"));
					}
				}}
				text="Show reason alert"
			/>
		</Section>
	);
};
