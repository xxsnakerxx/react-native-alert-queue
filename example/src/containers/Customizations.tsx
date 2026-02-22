import {
	type ColorValue,
	Pressable,
	type StyleProp,
	StyleSheet,
	Text,
	View,
	type ViewStyle,
} from "react-native";
import { type AlertButtonCustomProps, alert } from "react-native-alert-queue";
import { Button } from "../components/Button";
import { DangerIcon } from "../components/icons/Danger";
import { Section } from "../components/Section";

export const Customizations = () => {
	return (
		<Section title="Customizations">
			<Button
				onPress={() =>
					alert.show({
						title: "Hello",
						message: "Message",
						icon: DangerIcon,
						beforeTitleSlot: () => (
							<Slot
								text="Before title slot"
								style={{
									marginBottom: 10,
								}}
							/>
						),
						beforeMessageSlot: () => (
							<Slot
								text="Before message slot"
								style={{
									marginBottom: 20,
								}}
							/>
						),
						beforeButtonsSlot: () => (
							<Slot
								text="Before buttons slot"
								style={{
									marginBottom: 20,
								}}
							/>
						),
						afterButtonsSlot: () => <Slot text="After buttons slot" />,
					})
				}
				text="Slots"
			/>
			<Button
				onPress={() =>
					alert.show({
						renderTitle: ({ style }) => (
							<Text style={[style, { color: "red", fontSize: 28 }]}>
								Custom title
							</Text>
						),
					})
				}
				text="Custom title"
			/>
			<Button
				onPress={() =>
					alert.show({
						title: "Custom message",
						renderMessage: ({ style }) => (
							<Text
								style={[
									style,
									{
										color: "red",
										fontSize: 28,
										lineHeight: 32,
										textAlign: "right",
									},
								]}
							>
								{
									"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
								}
							</Text>
						),
					})
				}
				text="Custom message"
			/>
			<Button
				onPress={() =>
					alert.show({
						title: "Custom icon",
						icon: DangerIcon,
						iconColor: "red",
						iconSize: 150,
					})
				}
				text="Custom icon"
			/>
			<Button
				onPress={() =>
					alert.show({
						title: "Custom dismiss button",
						isDismissible: true,
						renderDismissButton: ({ onPress }) => (
							<Pressable
								onPress={onPress}
								style={{ position: "absolute", right: 16, top: 16 }}
							>
								<Text style={{ color: "red", fontSize: 16 }}>❌</Text>
							</Pressable>
						),
					})
				}
				text="Custom dismiss button"
			/>
			<Button
				onPress={() =>
					alert.show({
						title: "Custom buttons",
						buttons: [
							{
								text: "Button 1 (default)",
								onPress: () => alert.success({ message: "Button 1 pressed" }),
							},
							{
								text: "Button 2 (primary)",
								onPress: () => alert.success({ message: "Button 2 pressed" }),
								customProps: {
									scheme: "primary",
								},
							},
							{
								text: "Button 3 (secondary)",
								onPress: () => alert.success({ message: "Button 3 pressed" }),
								customProps: {
									scheme: "secondary",
								},
							},
						],
						renderButton: CustomButton,
					})
				}
				text="Custom buttons"
			/>
			<Button
				onPress={async () => {
					const result = await alert.confirm({
						title: "Custom confirm buttons",
						buttons: [
							{
								text: "Ok",
								customProps: {
									scheme: "primary",
								},
							},
							{
								text: "Cancel",
								customProps: {
									scheme: "secondary",
								},
							},
						],
						renderButton: CustomButton,
					});

					if (result) {
						alert.success({ message: "Ok pressed" });
					} else {
						alert.error(new Error("Cancel pressed"));
					}
				}}
				text="Custom confirm buttons"
			/>
		</Section>
	);
};

const Slot = ({
	text,
	style,
}: {
	text: string;
	style?: StyleProp<ViewStyle>;
}) => {
	return (
		<View style={StyleSheet.compose(styles.slot, style)}>
			<Text style={styles.slotText}>{text}</Text>
		</View>
	);
};

const CustomButton = ({
	text,
	onPress,
	disabled,
	testID,
	customProps,
}: {
	text: string;
	onPress: () => void;
	disabled?: boolean;
	testID?: string;
	customProps?: AlertButtonCustomProps;
}) => {
	const { scheme } = customProps || {};

	let backgroundColor: ColorValue = "black";

	switch (scheme) {
		case "primary":
			backgroundColor = "green";
			break;
		case "secondary":
			backgroundColor = "blue";
			break;
	}

	return (
		<Pressable
			onPress={onPress}
			style={StyleSheet.compose(styles.button, {
				backgroundColor,
			})}
			disabled={disabled}
			testID={testID}
		>
			<Text style={styles.buttonText}>{text}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	slot: {
		backgroundColor: "black",
		padding: 10,
	},
	slotText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	button: {
		backgroundColor: "black",
		padding: 10,
		borderRadius: 999,
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
	},
});
