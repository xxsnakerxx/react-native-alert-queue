import type { FC } from "react";
import { StyleSheet, View } from "react-native";
import type { ConfettiProps } from "../../components/Alert/types";
import { Confetti } from "../../components/Confetti";

export const ConfettiContainer: FC<Partial<ConfettiProps>> = (props) => {
	return (
		<View style={StyleSheet.absoluteFill}>
			<Confetti {...props} />
		</View>
	);
};
